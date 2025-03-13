import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

// Load Environment Variables
dotenv.config();

// MongoDB connection
connectDB();

// Intialize Express App
const app = express();
const server = http.createServer(app);

// MiddleWare
app.use(cors());
app.use(express.json());

// Connect Route
app.use("/api/auth", authRoutes);


// Socket.io setup

const io = new Server(server, {
  cors: {
    origin: "*", // Allows all Origins(update this later for security)
  },
});

io.on("connection", (socket) => {
  console.log("A User connected: ", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnected", () => {
    console.log("User disconnected: ", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
