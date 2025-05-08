import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';
import logo from "../../../assets/mfpLogo.png";
import lockOpen from "/ImagePool/lock-open.png";
import userIcon from "../../../assets/person.png";
import logoutIcon from "/ImagePool/lock-open.png";
import profileIcon from "../../../assets/person.png";
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userPhone, userDetails, logout } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle mobile menu toggle
  const toggleMenu = () => {
    const newMenuState = !isMobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    // Toggle body class to prevent scrolling when menu is open
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
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

  // Handle scroll and check if navbar should be sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAbout = (e) => {
  e.preventDefault();
  setMobileMenuOpen(false);
  
  const aboutSection = document.getElementById('about-section');
  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};
const scrollToContact = (e) => {
  e.preventDefault();
  setMobileMenuOpen(false);
  
  const contactSection = document.getElementById('contact-section');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

  
  // Get first name if user is logged in
  const firstName = userDetails?.firstName || '';
  
  return (
    <nav className={`dynamic-navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <img className="navbar-logo" alt="Winter Logo" src={logo} />
            <div className="navbar-brand">Muzaffarpur Ice</div>
          </Link>
          
          {/* Welcome message when user is logged in - hidden on mobile */}
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
            <a 
              href="#about-section" 
              className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
              onClick={scrollToAbout}
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
            <a 
              href="#contact-section" 
              className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
              onClick={scrollToContact}
            >
              CONTACT
            </a>
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