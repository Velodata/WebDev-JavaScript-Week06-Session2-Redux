// Lesson 02 - Fetch and display a single user by ID

const BASE_API_URL = 'https://mx.velodata.org/api/v2';
const form = document.getElementById('user-form');
const input = document.getElementById('user-id');
const output = document.getElementById('user-output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = input.value.trim();
  if (!userId) return;

  output.innerHTML = '<div class="text-muted">Loading...</div>';

  try {
    const response = await fetch(`${BASE_API_URL}/teach/users/${userId}`);
    if (!response.ok) throw new Error('User not found');

    const user = await response.json();
    renderUserCard(user.data);
  } catch (error) {
    output.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
  }
});

function renderUserCard(user) {
  const { name, email, profile_image, role_id, role_name, created_at, status } = user.attributes;

  output.innerHTML = `
    <div class="card shadow-sm">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${profile_image || 'https://via.placeholder.com/150'}" class="img-fluid rounded-start" alt="Profile Image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              <strong>Email:</strong> ${email}<br>
              <strong>Role:</strong> ${role_name || 'N/A'}<br>
              <strong>Status:</strong> ${status || 'N/A'}<br>
              <strong>Joined:</strong> ${new Date(created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
