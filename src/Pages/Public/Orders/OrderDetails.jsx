import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Get selected date from location state if available
  const selectedDate = location.state?.selectedDate || '';
  const availableBlocks = location.state?.availability || 0;
  const orderCount = location.state?.orderCount || 0;
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: selectedDate,
    quantity: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.customerName || !formData.customerPhone || !formData.deliveryAddress || !formData.deliveryDate || formData.quantity < 1) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Here you would send the order data to your backend API
      // For now, we'll just simulate a successful order
      
      setTimeout(() => {
        setLoading(false);
        setSubmitSuccess(true);
        
        // Navigate after showing success message briefly
        setTimeout(() => {
          navigate('/order-history');
        }, 1500);
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-details-container">
      <div className="order-details-card">
        <h1>{submitSuccess ? 'Order Placed Successfully!' : 'Order Details'}</h1>
        
        {submitSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>Your order has been placed successfully! Redirecting to order history...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h3>Customer Information</h3>
              <div className="form-group">
                <label htmlFor="customerName">Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="input-field"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Delivery Information</h3>
              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address <span className="required">*</span></label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete delivery address"
                  rows="3"
                  className="input-field"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Ice Block Details</h3>
              <div className="form-group">
                <label htmlFor="quantity">Quantity <span className="required">*</span></label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max={availableBlocks}
                  required
                  className="input-field quantity-input"
                />
                <div className="availability-info">
                  <span>{availableBlocks}</span> blocks available (out of {1200} total capacity)
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn primary" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-indicator">
                      Processing...
                    </span>
                  </>
                ) : 'Place Order'}
              </button>
              <button 
                type="button" 
                className="btn secondary"
                onClick={() => navigate('/orders')}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;