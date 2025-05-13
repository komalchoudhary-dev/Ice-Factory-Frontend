import React from "react";
import "./AboutEnhanced.css";
import iceLogo from "../../../../assets/IceFactory.png";
import deliveryTruck from "../../../../assets/deliveryTruckOndashboard.png";
import muzImage from "../../../../assets/Muzaffarpur.jpg";

const About = () => {
  return (
    <div className="about-home-section">
      <div className="about-home-container">
        <div className="about-home-header reveal">
          <h2 className="about-home-title">About Our Ice Factory</h2>
          <div className="about-title-underline"></div>
          <p className="about-home-subtitle">
            Serving Muzaffarpur and surrounding areas with premium quality ice since 2003
          </p>
        </div>

        <div className="about-home-content">
          <div className="about-home-image-container reveal-left">
            <div className="about-image-wrapper">
              <img src={muzImage} alt="Muzaffarpur Ice Factory" className="about-home-image" />
              <div className="about-image-overlay">
                <div className="about-overlay-content">
                  <img src={iceLogo} alt="Ice Icon" className="about-overlay-icon" />
                  <span>Est. 2003</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-home-text reveal-right">
            <h3 className="about-home-heading">The Cold Standard in Quality & Service</h3>
            
            <p className="about-home-paragraph">
              Muzaffarpur Ice Factory has been a trusted name in the region for over two decades. 
              We've built our reputation on reliability, quality, and customer satisfaction.
            </p>
            
            <div className="about-feature-items">
              <div className="about-feature-item">
                <div className="about-feature-icon-wrapper">
                  <img src={iceLogo} alt="Premium Quality" className="about-feature-icon" />
                </div>
                <div className="about-feature-text">
                  <h4>Premium Quality Ice</h4>
                  <p>Crystal clear, hygienic ice produced with purified water</p>
                </div>
              </div>
              
              <div className="about-feature-item">
                <div className="about-feature-icon-wrapper">
                  <img src={deliveryTruck} alt="Fast Delivery" className="about-feature-icon" />
                </div>
                <div className="about-feature-text">
                  <h4>Fast Delivery</h4>
                  <p>Same-day delivery to ensure your ice arrives in perfect condition</p>
                </div>
              </div>
            </div>
            
            <p className="about-home-paragraph">
              Whether you're planning an event, running a business, or need ice for any 
              purpose, we're committed to exceeding your expectations with our superior products 
              and service.
            </p>
            
            <a href="/about" className="about-learn-more-btn">
              <span>Learn More About Us</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        
        <div className="about-stats-section reveal">
          <div className="about-stat-item">
            <div className="about-stat-number">20+</div>
            <div className="about-stat-label">Years Experience</div>
          </div>
          
          <div className="about-stat-item">
            <div className="about-stat-number">500+</div>
            <div className="about-stat-label">Happy Clients</div>
          </div>
          
          <div className="about-stat-item">
            <div className="about-stat-number">10K+</div>
            <div className="about-stat-label">Ice Blocks Monthly</div>
          </div>
          
          <div className="about-stat-item">
            <div className="about-stat-number">24/7</div>
            <div className="about-stat-label">Customer Support</div>
          </div>
        </div>
      </div>
      
      <div className="about-home-background-shapes">
        <div className="about-shape about-shape-1"></div>
        <div className="about-shape about-shape-2"></div>
        <div className="about-shape about-shape-3"></div>
      </div>
    </div>
  );
};

export default About;