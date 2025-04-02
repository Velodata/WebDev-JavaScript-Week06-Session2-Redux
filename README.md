# JavaScript + REST API Lessons

This GitHub repository contains a complete series of lessons for students learning how to build frontend JavaScript applications that interact with a REST API. These lessons use **vanilla JavaScript**, **Bootstrap for styling**, and connect to a **Laravel backend** hosted at:

```
https://mx.velodata.org/api/v2
```

---

## 🔗 API Base URL
```js
const BASE_API_URL = 'https://mx.velodata.org/api/v2';
```
All `script.js` files use this constant when making requests.

---

## 📚 Lessons Overview
Each lesson builds on top of the previous one. Students are required to write JavaScript that communicates with the backend API and updates the DOM accordingly.

---

### ✅ Lesson 01 – View Users
- Fetch all users from the backend
- Display name, email, status, and user ID in Bootstrap cards
- Helps students understand the GET verb and JSON structure

### ✅ Lesson 02 – View Single User
- Allow students to input a user ID
- Fetch and display that specific user's information
- Introduces use of dynamic URL parameters (`/users/{id}`)

### ✅ Lesson 03 – Create User
- Form input for name, email, password, and role
- POST request to create a new user in the backend
- Uses Bootstrap form styling and client-side validation

### ✅ Lesson 04 – Form Challenge: Update Address
- Students enter a user ID to fetch
- Displays user's name and profile image
- Editable form for address fields (address_1, address_2, etc.)
- Submits the update using the PUT HTTP verb

### 🚧 Lesson 05 and beyond
- Will build on earlier lessons with authentication, permissions, filtering, and search.

---

## 🗂️ Folder Structure
Each lesson lives in a separate folder:

```
Lesson 01/
  index.html
  script.js
Lesson 02/
  index.html
  script.js
...
README.md
```

---

## 📌 Requirements
- Google Chrome (or any modern browser)
- VS Code with Live Server extension
- Basic knowledge of HTML, CSS, and JavaScript

---

## 🧠 Key Concepts Covered
- REST API verbs: GET, POST, PUT, DELETE
- Using `fetch()` with JSON
- Handling JSON:API-style responses
- Bootstrap layout and responsive design
- Basic form validation
- DOM manipulation
- Working with dynamic route parameters

---

## 💡 For Instructors
Each lesson is designed to be:
- Taught live or asynchronously
- Split into steps
- Extended with bonus challenges

Most `script.js` files are deliberately incomplete or include screenshots requiring students to write their own syntax.

---

## ✅ API Endpoints Used
All routes are prefixed with:
```
/api/v2/teach/users
```

| Method | Route                                | Description                       |
|--------|--------------------------------------|-----------------------------------|
| GET    | /teach/users                         | Get all users                     |
| GET    | /teach/users/{id}                    | Get single user                   |
| POST   | /teach/users                         | Create new user                   |
| PUT    | /teach/users/{id}                    | Update address fields             |
| DELETE | /teach/users/{id}                    | Delete user                       |
| POST   | /teach/users/{id}/upload-image       | Upload profile image              |

---

## 🚀 Getting Started
1. Clone this repository
2. Open any `index.html` file using Live Server
3. Follow lesson instructions inside the HTML comments or associated markdown file

---

## 👨‍🏫 Author
This repository was written for you Super Duper Ivan from Equinim College.

This repo is maintained for students in weekly online JavaScript + Web API classes. It reflects a structured learning path using real API endpoints and progressive hands-on exercises.

If you're teaching or learning JavaScript and REST APIs — you're in the right place.

---

Happy coding! ✨

