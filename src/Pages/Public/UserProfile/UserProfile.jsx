import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext.jsx";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import "./UserProfile.css";

function UserProfile() {
  const { userPhone, userDetails,userAddress, setUserDetails } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  
  useEffect(() => {
    // Fetch user details from localStorage first
    const storedUser = localStorage.getItem('userDetails');
    const storedAddress = localStorage.getItem('userAddress');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        let addressData = { street: "", city: "", pincode: "" };
        
        // Parse address data if available
        if (storedAddress) {
          try {
            const parsedAddress = JSON.parse(storedAddress);
            // Check if it's an array and has at least one element
            if (Array.isArray(parsedAddress) && parsedAddress.length > 0) {
              addressData = parsedAddress[0]; // Use the first address
            }
          } catch (err) {
            console.error("Error parsing address data:", err);
          }
        }
        
        // Set initial data from localStorage
        setUserData({
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          contact: parsedUser.phone || "",
          address: addressData.street || "",
          pinCode: addressData.pincode || "",
          place: addressData.city || "",
          country: "India"  // Default value
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
        setError("Failed to load user profile data");
        setLoading(false);
      }
    } else {
      // If no data in localStorage, check if we have it in context
      if (userDetails) {
        // Get address from context
        let addressData = { street: "", city: "", pincode: "" };
        
        if (userAddress && Array.isArray(userAddress) && userAddress.length > 0) {
          addressData = userAddress[0];
        }
        
        setUserData({
          firstName: userDetails.firstName || "",
          lastName: userDetails.lastName || "",
          contact: userDetails.phone || "",
          address: addressData.street || "",
          pinCode: addressData.pincode || "",
          place: addressData.city || "",
          country: "India"
        });
        setLoading(false);
      } else {
        setError("User data not found. Please log in again.");
        setLoading(false);
      }
    }
  }, [userDetails, userAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear any previous save status
    setSaveStatus(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSaveStatus(null); // Reset save status when toggling edit mode
  };

  const handleSave = async () => {
    if (!userData) return;
    
    setLoading(true);
    setSaveStatus("saving");
    
    try {
      // First, update the user details
      const userUpdateData = {
        phone: userData.contact,
        firstName: userData.firstName,
        lastName: userData.lastName,
        // Keep the existing rate if available or use default
        rate: userDetails?.rate || 10.0
      };
      
      // Make API call to update user profile data
      const userResponse = await axios.put(
        `http://localhost:8080/api/public/users/${userData.contact}`,
        userUpdateData
      );
      
      // Then, update the user's address
      // First, determine the address ID
      const addressId = userAddress && Array.isArray(userAddress) && userAddress.length > 0 
        ? userAddress[0].address_id 
        : null;
      
      let addressUpdateSuccess = false;
      let updatedAddressData = null;
      
      if (addressId) {
        // If we have an address ID, update the existing address
        const addressUpdateData = {
          street: userData.address,
          city: userData.place,
          pincode: userData.pinCode
        };
        
        try {
          // Use the correct endpoint for address updates
          const addressResponse = await axios.put(
            `http://localhost:8080/api/public/users/phone/${userData.contact}/address/${addressId}`,
            addressUpdateData
          );
          
          if (addressResponse.status === 200) {
            addressUpdateSuccess = true;
            updatedAddressData = addressResponse.data;
          }
        } catch (addressError) {
          console.error("Error updating address:", addressError);
          
          // Try alternative endpoint
          try {
            const fallbackResponse = await axios.put(
              `http://localhost:8080/api/public/address/${addressId}`,
              addressUpdateData
            );
            
            if (fallbackResponse.status === 200) {
              addressUpdateSuccess = true;
              updatedAddressData = fallbackResponse.data;
            }
          } catch (fallbackError) {
            console.error("Error with fallback endpoint:", fallbackError);
            throw new Error("Failed to update address. Please try again.");
          }
        }
      } else {
        // If no address ID, create a new address
        const newAddressData = {
          street: userData.address,
          city: userData.place,
          pincode: userData.pinCode
        };
        
        // Call API to add a new address for the user
        try {
          const newAddressResponse = await axios.post(
            `http://localhost:8080/api/public/users/${userData.contact}/address`,
            newAddressData
          );
          
          if (newAddressResponse.status === 201 || newAddressResponse.status === 200) {
            addressUpdateSuccess = true;
            updatedAddressData = newAddressResponse.data;
          }
        } catch (createError) {
          console.error("Error creating address:", createError);
          throw new Error("Failed to create new address");
        }
      }
      
      // Update local storage with the new user data regardless of address update
      // First update userDetails in localStorage
      const updatedUserDetails = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.contact,
        rate: userDetails?.rate || 10.0
      };
      
      localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
      
      // If address was successfully updated or created, update it in localStorage
      if (addressUpdateSuccess && updatedAddressData) {
        // If we got address data back from the API, use it
        localStorage.setItem('userAddress', JSON.stringify([updatedAddressData]));
      } else {
        // Otherwise, create address object based on form data
        const fallbackAddress = [{
          address_id: addressId || 0,
          street: userData.address,
          city: userData.place,
          pincode: userData.pinCode
        }];
        
        localStorage.setItem('userAddress', JSON.stringify(fallbackAddress));
      }
      
      // Update context if available
      if (setUserDetails) {
        setUserDetails(updatedUserDetails);
      }
      
      setSaveStatus("success");
      setIsEditing(false);
      setError(null);
      
      // Force a refresh of user data from the API to ensure everything is in sync
      setTimeout(() => {
        window.location.reload(); // This is a simple way to refresh all data
      }, 1500); // Wait 1.5 seconds to show the success message
      
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveStatus("error");
      setError(err.response?.data?.message || err.message || "An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <div id="user-profile-page">
        <div className="loading-indicator">Loading user profile...</div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div id="user-profile-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div id="user-profile-page">
        <div className="user-profile">
          <div className="header">
            <div className="name-email">
              <h2>{userData.firstName} {userData.lastName}</h2>
              <p>{userData.contact}</p>
            </div>
          </div>
          
          <div className="content">
            {error && <div className="error-alert">{error}</div>}
            {saveStatus === "success" && (
              <div className="success-alert">Profile updated successfully!</div>
            )}
            
            <div className="details">
              <div className="detail-item">
                <span>First Name:</span>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`form-input ${isEditing ? 'editable' : ''}`}
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
                  className={`form-input ${isEditing ? 'editable' : ''}`}
                />
              </div>
              
              <div className="detail-item">
                <span>Contact No:</span>
                <input
                  type="text"
                  name="contact"
                  value={userData.contact}
                  onChange={handleChange}
                  readOnly={true} // Phone number should not be editable
                  className="form-input readonly"
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
                  className={`form-input ${isEditing ? 'editable' : ''}`}
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
                  className={`form-input ${isEditing ? 'editable' : ''}`}
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
                  className={`form-input ${isEditing ? 'editable' : ''}`}
                />
              </div>
              
              <div className="detail-item">
                <span>Country:</span>
                <input
                  type="text"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                  readOnly={true} // Country is fixed as India
                  className="form-input readonly"
                />
              </div>
            </div>
            
            <p className="terms-text">
              {isEditing 
                ? "Click Save to update your profile" 
                : "You can update your details anytime."}
            </p>
            
            {isEditing ? (
              <button 
                className="register-button" 
                onClick={handleSave}
                disabled={saveStatus === "saving"}
              >
                {saveStatus === "saving" ? "Saving..." : "Save"}
              </button>
            ) : (
              <button className="register-button" onClick={handleEditToggle}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;