import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthModel = ({ isOpen, onClose, isRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting form data:", formData);

    // Prevent sending empty username
    if (isRegister && !formData.username) {
      throw new Error("Username is required for registration.");
    }

    const url = isRegister
      ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`
      : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);
      
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      if (isRegister) {
        console.log("Auto logging in user...");
        if (!data.token)
          throw new Error("Token not received after registration.");
        login(data.token); // ✅ Directly use the token from registration
      } else {
        login(data.token);
      }
      onClose();
    } catch (error) {
      console.error("Registration/Login error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-white text-xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {isRegister && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 mb-2 text-black rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 mb-2 text-black rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 mb-2 text-black rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white p-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-3 text-gray-300 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModel;
