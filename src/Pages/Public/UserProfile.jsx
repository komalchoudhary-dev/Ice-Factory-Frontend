import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [userData, setUserData] = useState({
    firstName: "ABC",
    lastName: "XYZ",
    contact: "1234569870",
    address: "PQR",
    pinCode: "123456",
    place: "KLM",
    country: "DEF"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Saving user data:", userData);
    setIsEditing(false);
    // TODO: Add API call to save updated data here.
  };

  return (
    <div className="user-profile">
      <div className="header">
        <div className="name-email">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <p>{userData.contact}</p>
        </div>
      </div>
      <div className="content">
        <div className="details">
          <div className="detail-item">
            <span>First Name:</span>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>Last Name:</span>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>Address:</span>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>Pin Code:</span>
            <input
              type="text"
              name="pinCode"
              value={userData.pinCode}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>City:</span>
            <input
              type="text"
              name="place"
              value={userData.place}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>Country:</span>
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
          <div className="detail-item">
            <span>Contact No:</span>
            <input
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-input"
            />
          </div>
        </div>
        <p className="terms-text">You can update your details anytime.</p>
        {isEditing ? (
          <button className="register-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="register-button" onClick={handleEditToggle}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;