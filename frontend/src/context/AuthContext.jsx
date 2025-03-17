import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Read token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token in header
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Fetched user:", data);
        setUser(data);
      } else {
        console.error("Failed to fetch user:", data.message);
        localStorage.removeItem("token"); // ✅ Clear token if invalid
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token); // ✅ Store token in localStorage
    await fetchUser(); // ✅ Fetch user immediately after login
  };

  const logout = async () => {
    localStorage.removeItem("token"); // ✅ Clear token on logout
    setUser(null);
  };

  useEffect(() => {
    fetchUser(); // ✅ Auto-fetch user on app load
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
