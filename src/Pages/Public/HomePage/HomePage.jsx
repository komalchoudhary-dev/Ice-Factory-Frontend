import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { h1 } from 'framer-motion/client';
import './HomepageEnhanced.css';

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once the animation has played, no need to observe this element anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all elements with the reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .about-section');
    revealElements.forEach(element => {
      observer.observe(element);
    });
    
    // Clean up
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
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

