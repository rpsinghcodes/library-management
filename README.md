# Book Management Application

This is a full-stack Book Management application where users can sign up, log in, and manage books. Admin users have access to add new books, while both users and admins can view and search for books.

## Features

### Backend (Node.js, Express, MongoDB)
- **User Authentication**: Sign up and log in with role-based access.
- **Book Management**:
    - Admin can add new books.
    - Users and Admin can view all books and get book details.
- **Role-Based Access Control**: Protect routes based on user roles (admin, user).

### Frontend (React, Tailwind CSS, Context API)
- **User Authentication**: Register and login with role selection.
- **Book Listing**: Display all books with search functionality.
- **Book Details**: View detailed information about a specific book.
- **Admin Access**: Add new books (available only to admins).

## Backend API Routes

### `/api/auth`
- `POST /signup`: User registration (Admin or User role).
- `POST /login`: User login.

### `/api/books`
- `GET /`: Retrieve all books (Accessible by Admin and User).
- `GET /:id`: Retrieve book details by ID.
- `POST /`: Add a new book (Accessible by Admin only).

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend
- React.js
- Tailwind CSS
- Context API

## Installation and Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/rpsinghcodes/library-management
    cd book-management
    ```

2. Set up the backend:

    ```bash
    cd backend
    npm install
    npm start
    ```

3. Set up the frontend:

    ```bash
    cd frontend
    npm install
    npm start
    ```

4. Access the application at `http://localhost:3000`

## Usage

1. Register as a user or admin.
2. Login and access book listings.
3. Admins can add new books.

## Folder Structure

```
.
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── index.js
└── client
    ├── src
    │   ├── components
    │   ├── context
    │   ├── pages
    │   └── App.js
```



