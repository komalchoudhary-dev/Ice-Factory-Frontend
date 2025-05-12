import React, { useState } from "react";
import "./ContactUsEnhanced.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      error: false,
      message: "Thank you for your message! We'll get back to you soon.",
    });
    
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false,
        message: "",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <div className="title-underline"></div>
        <p className="contact-subtitle">We're here to help and answer any questions you may have</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-card">
          <div className="info-section">
            <div className="info-header">
              <div className="icon-wrapper">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h2>Our Location</h2>
            </div>
            <div className="info-details">
              <p className="info-title">Muzaffarpur Ice Factory</p>
              <p>Station Road, Near Railway Station</p>
              <p>Muzaffarpur, Bihar, India - 842001</p>
              <a
                href="https://www.google.com/maps/place/Muzaffarpur+Ice+Factory/@26.0458645,85.3442833,788m/data=!3m1!1e3!4m6!3m5!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!8m2!3d26.0458652!4d85.3464713!16s%2Fg%2F11x6l52sjs?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="fas fa-external-link-alt"></i> View on Google Maps
              </a>
            </div>
          </div>

          <div className="info-section">
            <div className="info-header">
              <div className="icon-wrapper">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h2>Call Us</h2>
            </div>
            <div className="info-details">
              <p className="info-title">Sales & Support</p>
              <p>+91 7808485240</p>
              <p className="hours">Monday-Saturday, 9:00 AM - 6:00 PM</p>
              <p className="info-title mt-3">Emergency Orders</p>
              <p>+91 7808485240</p>
              <p className="hours">Available 24/7 for urgent deliveries</p>
            </div>
          </div>

          <div className="info-section">
            <div className="info-header">
              <div className="icon-wrapper">
                <i className="fas fa-envelope"></i>
              </div>
              <h2>Email Us</h2>
            </div>
            <div className="info-details">
              <p className="info-title">General Inquiries</p>
              <p><a href="mailto:theamanyadav@gmail.com">theamanyadav@gmail.com</a></p>
              <p className="hours">We respond within 24 hours</p>
              <p className="info-title mt-3">Bulk Orders & Business</p>
              <p><a href="mailto:orders@muzaffarpuricefactory.com">orders@muzaffarpuricefactory.com</a></p>
            </div>
          </div>

          <div className="info-section">
            <div className="info-header">
              <div className="icon-wrapper">
                <i className="fas fa-clock"></i>
              </div>
              <h2>Business Hours</h2>
            </div>
            <div className="info-details">
              <div className="hours-grid">
                <div className="day">Monday - Friday</div>
                <div className="time">9:00 AM - 6:00 PM</div>
                <div className="day">Saturday</div>
                <div className="time">9:00 AM - 4:00 PM</div>
                <div className="day">Sunday</div>
                <div className="time">Closed</div>
              </div>
              <p className="notice">Factory tours by appointment only</p>
            </div>
          </div>
        </div>

        <div className="contact-form-map-container">
          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            {formStatus.submitted ? (
              <div className="form-success-message">
                <i className="fas fa-check-circle"></i>
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?"
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}
          </div>
          
          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.4812345674776!2d85.3442833!3d26.0458645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!2sMuzaffarpur+Ice+Factory!5e0!3m2!1sen!2sin!4v1652166785689!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Muzaffarpur Ice Factory Location"
              ></iframe>
              <div className="map-overlay">
                <div className="pulse"></div>
                <div className="marker">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-cta-section">
        <div className="cta-box quick-order">
          <i className="fas fa-cube"></i>
          <h3>Need Ice Urgently?</h3>
          <p>Place an express order now for same-day delivery within Muzaffarpur</p>
          <a href="/orders" className="cta-button">
            Quick Order <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        
        <div className="cta-box subscription">
          <i className="fas fa-calendar-check"></i>
          <h3>Regular Ice Supply?</h3>
          <p>Set up a recurring delivery schedule for your business needs</p>
          <a href="/subscribe" className="cta-button">
            Subscribe <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        
        <div className="cta-box faq">
          <i className="fas fa-question-circle"></i>
          <h3>Have Questions?</h3>
          <p>Check our frequently asked questions for quick answers</p>
          <a href="/faq" className="cta-button">
            View FAQs <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div className="ice-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="ice-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}


