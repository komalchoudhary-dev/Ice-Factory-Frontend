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
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [resetMessage, setResetMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState(false);
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

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
    setResetStep(1);
    setResetMessage('');
    setResetError(false);
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    setResetMessage('');
    setResetError(false);
    
    try {
      const response = await axios.post('http://localhost:8080/api/public/password/forgot', { 
        email: resetPassword.email 
      });
      setResetMessage(response.data.message);
      setResetStep(2);
    } catch (error) {
      setResetMessage('Failed to send reset code. Please try again.');
      setResetError(true);
    } finally {
      setIsResetting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    setResetMessage('');
    setResetError(false);

    try {
      const response = await axios.post('http://localhost:8080/api/public/password/verify-otp', {
        email: resetPassword.email,
        otp: resetPassword.otp
      });
      
      localStorage.setItem('resetToken', response.data.resetToken);
      setResetMessage('OTP verified successfully');
      setResetStep(3);
    } catch (error) {
      setResetMessage('Invalid or expired code');
      setResetError(true);
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    setResetMessage('');
    setResetError(false);

    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      setResetMessage('Passwords do not match');
      setResetError(true);
      setIsResetting(false);
      return;
    }

    try {
      const resetToken = localStorage.getItem('resetToken');
      const response = await axios.post('http://localhost:8080/api/public/password/reset', {
        resetToken,
        newPassword: resetPassword.newPassword
      });

      setResetMessage(response.data.message);
      localStorage.removeItem('resetToken');

      // Close modal and reset state after 2 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetPassword({
          email: '',
          otp: '',
          newPassword: '',
          confirmPassword: ''
        });
        setResetStep(1);
      }, 2000);
    } catch (error) {
      setResetMessage(error.response?.data?.message || 'Failed to reset password');
      setResetError(true);
    } finally {
      setIsResetting(false);
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
          <div className="auth-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button 
              className="forgot-password-link"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </button>
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

      {showForgotPassword && (
        <div className="reset-password-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowForgotPassword(false)}>×</button>
            
            <div className="step-indicator">
              <span className={`step-dot ${resetStep >= 1 ? 'active' : ''}`}></span>
              <span className={`step-dot ${resetStep >= 2 ? 'active' : ''}`}></span>
              <span className={`step-dot ${resetStep >= 3 ? 'active' : ''}`}></span>
            </div>

            {resetMessage && (
              <div className={`reset-message ${resetError ? 'error' : 'success'}`}>
                {resetMessage}
              </div>
            )}

            {resetStep === 1 && (
              <form onSubmit={handleSendResetCode}>
                <h3>Forgot Password</h3>
                <div className="input">
                  <img src={email_icon} alt="Email" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={resetPassword.email}
                    onChange={handleResetChange}
                    required
                  />
                </div>
                <button type="submit" className="submit" disabled={isResetting}>
                  {isResetting ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            )}

            {resetStep === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <h3>Verify Email Code</h3>
                <p>We've sent a 6-digit code to {resetPassword.email}</p>
                <div className="input">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    value={resetPassword.otp}
                    onChange={handleResetChange}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
                <button type="submit" className="submit" disabled={isResetting}>
                  {isResetting ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>
            )}

            {resetStep === 3 && (
              <form onSubmit={handleResetPassword}>
                <h3>Create New Password</h3>
                <div className="password-fields">
                  <div className="input">
                    <img src={password_icon} alt="Password" />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New password"
                      value={resetPassword.newPassword}
                      onChange={handleResetChange}
                      required
                      minLength={8}
                    />
                  </div>
                  <div className="input">
                    <img src={password_icon} alt="Password" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={resetPassword.confirmPassword}
                      onChange={handleResetChange}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <button type="submit" className="submit" disabled={isResetting}>
                  {isResetting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
