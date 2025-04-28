import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';
import './OrderHistory.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { userPhone } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, delivered, rejected, cancelled
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      navigate('/orders', { state: { quantity: order.quantity } });
    }
  };

  // Filter orders by status
  const filterOrdersByStatus = (ordersList) => {
    if (filter === 'all') return ordersList;
    return ordersList.filter(order => order.status.toLowerCase() === filter);
  };

  // Separate orders into upcoming and past based on delivery date
  const getUpcomingOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    return orders.filter(order => {
      const deliveryDate = new Date(order.deliveryDate);
      return deliveryDate >= today;
    });
  };

  const getPastOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    
    return orders.filter(order => {
      const deliveryDate = new Date(order.deliveryDate);
      return deliveryDate < today;
    });
  };

  // Get current filtered orders based on tab and status filter
  const getCurrentOrders = () => {
    const ordersList = activeTab === 'upcoming' ? getUpcomingOrders() : getPastOrders();
    return filterOrdersByStatus(ordersList);
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

  return (
    <>
      <Navbar />
      <div className="order-history-container">
        <div className="page-header">
          <h1>Your Order History</h1>
          <p className="page-description">
            View and manage all your orders
          </p>
        </div>
        
        {loading ? (
          // Single loading indicator
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your order history...</p>
          </div>
        ) : error ? (
          // Error message
          <div className="error-container">
            <div className="error-message">{error}</div>
            <div className="center-actions">
              <button className="btn secondary" onClick={() => navigate('/orders')}>
                Go to Order Page
              </button>
            </div>
          </div>
        ) : (
          // Content when loaded successfully
          <>
            {/* Tab navigation */}
            <div className="history-tabs">
              <button 
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Orders ({getUpcomingOrders().length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Orders ({getPastOrders().length})
              </button>
            </div>
            
            <div className="filter-controls">
              <div className="filter-header">
                <div className="filter-label">Filter by status:</div>
                <button 
                  className="mobile-filter-toggle"
                  onClick={() => setShowMobileFilters(prevState => !prevState)}
                >
                  {showMobileFilters ? 'Hide Filters' : 'Show Filters'} 
                  <span className={`toggle-icon ${showMobileFilters ? 'open' : ''}`}>▼</span>
                </button>
              </div>
              
              <div className={`filter-buttons ${showMobileFilters ? 'show-mobile' : ''}`}>
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
            
            {/* Current filtered orders list */}
            <div className="tab-content">
              <h2 className="section-title">
                {activeTab === 'upcoming' ? 'Upcoming Orders' : 'Past Orders'}
              </h2>
              
              {getCurrentOrders().length === 0 ? (
                <div className="no-orders">
                  <div className="empty-state-icon">📋</div>
                  <h3>No orders found</h3>
                  <p>
                    {filter !== 'all' 
                      ? `No ${filter} orders found in your ${activeTab === 'upcoming' ? 'upcoming' : 'past'} orders.`
                      : `You don't have any ${activeTab === 'upcoming' ? 'upcoming' : 'past'} orders.`}
                  </p>
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
                  {getCurrentOrders().map(order => (
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
                        
                        {activeTab === 'upcoming' && order.status.toLowerCase() === 'pending' && (
                          <button 
                            className="btn cancel" 
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                        
                        {activeTab === 'upcoming' && order.status.toLowerCase() === 'confirmed' && (
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
            </div>
            
            <div className="order-history-actions">
              <button className="btn primary" onClick={() => navigate('/orders')}>
                Place New Order
              </button>
            </div>
          </>
        )}
      </div> 
      <Footer />
    </>
  );
};

export default OrderHistory;