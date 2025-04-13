import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { userPhone } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, delivered, rejected, cancelled

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!userPhone) {
        setError("Please log in to view your order history");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await fetch(`http://localhost:8080/api/public/orders/history/${userPhone}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch order history: ${response.status}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setLoading(false);
        
      } catch (err) {
        setError("Failed to load order history");
        setLoading(false);
        console.error("Error fetching order history:", err);
      }
    };
    
    fetchOrderHistory();
  }, [userPhone]);

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    navigate(`/order-details/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:8080/api/public/orders/cancel/${orderId}`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.status}`);
      }
      
      // Refresh order list
      const updatedOrdersResponse = await fetch(`http://localhost:8080/api/public/orders/history/${userPhone}`);
      if (!updatedOrdersResponse.ok) {
        throw new Error(`Failed to refresh orders: ${updatedOrdersResponse.status}`);
      }
      
      const updatedOrders = await updatedOrdersResponse.json();
      setOrders(updatedOrders);
      
    } catch (err) {
      setError("Failed to cancel order. Please try again.");
      console.error("Error cancelling order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Navigate to order page with pre-filled quantity
      navigate('/orders', { state: { quantity: order.quantity } });
    }
  };

  const filterOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status.toLowerCase() === filter);
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'status-success';
      case 'pending': return 'status-warning';
      case 'confirmed': return 'status-info';
      case 'rejected': return 'status-danger';
      case 'cancelled': return 'status-danger';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    // If timeString is already in HH:MM:SS format
    if (timeString && timeString.includes(':')) {
      const timeParts = timeString.split(':');
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${ampm}`;
    }
    return timeString;
  };

  const getStatusDescription = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': 
        return 'Order placed, waiting for admin approval.';
      case 'confirmed': 
        return 'Order approved by admin and is being processed.';
      case 'rejected': 
        return 'Order was rejected by the admin.';
      case 'cancelled': 
        return 'Order was cancelled by you after confirmation.';
      case 'delivered': 
        return 'Order has been successfully delivered.';
      default: 
        return 'Status unknown.';
    }
  };

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-container">
        <div className="error-message">{error}</div>
        <div className="center-actions">
          <button className="btn secondary" onClick={() => navigate('/orders')}>
            Go to Order Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <div className="page-header">
        <h1>Your Order History</h1>
        <p className="page-description">
          View and manage all your previous orders
        </p>
      </div>
      
      <div className="filter-controls">
        <div className="filter-label">Filter by status:</div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`} 
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} 
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} 
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
          <button 
            className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {filterOrders().length === 0 ? (
        <div className="no-orders">
          <div className="empty-state-icon">📋</div>
          <h3>No orders found</h3>
          <p>No {filter !== 'all' ? filter : ''} orders in your history.</p>
          {filter !== 'all' && (
            <button 
              className="btn secondary" 
              onClick={() => setFilter('all')}
            >
              Show All Orders
            </button>
          )}
        </div>
      ) : (
        <div className="orders-list">
          {filterOrders().map(order => (
            <div key={order.id} className={`order-card ${getStatusClass(order.status)}`}>
              <div className="order-header">
                <div className="order-id-date">
                  <h3>Order #{order.id}</h3>
                  <p>Placed on: {formatDate(order.orderDate)}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  <span className="status-badge">{order.status}</span>
                </div>
              </div>
              
              <div className="order-summary">
                <div className="order-info">
                  <div className="info-group">
                    <label>Delivery Date:</label>
                    <p>{formatDate(order.deliveryDate)}</p>
                  </div>
                  <div className="info-group">
                    <label>Quantity:</label>
                    <p>{order.quantity} blocks</p>
                  </div>
                  <div className="info-group">
                    <label>Total Amount:</label>
                    <p className="amount">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="order-actions">
                <button 
                  className="btn view-details" 
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                
                {order.status.toLowerCase() === 'pending' && (
                  <button 
                    className="btn cancel" 
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel
                  </button>
                )}
                
                {order.status.toLowerCase() === 'confirmed' && (
                  <button 
                    className="btn cancel" 
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel
                  </button>
                )}
                
                {order.status.toLowerCase() === 'delivered' && (
                  <button 
                    className="btn reorder"
                    onClick={() => handleReorder(order.id)}
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="order-history-actions">
        <button className="btn primary" onClick={() => navigate('/orders')}>
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;