# CRUD with Axios

A simple React CRUD application built with Vite and Axios. This project demonstrates how to create, read, update, and delete posts using the JSONPlaceholder API.

## Overview

This app is a front-end learning project focused on handling API requests in React. It allows users to:

- Fetch all posts from an external API
- Add a new post
- Edit an existing post
- Delete a post

The app uses Axios to interact with the `https://jsonplaceholder.typicode.com` API and keeps the data in React state for a smooth user experience.

## Tech Stack

- React 19
- Vite
- Axios
- JavaScript
- ESLint

## Project Structure

```bash
crud_with_axios/
├── public/
├── src/
│   ├── api/
│   │   └── PostAPI.jsx
│   ├── components/
│   │   ├── Form.jsx
│   │   └── Posts.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── App.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── package-lock.json
```

## Main Features

### Post Listing
The app fetches posts from the API and renders them as a list on the page.

### Create Post
A form allows the user to enter a title and body, then submit the data to create a new post.

### Update Post
Users can click the Edit button on a post, update its title and body, and save the changes.

### Delete Post
Each post includes a Delete button that removes it from the list and sends a delete request to the API.

## API Layer

The project has a dedicated API file located at `src/api/PostAPI.jsx`.

It contains Axios instance configuration and functions for:

- `getPost()`
- `deletePost(id)`
- `postData(post)`
- `updateData(id, post)`

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd crud_with_axios
```

2. Install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev     # starts the Vite dev server
npm run build   # creates a production build
npm run preview # previews the production build locally
npm run lint    # runs ESLint checks
```

## Notes

- This project uses `jsonplaceholder.typicode.com` as a mock REST API for learning purposes.
- The API is not a real persistent database, so changes are temporary and may not remain after refresh.
- The app is a simple front-end CRUD example and can be expanded with features like validation, loading states, or a custom backend.

## Learning Purpose

This project is useful for understanding:

- React state management
- Axios API calls
- Form handling in React
- CRUD operations in a front-end app
- Component-based architecture

---

# Updating Data in REST APIs: PUT vs. PATCH

When building or consuming RESTful APIs, updating resource data often leads to a common question: **Should I use `PUT` or `PATCH`?**

While both HTTP methods are used to modify existing resources as part of the **U** (Update) in CRUD operations, they operate on completely different principles and semantics.

---

## Quick Comparison Overview

| Feature | `PUT` | `PATCH` |
| :--- | :--- | :--- |
| **Primary Action** | Full replacement of a resource | Partial modification of a resource |
| **Payload Content** | Complete resource payload | Only the fields to be updated |
| **Idempotent?** | **Yes** | **No** (by default / strictly speaking) |
| **Payload Size** | Larger (sends full entity) | Smaller (sends diff only) |
| **Common Analogy** | Overwriting a file | Editing lines in a document |

---

## Detailed Breakdown

### 1. The `PUT` Method (Full Replacement)

The `PUT` method is used to **replace an entire resource** at a specific URL with the payload provided in the request.

* **Behavior**: The server replaces the existing resource state entirely with the data sent.
* **Missing Fields**: If you omit fields in a `PUT` request, the server will usually clear or overwrite those missing fields with `null` or default values.

#### Example Scenario

Imagine a user profile at `/api/users/42`:

**Existing Data on Server:**
```json
{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "Admin"
}
```

**PUT Request Payload:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
```

**Resulting Data on Server:**
```json
{
  "id": 42,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": null
}
```
*(Notice how `role` was erased or reset because it was absent from the request payload).*

---

### 2. The `PATCH` Method (Partial Update)

The `PATCH` method is used to apply **partial modifications** to a resource.

* **Behavior**: The server applies only the changes specified in the request payload to the target resource.
* **Missing Fields**: Any fields not included in the payload remain untouched on the server.

#### Example Scenario

Using the same user profile at `/api/users/42`:

**Existing Data on Server:**
```json
{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "Admin"
}
```

**PATCH Request Payload:**
```json
{
  "name": "Alice Johnson"
}
```

**Resulting Data on Server:**
```json
{
  "id": 42,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "Admin"
}
```
*(Only `name` is updated; `email` and `role` remain untouched).*

---

## Understanding Idempotency

An HTTP method is **idempotent** if making multiple identical requests has the same effect on the server state as making a single request.

* **`PUT` is Idempotent:**
  Sending `PUT /api/users/42` with `{ "name": "Alice" }` once or 100 times results in the exact same resource state on the server every time.

* **`PATCH` is Non-Idempotent (by default):**
  While many simple JSON patches act idempotently (e.g., updating a field value), `PATCH` operations can also perform non-idempotent operations, such as appending an item to an array or incrementing a counter:
  ```json
  {
    "op": "add",
    "path": "/login_count",
    "value": 1
  }
  ```
  Executing this request 5 times will increment `login_count` 5 times.

---

## When to Use Which?

### Choose `PUT` when:
- You want to completely overwrite or recreate a resource at a given URI.
- You have access to the full resource data on the client side before sending the request.
- Idempotency is a strict requirement for the update endpoint.

### Choose `PATCH` when:
- You are updating a subset of attributes (e.g., updating a user's password or status flag).
- You want to reduce bandwidth usage by sending only modified fields.
- You are performing specific differential operations (e.g., JSON Patch [RFC 6902]).

---

## Best Practices

1. **Don't misuse `PUT` for partial updates:** Avoid accepting partial payloads in `PUT` endpoints to keep your API standards compliant.
2. **Handle missing fields carefully:** Ensure server validation explicitly enforces mandatory fields on `PUT` and handles absent fields on `PATCH`.
3. **HTTP Status Codes:**
   - Return `200 OK` or `204 No Content` for successful updates.
   - Return `404 Not Found` if the target resource does not exist (unless `PUT` is designed to create resources when absent).

   