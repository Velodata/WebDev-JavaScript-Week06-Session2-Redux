// Lesson 04 - Update Address via PUT

const BASE_API_URL = 'https://mx.velodata.org/api/v2';

const fetchForm = document.getElementById('fetch-user-form');
const updateForm = document.getElementById('update-address-form');
const responseMessage = document.getElementById('response-message');
const userIdInput = document.getElementById('user-id');

let currentUserId = null;

// Address field references
const fields = {
  name: null,
  address_1: document.getElementById('address_1'),
  address_2: document.getElementById('address_2'),
  address_3: document.getElementById('address_3'),
  city: document.getElementById('city'),
  state: document.getElementById('state'),
  postcode: document.getElementById('postcode')
};

// Dynamically inject name and profile image container into the form
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.className = 'form-control';
nameInput.id = 'name';
nameInput.readOnly = true;
nameInput.placeholder = 'User Name';

const nameWrapper = document.createElement('div');
nameWrapper.className = 'col-12';
nameWrapper.innerHTML = `<label for="name" class="form-label">Name</label>`;
nameWrapper.appendChild(nameInput);

const imageWrapper = document.createElement('div');
imageWrapper.className = 'col-12';
imageWrapper.innerHTML = `<img id="profile-image" src="" alt="Profile Image" class="img-thumbnail" style="max-height: 100px;" />`;

updateForm.insertBefore(imageWrapper, updateForm.firstChild);
updateForm.insertBefore(nameWrapper, updateForm.firstChild);

fields.name = nameInput;

// Step 1: Fetch user data
fetchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = userIdInput.value.trim();
  if (!userId) return;

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${userId}`);
    if (!res.ok) throw new Error(`User ${userId} not found`);
    const { data } = await res.json();

    currentUserId = data.id;
    const attrs = data.attributes;

    // Populate form fields
    fields.name.value = attrs.name || '';
    Object.keys(fields).forEach(key => {
      if (key !== 'name') fields[key].value = attrs[key] || '';
    });

    const profileImg = document.getElementById('profile-image');
    profileImg.src = attrs.profile_image || 'https://via.placeholder.com/100x100?text=No+Image';

    updateForm.classList.remove('d-none');
    responseMessage.innerHTML = '';
  } catch (err) {
    updateForm.classList.add('d-none');
    responseMessage.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});

// Step 2: Submit address update
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUserId) return;

  const payload = {
    address_1: fields.address_1.value.trim(),
    address_2: fields.address_2.value.trim(),
    address_3: fields.address_3.value.trim(),
    city: fields.city.value.trim(),
    state: fields.state.value.trim(),
    postcode: fields.postcode.value.trim()
  };

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${currentUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Update failed with status ${res.status}`);
    const result = await res.json();

    responseMessage.innerHTML = `<div class="alert alert-success">Address updated successfully for user ID: ${result.user.id}</div>`;
  } catch (err) {
    responseMessage.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
  }
});
