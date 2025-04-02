// Lesson 05 - Upload Avatar and Edit Address
const BASE_API_URL = 'https://mx.velodata.org/api/v2';

const fetchForm = document.getElementById('fetch-user-form');
const userIdInput = document.getElementById('user-id');
const avatarImg = document.getElementById('profile-image');
const fileInput = document.getElementById('image-input');
const startUploadBtn = document.getElementById('start-upload-btn');
const confirmBtn = document.getElementById('confirm-upload-btn');
const cancelBtn = document.getElementById('cancel-upload-btn');
const addressForm = document.getElementById('update-address-form');
const editAddressBtn = document.getElementById('edit-address-btn');
const cancelAddressBtn = document.getElementById('cancel-edit-btn');
const messageBox = document.getElementById('response-message');

let currentUserId = null;
let originalAddressData = {};
let selectedFile = null;

// Address fields
const addressFields = {
  address_1: document.getElementById('address_1'),
  address_2: document.getElementById('address_2'),
  address_3: document.getElementById('address_3'),
  city: document.getElementById('city'),
  state: document.getElementById('state'),
  postcode: document.getElementById('postcode'),
};

function toggleAddressInputs(disabled) {
  Object.values(addressFields).forEach(field => field.disabled = disabled);
}

function fillAddressFields(data) {
  for (let key in addressFields) {
    addressFields[key].value = data[key] || '';
  }
}

function captureAddressData() {
  const result = {};
  for (let key in addressFields) {
    result[key] = addressFields[key].value;
  }
  return result;
}

// Fetch user info
fetchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = userIdInput.value.trim();
  if (!userId) return;

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${userId}?_=${Date.now()}`);
    if (!res.ok) throw new Error('User not found');
    const { data } = await res.json();

    currentUserId = data.id;
    const attrs = data.attributes;

    avatarImg.src = attrs.profile_image || 'https://via.placeholder.com/100x100?text=No+Image';
    fillAddressFields(attrs);
    originalAddressData = { ...attrs };

    toggleAddressInputs(true);
    addressForm.classList.remove('d-none');
    startUploadBtn.classList.remove('d-none');
    editAddressBtn.classList.remove('d-none');
    messageBox.innerHTML = '';
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    addressForm.classList.add('d-none');
    startUploadBtn.classList.add('d-none');
    editAddressBtn.classList.add('d-none');
  }
});

// Start Upload: trigger file picker
startUploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// When file selected
fileInput.addEventListener('change', () => {
  selectedFile = fileInput.files[0];
  if (selectedFile) {
    avatarImg.src = URL.createObjectURL(selectedFile);
    confirmBtn.classList.remove('d-none');
    cancelBtn.classList.remove('d-none');
  }
});

// Cancel upload
cancelBtn.addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  confirmBtn.classList.add('d-none');
  cancelBtn.classList.add('d-none');
});

// Confirm upload
confirmBtn.addEventListener('click', async () => {
  if (!selectedFile || !currentUserId) return;

  const formData = new FormData();
  formData.append('attachment', selectedFile);

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${currentUserId}/upload-image`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('Upload failed');
    const result = await res.json();

    avatarImg.src = result.data.attributes.profile_image;
    messageBox.innerHTML = `<div class="alert alert-success">Profile image updated.</div>`;
    confirmBtn.classList.add('d-none');
    cancelBtn.classList.add('d-none');
    fileInput.value = '';
    selectedFile = null;
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});

// Edit Address
editAddressBtn.addEventListener('click', () => {
  toggleAddressInputs(false);
  cancelAddressBtn.classList.remove('d-none');
  editAddressBtn.classList.add('d-none');
});

// Cancel address edit
cancelAddressBtn.addEventListener('click', () => {
  fillAddressFields(originalAddressData);
  toggleAddressInputs(true);
  cancelAddressBtn.classList.add('d-none');
  editAddressBtn.classList.remove('d-none');
});

// Submit address update
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {};
  for (let key in addressFields) {
    payload[key] = addressFields[key].value.trim();
  }

  try {
    const res = await fetch(`${BASE_API_URL}/teach/users/${currentUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Update failed');
    const result = await res.json();

    messageBox.innerHTML = `<div class="alert alert-success">Address updated for user ID ${result.user.id}</div>`;
    originalAddressData = { ...payload };
    toggleAddressInputs(true);
    cancelAddressBtn.classList.add('d-none');
    editAddressBtn.classList.remove('d-none');
  } catch (err) {
    messageBox.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});
