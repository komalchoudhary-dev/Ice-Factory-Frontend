import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../UserContext.jsx';
import "./LoginSignup.css";
import user_icon from "../../../assets/person.png";
import email_icon from "../../../assets/email.png";
import password_icon from "../../../assets/password.png";
import phone_icon from "../../../assets/phone.png";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loading: userContextLoading } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (action === "Login") {
      // Validate login fields
      if (!formData.phone || !formData.password) {
        setError("Please enter both phone number and password");
        return;
      }
      
      try {
        setLoading(true);
        
        // First, check if the credentials belong to an admin using GET method
        try {
          // Try admin verification first with GET method
          const adminResponse = await axios.get(
            `http://localhost:8080/api/admin/verifyLogin?phone=${encodeURIComponent(formData.phone)}&password=${encodeURIComponent(formData.password)}`
          );
          
          // If admin verification succeeds (returns true)
          if (adminResponse.data === true) {
            console.log("Admin login successful");
            
            // Store admin info in localStorage
            localStorage.setItem('adminPhone', formData.phone);
            localStorage.setItem('isAdmin', 'true');
            
            // Redirect to admin dashboard
            navigate('/admin-dashboard');
            return; // Exit early since we've handled admin login
          }
        } catch (adminErr) {
          // Admin check failed, continue to user login check
          console.log("Not an admin, checking if regular user...");
        }
        
        // If we get here, admin check failed, so check if it's a regular user
        const userResponse = await fetch(`http://localhost:8080/api/public/verifyLogin?phone=${encodeURIComponent(formData.phone)}&password=${encodeURIComponent(formData.password)}`);
        
        if (!userResponse.ok) {
          throw new Error(`Server error: ${userResponse.status}`);
        }
        
        const result = await userResponse.json();
        
        if (result === true) {
          // Login successful - call the login function from context
          await login(formData.phone);
          
          // Redirect to home page
          navigate('/');
        } else {
          // Login failed - neither admin nor regular user
          setError("Invalid phone number or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to connect to the server. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Sign Up logic would go here
      alert("Sign up functionality will be implemented soon!");
    }
  };

  // Determine if we're in any loading state
  const isLoading = loading || userContextLoading;

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
              />
            </div>
          )}

          <div className="input">
            <img src={phone_icon || email_icon} alt="Phone Icon" />
            <input 
              type={action === "Login" ? "tel" : "email"}
              name={action === "Login" ? "phone" : "email"}
              value={action === "Login" ? formData.phone : formData.email}
              onChange={handleChange}
              placeholder={action === "Login" ? "Phone Number" : "Email Id"}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
            />
          </div>
        </div>

        {action === "Login" && (
          <div className="forgot-password">
            Lost password? <span>Click Here</span>
          </div>
        )}

        {isLoading && <div className="loading-spinner">Verifying...</div>}

        <div className="submit-container">
          <button
            type="button"
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => navigate('/signup')}
            disabled={isLoading}
          >
            Sign Up
          </button>

          <button
            type="submit"
            className={action === "Sign Up" ? "submit gray" : "submit"}
            disabled={isLoading}
          >
            {action === "Login" ? "Login" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
