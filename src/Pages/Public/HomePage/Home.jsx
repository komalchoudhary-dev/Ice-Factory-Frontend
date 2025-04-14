import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../UserContext.jsx';
import fileDelivery from "/ImagePool/file-delivery.png";
import lockOpen from "/ImagePool/lock-open.png";
import unsplashXnzrf6Rrkm4 from "/ImagePool/unsplash-xnzrf6rrkm4.png";
import winter from "/ImagePool/winter.png";
import Navbar from './Navbar.jsx';
import './HomePage.css';

export const HomePage = () => {
  const { userPhone } = useContext(UserContext);

  return (
    <><Navbar />
    <div className="homepage-container">
      {/* Hero Section with full-screen background */}
      <div className="hero-section">
        <img className="hero-background" alt="Ice Factory Background" src={unsplashXnzrf6Rrkm4} />
        
      
        
        {/* Hero Content - Modified layout with split design */}
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
        
        {/* Features Section - Now inside the hero section */}
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
  </>);
};

export default HomePage;