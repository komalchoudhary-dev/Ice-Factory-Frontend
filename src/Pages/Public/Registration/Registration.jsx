import React from "react";
import "./Registration.css";

function Registration() {
  return (
    <div className="registration-container">
      <div className="form-section right">
        <div className="form-fields">
          <h2>Contact Details</h2>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Contact No" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Address" />
          <div className="form-row">
            <input type="text" placeholder="Pin Code" />
            <input type="text" placeholder="Place" />
          </div>
          <input type="text" placeholder="Country" />
          
          <div className="terms-wrapper">
            <div className="terms-checkbox-container">
              <input 
                type="checkbox" 
                id="terms-checkbox" 
                className="terms-checkbox"
              />
              <label htmlFor="terms-checkbox" className="terms-text">
                I do accept the terms and conditions of your company.
              </label>
            </div>
          </div>
        </div>
        <button className="register-button">Register</button>
      </div>
    </div>
  );
}

export default Registration;