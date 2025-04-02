// Lesson 03 - Create a New User via REST API

const BASE_API_URL = 'https://mx.velodata.org/api/v2';

const form = document.getElementById('create-user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role_id');
const responseMessage = document.getElementById('response-message');

const roleMap = {
    1: "Admin",
    2: "Creator",
    3: "Member",
    4: "Spy"
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = passwordInput.value;

    // Validate password: at least 8 characters and includes a number
    const passwordValid = password.length >= 8 && /\d/.test(password);

    if (!passwordValid) {
        responseMessage.innerHTML = `<div class="alert alert-warning">Password must be at least 8 characters long and include at least one number.</div>`;
        return;
    }

    const roleId = roleInput.value;
    const roleName = roleMap[roleId] || "Unknown";

    // Construct the data object as expected by the API
    const userData = {
        data: {
            attributes: {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                password: password,
                role_name: roleName,
                vmd_user_email: "trainer@example.com",
                vmd_user_name: "Trainer"
            },
            relationships: {
                roles: {
                    data: [
                        { id: roleId, type: "roles" }
                    ]
                }
            }
        }
    };

    try {
        const response = await fetch(`${BASE_API_URL}/teach/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (!response.ok) {

            if (response.status === 422 && result.errors) {
                const errorList = Object.entries(result.errors)
                    .map(([field, messages]) => `<li><strong>${field}</strong>: ${messages.join(', ')}</li>`)
                    .join('');
                responseMessage.innerHTML = `
          <div class="alert alert-danger">
            <p><strong>Validation failed:</strong></p>
            <ul>${errorList}</ul>
          </div>
        `;
            } else {
                // Generic error message for other types of errors
                throw new Error(`Status ${response.status}: ${result.message || response.statusText}`);
            }
            return;
        }

        responseMessage.innerHTML = `<div class="alert alert-success">User created successfully with ID: ${result.data.id}</div>`;
        form.reset();

    } catch (error) {
        responseMessage.innerHTML = `<div class="alert alert-danger">Failed to create user: ${error.message}</div>`;
    }

});
