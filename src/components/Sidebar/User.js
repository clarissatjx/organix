import React from "react";
import profilepicture from "../../images/placeholder.jpg";
import { useUser } from "../../context/user";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting after logout

function User() {
  const { username, logout } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Call the logout function to reset the user state
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <div className="User">
      <div className="profilepicture">
        <img src={profilepicture} alt="profilepicture" />
      </div>
      <div className="info">
        <p>{username}</p>
        <a href="#" onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default User;
