import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route           POST /api/auth/register
 * @description     Register a new user
 * @access          Public
 * @param {express.Request} req - Express request object containing user details
 * @param {express.Response} res - Express response object
 * @returns {Object} JSON response with success message or error message
 */

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log("User registered successfully");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /register:", error); // Log actual error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route           POST /api/auth/login
 * @description     Login user and return JWT token
 * @access          Public
 * @param {express.Request} req - Express request object containing login credentials
 * @param {express.Response} res - Express response object
 * @returns {Object} JSON response with JWT token or error message
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route           GET /api/auth/user
 * @description     Get logged-in user details (Protected Route)
 * @access          Private (Requires JWT)
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Object} - Returns user data (id, username, email)
 */

router.get("/user", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
