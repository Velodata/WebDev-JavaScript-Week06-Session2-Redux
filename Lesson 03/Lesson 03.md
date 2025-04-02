# Lesson 03 - Create a New User

## 🧠 Learning Objectives
By the end of this lesson, you will be able to:
- Collect input using a HTML form
- Use JavaScript to build a `POST` request with JSON data
- Submit form data to a REST API endpoint
- Handle success and error messages
- Apply basic input validation for password security

---

## 📋 What You're Building
You're creating a simple registration form for new users. When submitted, the form will:
- Package the user input into a JSON payload
- Send the data to a REST API
- Display a success message with the user ID, or an error message if something fails

---

## 🧪 The Endpoint
```
POST https://mx.velodata.org/api/v2/teach/users
```

---

## ✅ Fields Required
| Field       | Type       | Notes                                 |
|-------------|------------|---------------------------------------|
| Name        | text       | Required                              |
| Email       | email      | Required                              |
| Password    | password   | Required (min 8 chars, must include a number) |
| Role        | select     | Choose from Admin, Creator, Member, Spy |

The payload must include:
- A `data.attributes` object with all the user info
- A `data.relationships.roles` object that includes the role ID

---

## 🛠 Code Tips
- Use `fetch()` with `method: "POST"`
- Always include `Content-Type: application/json` in headers
- Build your payload like this:

```js
const userData = {
  data: {
    attributes: {
      name: "John Smith",
      email: "john@example.com",
      password: "abc12345",
      role_name: "Member",
      vmd_user_email: "trainer@example.com",
      vmd_user_name: "Trainer"
    },
    relationships: {
      roles: {
        data: [
          { id: 3, type: "roles" }
        ]
      }
    }
  }
};
```

---

## 🔒 Password Rules
- Minimum of **8 characters**
- Must include **at least one number**
- Show a warning if the password doesn't meet these criteria

---

## 🌟 Bonus Challenge
- Use your chatGPT skills to enhance the following...
- (1) Clear the form input values after a successful submission
- (2) Add form feedback messages using Bootstrap alert boxes
- (3) Use a `<select>` element for the role, and auto-insert the correct `role_name` into the payload

---

When you're done and your form creates users successfully, move on to **Lesson 04**, where you'll build the entire form yourself from scratch!