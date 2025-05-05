import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { h1 } from 'framer-motion/client';

import Login from './Login.jsx';
import History from './History.jsx';
import Orders from './Orders.jsx';
import Home from './Home.jsx';
import Contact from './Contact.jsx';
import About from '../About/About.jsx';
import Footer from '../Components/Footer/Footer.jsx';

export default function Frame_1() {
  const location = useLocation();
  
  // Handle automatic scrolling when navigating from another page
  useEffect(() => {
    // Check if there's a section to scroll to in the location state
    if (location.state && location.state.scrollToSection) {
      const { scrollToSection, immediate } = location.state;
      
      // Find the target element by ID
      const targetElement = document.getElementById(scrollToSection);
      
      if (targetElement) {
        // Use a small timeout for immediate scrolling or a longer one if normal navigation
        const delay = immediate ? 100 : 500;
        
        setTimeout(() => {
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Clear the location state to prevent scrolling on page refresh
          window.history.replaceState({}, document.title);
        }, delay);
      }
    }
  }, [location]);
  
  return (
    <>
     <Home />
      <div id="about-section">
        <About />
      </div>
      <div id="contact-section">
        <Footer />
      </div>
    </>
  );
}

