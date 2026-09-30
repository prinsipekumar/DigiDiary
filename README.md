# DigiDiary 📓

## Overview

**DigiDiary** is a modern digital journaling application that allows users to securely create, manage, and search personal diary entries. Built with a **React frontend** and **Node.js/Express backend**, DigiDiary provides JWT-based authentication, responsive UI, and seamless diary management with MongoDB persistence.

The goal is to provide a simple yet powerful platform for personal journaling, with features like authentication, search, and responsive design.

---

**Live Demo**: [https://digidiary-iia5.onrender.com](https://digidiary-iia5.onrender.com)

---

## Features

- **User Authentication**
  - Register and login with secure JWT-based authentication.
  - Passwords are hashed using bcryptjs.

- **Protected Routes**
  - Only authenticated users can access the home page and diary entries.
  - Automatic redirect to login/register if not authenticated.

- **Diary Management**
  - Create new diary entries with title and description.
  - Edit existing entries via modal interface.
  - Delete entries with confirmation.
  - Entries are timestamped and displayed in a responsive grid layout.

- **Search & Filter**
  - Search diary entries by title or description using query parameters.

- **Responsive UI**
  - Tailwind CSS styling with modern design.
  - Mobile-friendly layout and floating action button for adding entries.

- **Error Handling**
  - Clear error messages when authentication fails or API requests error out.
  - Graceful fallback when token is missing or expired.

---

## Tech Stack

### Frontend

- **Framework:** React 19
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS (with Vite integration)
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Linting:** ESLint with React Hooks & Refresh plugins

### Backend

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcryptjs for password hashing
- **Environment Management:** dotenv
- **Development Tools:** nodemon

---

## Getting Started

To run the project locally:

1. **Clone the Repository**

```bash
git clone https://github.com/prinsipekumar/DigiDiary.git
cd DigiDiary
npm install
```

2. **Configure Environment Variables**

Create `.env` file in the root folder. Include:

- PORT=your-port
- MONGO_URI=your-mongodb-connection-string
- NODE_ENV=your-node-environment
- JWT_SECRET=your-jwt-secret

3. **Install Dependencies and Start the Application**

### frontend

```bash
cd frontend
npm install
npm run dev
```

### backend

```bash
cd backend
npm run dev
```

---

## Contributing

- Pull requests are welcome!
- For major changes, please open an issue first to discuss what you’d like to change.

## Contact Me

If you’d like to connect, collaborate, or explore my work further:

- Email: prinsipekumar@gmail.com
