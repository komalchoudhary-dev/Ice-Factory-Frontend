import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../UserContext.jsx";
import "./Registration.css";
import axios from "axios";
import Footer from '../../../Components/Footer/Footer.jsx';
import Navbar from '../../../Components/Navbar/Navbar.jsx';

function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(UserContext);
  
  // Extract redirect information if available
  const redirectPath = location.state?.redirectAfterRegister || '/';
  const redirectState = location.state || {};
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
    place: "",
    country: "India", // Default value
    acceptTerms: false
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ""
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    
    // Phone validation - must be exactly 10 digits
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }
    
    // Basic email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.pinCode.trim()) errors.pinCode = "PIN code is required";
    if (!formData.place.trim()) errors.place = "Place is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.acceptTerms) errors.acceptTerms = "You must accept the terms and conditions";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset general error
    setError("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data for API to match backend schema with nested structure
      const userData = {
        user: {
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          // rate is not collected in the form, using default value
          rate: 0
        },
        address: {
          street: formData.address,
          city: formData.place,
          pincode: formData.pinCode
        }
      };
      
      // Make API call
      const response = await axios.post(
        "http://localhost:8080/api/public/users/new", 
        userData
      );
      
      // Handle successful registration
      if (response.status === 200 || response.status === 201) {
        // Login the user with the new account - flatten structure for local use
        login({
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          // Include address info for convenience
          street: formData.address,
          city: formData.place,
          pincode: formData.pinCode,
          // Include any other user data returned from the API
          ...(response.data?.user || {}),
          // Store complete address object
          address: response.data?.address || {
            street: formData.address,
            city: formData.place,
            pincode: formData.pinCode
          }
        });
        
        // Redirect to the intended destination or home
        navigate(redirectPath, { state: redirectState });
      } else {
        setError(response.data?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.response && err.response.data) {
        // Handle specific error from backend
        setError(err.response.data.message || "Registration failed. Please try again.");
        
        // Handle field-specific errors if the API returns them
        if (err.response.data.errors) {
          setFieldErrors(err.response.data.errors);
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-section right">
        <form onSubmit={handleSubmit} className="form-fields">
          <h2>Contact Details</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <input 
              type="text" 
              name="firstName"
              placeholder="First Name" 
              value={formData.firstName}
              onChange={handleChange}
              className={fieldErrors.firstName ? "error" : ""}
            />
            {fieldErrors.firstName && <span className="field-error">{fieldErrors.firstName}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="text" 
              name="lastName"
              placeholder="Last Name" 
              value={formData.lastName}
              onChange={handleChange}
              className={fieldErrors.lastName ? "error" : ""}
            />
            {fieldErrors.lastName && <span className="field-error">{fieldErrors.lastName}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="tel" 
              name="phone"
              placeholder="Contact No" 
              value={formData.phone}
              onChange={handleChange}
              className={fieldErrors.phone ? "error" : ""}
              maxLength="10"
            />
            {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              className={fieldErrors.email ? "error" : ""}
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>
          
          <div className="input-group">
            <input 
              type="text" 
              name="address"
              placeholder="Address" 
              value={formData.address}
              onChange={handleChange}
              className={fieldErrors.address ? "error" : ""}
            />
            {fieldErrors.address && <span className="field-error">{fieldErrors.address}</span>}
          </div>
          
          <div className="form-row">
            <div className="input-group">
              <input 
                type="text" 
                name="pinCode"
                placeholder="Pin Code" 
                value={formData.pinCode}
                onChange={handleChange}
                className={fieldErrors.pinCode ? "error" : ""}
              />
              {fieldErrors.pinCode && <span className="field-error">{fieldErrors.pinCode}</span>}
            </div>
            
            <div className="input-group">
              <input 
                type="text" 
                name="place"
                placeholder="Place" 
                value={formData.place}
                onChange={handleChange}
                className={fieldErrors.place ? "error" : ""}
              />
              {fieldErrors.place && <span className="field-error">{fieldErrors.place}</span>}
            </div>
          </div>
          
          <div className="input-group">
            <input 
              type="text" 
              name="country"
              placeholder="Country" 
              value={formData.country}
              onChange={handleChange}
              className={fieldErrors.country ? "error" : ""}
            />
            {fieldErrors.country && <span className="field-error">{fieldErrors.country}</span>}
          </div>
          
          <div className="terms-wrapper">
            <div className="terms-checkbox-container">
              <input 
                type="checkbox" 
                id="terms-checkbox" 
                name="acceptTerms"
                className={`terms-checkbox ${fieldErrors.acceptTerms ? "error" : ""}`}
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="terms-checkbox" className="terms-text">
                I do accept the terms and conditions of your company.
              </label>
            </div>
            {fieldErrors.acceptTerms && <span className="field-error">{fieldErrors.acceptTerms}</span>}
          </div>
          
          <button 
            type="submit" 
            className="register-button" 
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;