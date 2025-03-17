# MERN Real-Time Chat App

A **real-time chat application** built using **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.io** for instant messaging.

---

## 🚀 Tech Stack

- ⚡ **Vite** for fast development
- 🎨 **TailwindCSS** for styling
- 📡 **Socket.io** for real-time messaging
- 🔐 **JWT Authentication** for user login/signup
- 🌍 **MongoDB Atlas** for cloud-based database

---

## 📂 Project Structure

```
mern-chat-app/
├── backend/                # Node.js, Express, MongoDB, Socket.io
│ ├── config/               # Database Connection
│ │ ├── db.js               # MongoDB connection setup
│ ├── models/               # Mongoose Schemas (User, Message)
│ │ ├── User.js             # User schema (username, email, password)
│ │ ├── Message.js          # Chat message schema
│ ├── routes/               # API Routes
│ │ ├── authRoutes.js       # Signup & Login with JWT
│ │ ├── messageRoutes.js    # Send & Fetch messages
│ ├── middleware/           # Auth middleware (JWT verification)
│ ├── server.js             # Main Express Server
│ ├── .env                  # Environment Variables
│ ├── package.json          # Backend Dependencies
│
├── frontend/               # React + TailwindCSS + React Router
│ ├── src/                  # React source code
│ │ ├── context/            # Auth context for JWT handling
│ │ │ ├──AuthContext.jsx
│ │ ├── models/             # A Popup modal for login or register User
│ │ │ ├──Authmodel.jsx
│ │ ├── App.css             # Global styles
│ │ ├── App.jsx             # Main React component
│ │ ├── index.css           # TailwindCSS styles
│ │ ├── main.jsx            # React entry point
│ ├── .eslintrc.js          # ESLint configuration
│ ├── index.html            # Main HTML file
│ ├── package-lock.json     # Dependency lock file
│ ├── package.json          # Frontend Dependencies
│ ├── postcss.config.js     # PostCSS Configuration
│ ├── tailwind.config.js    # TailwindCSS Configuration
│ ├── vite.config.js        # Vite Configuration
├── .gitignore               # Ignored Files
├── README.md               # Project Documentation
```

---

## ✨ Features

✅ **Real-time messaging** with **Socket.io**\
✅ **User authentication** (JWT-based Login & Signup)\
✅ **MongoDB storage** for messages & users\
✅ **Responsive UI** with **Tailwind CSS**\
✅ **Secure environment variables** handling\


---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```plaintext
MONGO_URI = your-mongodb-connection-string
JWT_SECRET = your-secret-key
PORT = 5000
```

Start the backend server:

```bash
npm start
```

Your backend should now be running on **[http://localhost:5000](http://localhost:5000)** 🚀

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend server:

```bash
npm run dev
```

Your frontend should now be running on **[http://localhost:5173](http://localhost:5173)**

---

## 🛠 Future Enhancements

🔹 Add **typing indicators** for real-time feedback\
🔹 Implement **group chat** functionality\
🔹 Add **online status** tracking

---