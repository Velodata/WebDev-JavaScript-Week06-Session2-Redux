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

// Enter Code Block 01 here



























// Enter Code Block 02 here...































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

// Enter Code Block 03 here


























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

// Enter Code Block 04 here


























