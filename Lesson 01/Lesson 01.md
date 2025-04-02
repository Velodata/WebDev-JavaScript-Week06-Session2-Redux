# Lesson 01 - Fetch and Display All Users

## 🧠 Learning Objectives
By the end of this lesson, you will be able to:
- Understand how to fetch data from a REST API using `fetch()`
- Dynamically display data in the browser using JavaScript
- Work with JSON responses and Bootstrap components

---

## 📋 What You're Building
A basic **User Explorer** page that displays user cards using data from a live API.
Each card will show the user's name, email, and status. The data will be fetched from a Laravel-powered REST API.

---

## 🚀 Your Task
1. Open `script.js` in this folder.
2. Write the JavaScript code to:
   - Call the API endpoint at:
     ```
     GET https://mx.velodata.org/api/v2/teach/users
     ```
   - Extract the array of users from the response
   - Loop through each user and display their **name**, **email**, and **status** in a Bootstrap card
3. Insert each card into the `#user-output` div in `index.html`

Use this base URL in your script:
```js
const REACT_APP_API_URL = 'https://mx.velodata.org/api/v2';
```

Build your endpoint like this:
```js
fetch(`${REACT_APP_API_URL}/teach/users`)
```

---

## ✅ Requirements
- The page should show at least 6 users from the API
- Each user should be inside a Bootstrap card (see existing HTML structure)
- No blank cards — only render users that have name and email fields

---

## 🌟 Bonus Challenge
If you finish early:
- Consider using your chatGPT skills to find a way to do the following
- (1) Add the user's **profile image** at the top of each card (use the `profile_image` field inside `attributes`)
- (2) Add a Bootstrap spinner or loading message while the data is loading
- the field you would want to use is named "profile_image".  Consider looking at your DEVTOOLS Network XHR response.

---

## 🛠 Dev Tips
- Use DevTools > Network > XHR tab to inspect the API call and see the response format
- The user data lives in `response.data`, and each row’s values are in `user.attributes`
- This API is live — the data is real!

---

Happy coding!

📁 Move on to Lesson 02 once you're confident with fetching and displaying data.