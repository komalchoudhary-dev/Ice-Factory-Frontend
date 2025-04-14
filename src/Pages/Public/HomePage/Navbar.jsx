import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import winter from "/ImagePool/winter.png";
import lockOpen from "/ImagePool/lock-open.png";

const Navbar = ({ userPhone }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" alt="Winter Logo" src={winter} />
        <div className="navbar-brand">Ice Factory</div>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">HOME</Link>
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
  );
};

export default Navbar;