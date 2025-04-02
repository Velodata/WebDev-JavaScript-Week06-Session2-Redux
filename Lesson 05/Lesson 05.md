# Lesson 05 – Upload Avatar and Edit Address

In this lesson, you'll build a small web application that allows users to:

- 🔍 Look up a user by their ID
- 🖼️ View and upload a new avatar image
- 🏠 Edit and update address-related fields
- ✅ Communicate with a real REST API using `fetch()`
- 🎨 Work with Bootstrap layout and forms

---

## ✅ Learning Objectives

By the end of this lesson, you should be able to:

- Use `fetch()` to GET and PUT data to an API
- Use `FormData` and `multipart/form-data` to upload images
- Dynamically update DOM elements based on user interaction
- Control visibility of form elements and buttons
- Manage state without a framework like React

---

## 📂 Files Provided

- `index.html` – The structure of the interface, using Bootstrap
- `script.js` – The logic for fetching, uploading, and updating user data
- `style.css` – (optional) Any custom styles you'd like to add

---

## 🧪 Try It Out

1. Open `index.html` in your browser using Live Server
2. Enter a User ID (e.g. `6` or `16`)
3. Click **Fetch User**
4. View their avatar and address info
5. Click **Upload New Avatar**
   - Select an image
   - Click **Confirm Upload**
6. Click **Edit User Address Data**
   - Update any of the address fields
   - Click **Save Changes** or **Cancel**

---

## 🔌 API Endpoints Used

| Action                | Method | Endpoint                                       |
|-----------------------|--------|------------------------------------------------|
| Fetch user info       | GET    | `/api/v2/teach/users/{id}`                    |
| Upload avatar image   | POST   | `/api/v2/teach/users/{id}/upload-image`       |
| Update address fields | PUT    | `/api/v2/teach/users/{id}`                    |

---

## 💡 Challenge Ideas

Try modifying this lesson to:

- Add a confirmation message after saving address changes
- Animate the avatar when it's updated
- Validate address inputs before saving
- Let the user re-fetch or reset the form

---

## 🎓 Bonus Idea (Advanced)

Use AI tools like ChatGPT to suggest small improvements to the layout or user experience. For example:

> *“How can I make this interface feel more modern or professional?”*

See what happens when you hand over part of the design thinking to a smart assistant.

---

