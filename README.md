# MERN Real-Time Chat App
A real-time chat application built using MERN Stack (MongoDB, Express, React, Node.js) and Socket.io for instant messaging.

---

## 📂 Project Structure
mern-chat-app/ 
```
├── backend/                # Node.js, Express, MongoDB, Socket.io 
│ ├── config/               # Database Connection 
│ │ ├── db.js               # MongoDB connection setup 
│ ├── models/               # Mongoose Schemas (User) 
│ │ ├── User.js             # User schema (username, email, password) 
│ ├── routes/               # API Routes (Authentication) 
│ │ ├── authRoutes.js       # Signup & Login with JWT 
│ ├── server.js             # Main Express Server 
│ ├── .env                  # Environment Variables 
│ ├── package.json          # Backend Dependencies 
├── frontend/               # React + TailwindCSS (To be added) 
│ ├── src/ 
│ ├── public/ 
│ ├── package.json 
│ ├── README.md 
├──.gitignore               # Ignored Files 
├── README.md               # Main Project Documentation
```
---

## Features
✅ Real-time messaging with Socket.io   
✅ User authentication (JWT-based Login & Signup)   
✅ MongoDB storage for messages & users    
✅ Tailwind CSS for responsive UI   
✅ Secure .env file handling    
✅ Deployment-ready on Render/Vercel    

---

## UI & Styling
The frontend is built using React.js and Tailwind CSS for a sleek and modern UI.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
```

2️⃣ Backend Setup

```bash
cd backend
npm install

```
Create a .env file in the backend/ folder:

```javascript
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000

```

Run the backend:
```bash
npx nodemon server.js

```
Your backend should now be running on http://localhost:5000 🚀

---

##  API Endpoints
3️⃣ Test Authentication Routes
Use Postman/Thunder Client:

- ✅ Register a User   

 ```
POST → http://localhost:5000/api/auth/register

```
- Body (JSON):
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- ✅ Login a User
```
POST → http://localhost:5000/api/auth/login
```
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- Response (Success):
```json
{
  "token": "your_jwt_token_here",
  "user": {
    "id": "651234abcd567ef89",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```








