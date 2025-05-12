import React from "react";
import logo from "../../../assets/mfpLogo.png";
import "./ContactEnhanced.css";

const Contact = () => {
  return (
    <div className="contact-section reveal">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            We're here to answer your questions and provide excellent service
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info-card reveal-left">
            <div className="contact-logo-container">
              <img src={logo} alt="Ice Factory Logo" className="contact-logo" />
            </div>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="contact-icon fas fa-phone-alt"></i>
                </div>
                <div className="contact-text">
                  <h3>Call Us</h3>
                  <p>+91 7808485240</p>
                  <p className="contact-hours">Mon-Sat, 9AM to 6PM</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="contact-icon fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h3>Email Us</h3>
                  <p>theamanyadav@gmail.com</p>
                  <p className="contact-hours">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <i className="contact-icon fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h3>Visit Us</h3>
                  <p>Muzaffarpur Ice Factory</p>
                  <p>Station Road, Muzaffarpur, Bihar</p>
                </div>
              </div>
            </div>
            
            <div className="contact-social">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-map-wrapper reveal-right">
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.4812345674776!2d85.3442833!3d26.0458645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!2sMuzaffarpur+Ice+Factory!5e0!3m2!1sen!2sin!4v1652166785689!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Muzaffarpur Ice Factory Location">
              </iframe>
              <div className="map-overlay">
                <div className="map-pulse"></div>
                <div className="map-marker">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
            </div>
            
            <a 
              href="https://www.google.com/maps/place/Muzaffarpur+Ice+Factory/@26.0458645,85.3442833,788m/data=!3m1!1e3!4m6!3m5!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!8m2!3d26.0458652!4d85.3464713!16s%2Fg%2F11x6l52sjs?entry=ttu"
              target="_blank" 
              rel="noopener noreferrer"
              className="view-larger-map"
            >
              <i className="fas fa-external-link-alt"></i> View Larger Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
