import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import "./Profile.css";

const Profile = () => {
  const { userData, setUserData } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  if (!userData) {
    return <p className="profile-message">No user data available. Please log in.</p>;
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSave = () => {
    fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); 
        setIsEditing(false);
      })
      .catch((error) => console.error("Update failed:", error));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-card">
        {isEditing ? (
          <>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Surname:</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

            <label>Mobile:</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />

            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />

            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userData.name} {userData.surname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Address:</strong> {userData.address}</p>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

