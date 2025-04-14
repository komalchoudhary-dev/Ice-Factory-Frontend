import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from './Navbar.css';

// Navbar Component (handles both logged in and logged out states)
const Navbar = ({ isAuthenticated, user }) => {
  return (
    <><Nav />
    <div>
     
        /* Navbar for authenticated users (shows user info, History button) */
         <nav className="navbar">
                  <div className="navbar-left">
                    <img className="navbar-logo" alt="Winter Logo" src={winter} />
                    <div className="navbar-brand">Ice Factory</div>
                  </div>
                  
                  <div className="navbar-links">
                    <Link to="/" className="nav-link active">HOME</Link>
                    <Link to="/about" className="nav-link">ABOUT US</Link>
                    <Link to="/orders" className="nav-link">PLACE ORDER</Link>
                    <Link to="/contact" className="nav-link">CONTACT US</Link>
                  </div>
                  
                  <div className="navbar-auth">
                    {userPhone ? (
                      <Link to="/profile" className="auth-button user-profile">
                        MY ACCOUNT
                      </Link>
                    ) : (
                      <Link to="/login" className="auth-button login">
                        <img src={lockOpen} alt="Lock" className="login-icon" />
                        LOGIN
                      </Link>
                    )}
                  </div>
                </nav>
      )
    </div>
  </>);
};



