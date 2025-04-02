# Lesson 02 - View a Single User

## 🧠 Learning Objectives
By the end of this lesson, you will be able to:
- Send a `GET` request to retrieve a specific user by ID
- Handle dynamic URL parameters in a REST API call
- Render user data in a Bootstrap card
- Gracefully handle errors and invalid inputs

---

## 📋 What You're Building
An interactive form that allows you to enter a User ID and fetch their profile from the API. When the user is found, a card will be displayed with their name, email, role, status, and profile image.

---

## 🚀 Your Task
1. Open `script.js`
2. Write JavaScript that:
   - Captures the form submission
   - Sends a `GET` request to:
     ```
     https://mx.velodata.org/api/v2/teach/users/{id}
     ```
   - Replaces `{id}` with the value typed into the form
   - Parses the response and displays:
     - Name
     - Email
     - Status
     - Role (if available)
     - Profile image (if available)

Use this base URL in your script:
```js
const BASE_API_URL = 'https://mx.velodata.org/api/v2';
```

Build your endpoint like this:
```js
fetch(`${BASE_API_URL}/teach/users/${userId}`)
```

---

## ✅ Requirements
- The form should prevent the page from refreshing
- If the user is found, display the card
- If the user is not found, show an error message

---

## 🌟 Bonus Challenge
If you finish early:
- Add a default placeholder image if the user has no `profile_image`
- Format the `created_at` date nicely (e.g. `March 2025`)
- Clear the form input after fetching

---

## 🛠 Dev Tips
- Use DevTools to inspect the response format
- All user data is under `response.data.attributes`
- Test with known user IDs like `6` or `7`

---

Well done! When you're ready, move on to Lesson 03 — where you'll create a new user using a form and the `POST` method.
