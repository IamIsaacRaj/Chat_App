import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to verify JWT token and protect routes

const protect = async (req, res, next) => {
  let token;

  try {
    // check if token exists in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Not authorized,no token" });
      }

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;
