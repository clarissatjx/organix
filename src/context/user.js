import { createContext, useContext, useState, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Get the username from local storage if available
    return localStorage.getItem("username") || "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const logout = () => {
    setUsername(""); // Reset the username
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    // Add any other logout logic, like clearing tokens if applicable
  };

  useEffect(() => {
    // Store the username in local storage whenever it changes
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, setIsLoggedIn, isLoggedIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
