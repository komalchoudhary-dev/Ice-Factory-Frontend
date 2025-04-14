import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../UserContext.jsx';
import fileDelivery from "/ImagePool/file-delivery.png";
import lockOpen from "/ImagePool/lock-open.png";
import unsplashXnzrf6Rrkm4 from "/ImagePool/unsplash-xnzrf6rrkm4.png";
import './HomePage.css';
import logoutIcon from "/ImagePool/lock-open.png"; 
import './Home.css';


export const HomePage = () => {
  const { userPhone, userDetails, logout } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
const Home = () => {
  const { userPhone } = useContext(UserContext);

  return (

    <div className="homepage-container">
      <div className="hero-section">
        <img className="hero-background" alt="Ice Factory Background" src={unsplashXnzrf6Rrkm4} />
        

        <nav className="navbar home-navbar">
          <div className="navbar-container">
            <div className="navbar-left">
              <Link to="/">
                <img className="navbar-logo" alt="Winter Logo" src={winter} />
                <div className="navbar-brand">Ice Factory</div>
              </Link>
              
              {/* Welcome message when user is logged in */}
              {userPhone && userDetails?.firstName && (
                <div className="welcome-message">
                  Welcome, {userDetails.firstName}!
                </div>
              )}
            </div>
            
            <div className="navbar-center">
              <div className="navbar-links">
                <Link to="/" className="nav-link active">HOME</Link>
                <Link to="/about" className="nav-link">ABOUT</Link>
                <Link to="/orders" className="nav-link">ORDER</Link>
                <Link to="/contact" className="nav-link">CONTACT</Link>
              </div>
            </div>
            
            <div className="navbar-auth">
              {userPhone ? (
                <div className="auth-buttons">
                  <Link to="/profile" className="auth-button user-profile">
                    MY ACCOUNT
                  </Link>
                  <button onClick={handleLogout} className="auth-button logout">
                    <img src={logoutIcon} alt="Logout" className="logout-icon" />
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link to="/login" className="auth-button login">
                  <img src={lockOpen} alt="Lock" className="login-icon" />
                  LOGIN
                </Link>
              )}
            </div>
            
            <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
        

        <div className="hero-content split-layout">
          <div className="hero-text">
            <h1 className="hero-title">CURRENT ICE RATES AND AVAILABILITY AT YOUR FINGERTIPS</h1>
            
            <p className="hero-description">
              Stay updated with our competitive ice rates and real-time
              availability. Order effortlessly and ensure your business never runs
              out of ice
            </p>
          </div>
          <div className="hero-action">
            <Link to="/orders" className="cta-button">
              GET STARTED
            </Link>
          </div>
        </div>
        
        <div className="features-section">
          <div className="feature-card">
            <img className="feature-icon" alt="File delivery" src={fileDelivery} />
            <h3 className="feature-title">Faster Delivery</h3>
            <p className="feature-description">
              Quick and reliable delivery service ensures your ice arrives fresh and ready to use
            </p>
          </div>
          
          <div className="feature-card">
            <img className="feature-icon" alt="File delivery" src={fileDelivery} />
            <h3 className="feature-title">Real-Time Tracking</h3>
            <p className="feature-description">
              Monitor your order from placement to delivery with our advanced tracking system
            </p>
          </div>
          
          <div className="feature-card">
            <img className="feature-icon" alt="File delivery" src={fileDelivery} />
            <h3 className="feature-title">Quality Guarantee</h3>
            <p className="feature-description">
              We ensure the highest quality ice products for all your cooling needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;