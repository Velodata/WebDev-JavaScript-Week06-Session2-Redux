<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RestController extends Controller
{
    public function getAllUsers(Request $request)
    {
        $users = User::with('roles')->get();

        $includeRoles = $request->query('include') === 'roles';
        $included = [];

        if ($includeRoles) {
            $rolesResponse = app()->call('App\\Http\\Controllers\\RoleController@index');
            $included = $rolesResponse->getData()->data;
        }

        return response()->json([
            'jsonapi' => ['version' => '2.0'],
            'data' => $users->map(function ($user) {
                return [
                    'type' => 'users',
                    'id' => (string) $user->id,
                    'attributes' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'profile_image' => $user->profile_image,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                        'status' => $user->status,
                        'address_1' => $user->address_1,
                        'address_2' => $user->address_2,
                        'address_3' => $user->address_3,
                        'city'      => $user->city,
                        'state'     => $user->state,
                        'postcode'  => $user->postcode,

                    ],
                    'relationships' => [
                        'roles' => [
                            'links' => [
                                'related' => url("api/v2/users/{$user->id}/roles"),
                                'self' => url("api/v2/users/{$user->id}/relationships/roles"),
                            ],
                            'data' => $user->roles ? [
                                [
                                    'type' => 'roles',
                                    'id' => (string) $user->roles->id,
                                ]
                            ] : [],
                        ],
                    ],
                    'links' => [
                        'self' => url("api/v2/users/{$user->id}"),
                    ],
                ];
            }),
            'included' => $includeRoles ? $included : null,
        ]);
    }

    public function getUserById($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return response()->json([
            'data' => [
                'type' => 'users',
                'id' => (string) $user->id,
                'attributes' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_image' => $user->profile_image,
                    'role_id' => $user->roles->id ?? null,
                    'role_name' => $user->roles->name ?? null,
                    'created_at' => $user->created_at->toDateTimeString(),
                    'updated_at' => $user->updated_at->toDateTimeString(),
                    'address_1' => $user->address_1,
                    'address_2' => $user->address_2,
                    'address_3' => $user->address_3,
                    'city'      => $user->city,
                    'state'     => $user->state,
                    'postcode'  => $user->postcode,

                ],
                'relationships' => [
                    'roles' => [
                        'links' => [
                            'related' => url("api/v2/users/{$user->id}/roles"),
                            'self' => url("api/v2/users/{$user->id}/relationships/roles"),
                        ],
                        'data' => $user->roles ? [
                            'type' => 'roles',
                            'id' => (string) $user->roles->id,
                        ] : null,
                    ],
                ],
                'links' => [
                    'self' => url("api/v2/users/{$user->id}"),
                ],
            ]
        ], 200);
    }

    // Create a new user
    public function createNewUser(Request $request)
    {
        $data = $request->input('data');
        $attributes = $data['attributes'];
    
        // ✅ Validate inputs including unique email
        $validator = Validator::make($attributes, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_name' => 'nullable|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'outcome' => 'FAIL',
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }
    
        $name = $attributes['name'];
        $email = $attributes['email'];
        $password = bcrypt($attributes['password']); // hash password securely
        $roleName = $attributes['role_name'] ?? null;
    
        // Extract role ID from the relationships block
        $roleId = $data['relationships']['roles']['data'][0]['id'] ?? null;
    
        // ✅ Create and save the new user
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'role_id' => $roleId,
            'role_name' => $roleName,
            'password' => $password, // stored at creation
        ]);
    
        // Set custom customer number
        $user->custno = $user->id + 100000;
        $user->save();
    
        return response()->json(['data' => $user], 201);
    }
    






    public function DONTUSEupdateUserById(Request $request, $id)
    {
        // ✅ TEMP TEST LOGIC
        return response()->json([
            'status' => 'received',
            'id' => $id,
            'method' => $request->method(),
        ]);
    }











    public function updateUserById(Request $request, $id)
    {
        // ✅ Block editing the Admin account
        if ($id == 1) {
            return response()->json([
                'outcome' => 'FAIL',
                'message' => 'Permission Denied: (You can NEVER EVER edit the Admin account.)'
            ], 403);
        }

        // ✅ Validate only address fields
        $validator = Validator::make($request->all(), [
            'address_1' => 'nullable|string|max:255',
            'address_2' => 'nullable|string|max:255',
            'address_3' => 'nullable|string|max:255',
            'city'      => 'nullable|string|max:255',
            'state'     => 'nullable|string|max:255',
            'postcode'  => 'nullable|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'outcome' => 'FAIL',
                'message' => 'Address validation failed.',
                'errors'  => $validator->errors()
            ], 422);
        }

        // ✅ Geo check: Only allow from AU
        $realIp = $request->header('X-Forwarded-For');
        $realIp = $realIp ? explode(',', $realIp)[0] : $request->ip();

        $ipinfoToken = '4af1c2308a696c';
        $geoUrl = "http://ipinfo.io/{$realIp}/json?token={$ipinfoToken}";
        $geo = @json_decode(file_get_contents($geoUrl));

        if (!isset($geo->country) || $geo->country !== 'AU') {
            return response()->json([
                'outcome' => 'FAIL',
                'message' => 'Permission Denied: (You can only perform updates if you are in Australia)'
            ], 403);
        }

        // ✅ Find user and update address fields
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'outcome' => 'FAIL',
                'message' => 'User not found.'
            ], 404);
        }

        $data = $validator->validated();

        $user->address_1 = $data['address_1'] ?? $user->address_1;
        $user->address_2 = $data['address_2'] ?? $user->address_2;
        $user->address_3 = $data['address_3'] ?? $user->address_3;
        $user->city      = $data['city'] ?? $user->city;
        $user->state     = $data['state'] ?? $user->state;
        $user->postcode  = $data['postcode'] ?? $user->postcode;
        $user->save();

        return response()->json([
            'outcome' => 'SUCCESS',
            'message' => 'User address updated successfully.',
            'user' => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'address_1'  => $user->address_1,
                'address_2'  => $user->address_2,
                'address_3'  => $user->address_3,
                'city'       => $user->city,
                'state'      => $user->state,
                'postcode'   => $user->postcode,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }




    public function deleteUserById($id)
    {
        // $user = User::findOrFail($id);
        // $user->delete();
        // return response()->json(null, 204);
    }





    public function uploadUserProfileImage(Request $request, $userId)
    {
        $request->validate([
            'attachment' => 'required|image|max:2048',
        ]);

        $path = "users/{$userId}/profile-image";

        try {
            $filePath = Storage::disk('public')->put($path, $request->file('attachment'));

            if (!$filePath) {
                return response()->json([
                    'error' => [
                        'title' => 'Upload Error',
                        'detail' => 'Failed to upload profile image',
                        'status' => 500,
                    ]
                ], 500);
            }

            $fileUrl = Storage::url($filePath);
            $user = User::findOrFail($userId);
            $appURL = config('app.url');
            $user->profile_image = $appURL . $fileUrl;
            $user->save();

            return response()->json([
                'jsonapi' => ['version' => '1.0'],
                'data' => [
                    'type' => 'profile',
                    'id' => $userId,
                    'attributes' => [
                        'profile_image' => $appURL . $fileUrl,
                    ]
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => [
                    'title' => 'Server Error',
                    'detail' => 'An error occurred while uploading the image.',
                    'status' => 500,
                    'meta' => ['exception' => $e->getMessage()],
                ]
            ], 500);
        }
    }
}
