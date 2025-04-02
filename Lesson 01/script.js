// Lesson 01 - Fetch and display all users

const BASE_API_URL = 'https://mx.velodata.org/api/v2';
const output = document.getElementById('user-output');

// Fetch all users from REST API
async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_API_URL}/teach/users`);
    if (!response.ok) throw new Error('Network response was not ok');

    const usersResponse = await response.json();
    const users = usersResponse.data;
    renderUserCards(users);
  } catch (error) {
    output.innerHTML = `<div class="alert alert-danger">Error fetching users: ${error.message}</div>`;
  }
}

// Render user cards into the page
function renderUserCards(users) {
  output.innerHTML = '';

  users.forEach(user => {
    const { name, email, status } = user.attributes;
    const userId = user.id;

    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${name || 'No Name'}</h5>
          <p class="card-text">
            <strong>User ID:</strong> ${userId}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Status:</strong> ${status || 'N/A'}
          </p>
        </div>
      </div>
    `;
    output.appendChild(col);
  });
}

// Run on page load
getAllUsers();
