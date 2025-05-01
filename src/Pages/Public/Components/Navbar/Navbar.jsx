import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../UserContext.jsx';
import winter from "/ImagePool/winter.png";
import lockOpen from "/ImagePool/lock-open.png";
import userIcon from "../../../../assets/person.png"; // Add a user icon to your ImagePool folder
import logoutIcon from "/ImagePool/lock-open.png"; // Update with a better logout icon
import profileIcon from "../../../../assets/person.png"; // Add a profile icon
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userPhone, userDetails, logout } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle mobile menu toggle
  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown if mobile menu is toggled
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  // Handle user dropdown toggle
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };
  
  // Handle profile navigation
  const handleProfileClick = () => {
    navigate('/profile');
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // New function to handle scrolling to sections
  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
    
    // Check if we're on the homepage
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage with a section parameter
      navigate('/?section=' + sectionId);
      return;
    }
    
    // If we're already on the homepage, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check for section parameter on page load
  useEffect(() => {
    if (location.pathname === '/') {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      
      if (section) {
        // Small timeout to ensure the DOM is fully loaded
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, [location]);

  // Handle scroll and check if navbar should be sticky
  useEffect(() => {
    // For homepage, initially hide navbar
    if (location.pathname === '/') {
      setIsVisible(false);
    } else {
      // For other pages, always show navbar
      setIsVisible(true);
      setIsSticky(true);
    }

    // Function to check scroll position and handle navbar visibility
    const handleScroll = () => {
      // Only do scroll check on homepage
      if (location.pathname === '/') {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          // Show navbar only when hero section is scrolled out of view
          const shouldShow = heroBottom <= 0;
          
          setIsVisible(shouldShow);
          setIsSticky(shouldShow);
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);
  
  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // Get first name if user is logged in
  const firstName = userDetails?.firstName || '';
  
  return (
    <nav className={`dynamic-navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <img className="navbar-logo" alt="Winter Logo" src={winter} />
            <div className="navbar-brand">Ice Factory</div>
          </Link>
          
          {/* Welcome message when user is logged in */}
          {userPhone && firstName && (
            <div className="welcome-message">
              Welcome, {firstName}!
            </div>
          )}
        </div>
        
        <div className="navbar-center">
          <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            {/* Updated About link to use scroll function */}
            <a 
              href="#about-section" 
              className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about-section');
              }}
            >
              ABOUT
            </a>
            <Link to="/orders" 
              className={location.pathname.includes('/order') && !location.pathname.includes('/order-history') ? 'nav-link active' : 'nav-link'}
              onClick={() => setMobileMenuOpen(false)}
            >
              ORDER
            </Link>
            {/* Only show History link for logged-in users */}
            {userPhone && (
              <Link to="/order-history" 
                className={location.pathname === '/order-history' ? 'nav-link active' : 'nav-link'}
                onClick={() => setMobileMenuOpen(false)}
              >
                HISTORY
              </Link>
            )}
            <Link to="/contact" 
              className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
        
        <div className="navbar-auth">
          {userPhone ? (
            <div className="user-dropdown-container" ref={dropdownRef}>
              <button 
                className="user-icon-button" 
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                <img src={userIcon} alt="User" className="user-icon" />
                <span className="user-icon-text">{firstName.charAt(0)}</span>
              </button>
              <div className={`user-dropdown ${isDropdownOpen ? 'active' : ''}`}>
                <div className="dropdown-user-info">
                  <span className="dropdown-user-name">{firstName} {userDetails?.lastName}</span>
                  <span className="dropdown-user-phone">{userPhone}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleProfileClick}>
                  <img src={profileIcon} alt="Profile" className="dropdown-icon" />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <img src={logoutIcon} alt="Logout" className="dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="auth-button login">
              <img src={lockOpen} alt="Lock" className="login-icon" />
              LOGIN
            </Link>
          )}
        </div>
        
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
