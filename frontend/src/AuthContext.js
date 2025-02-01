import React, { createContext, useContext, useState } from "react";

// Create a context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email) => {
    setIsLoggedIn(true);
    setUser(email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token"); // Clear token on logout
  };

  const handleToken = async () => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);

    if (!token || token === "undefined") {
      console.log("No valid token found.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/authenticate",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Full Response Data:", data);

      if (data.Email) {
        login(data.Email); // Store user email in context
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, handleToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
