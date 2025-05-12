import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';
import './OrderHistoryEnhanced.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { userPhone } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [animatingOrders, setAnimatingOrders] = useState([]);
  
  // Refs for animation observers
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const filtersRef = useRef(null);
  const orderRefs = useRef({});

  // Add animation when component loads
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (headerRef.current) observer.observe(headerRef.current);
    if (tabsRef.current) observer.observe(tabsRef.current);
    if (filtersRef.current) observer.observe(filtersRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Track which orders are in view for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const orderId = entry.target.dataset.orderId;
          setAnimatingOrders(prev => [...prev, orderId]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all order cards
    Object.values(orderRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [orders]);

  // Fetch orders data
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!userPhone) {
        setError("Please log in to view your order history");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Simulate network delay for better animation visibility
        setTimeout(async () => {
          try {
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
        }, 800);
        
      } catch (err) {
        setError("Failed to load order history");
        setLoading(false);
        console.error("Error fetching order history:", err);
      }
    };
    
    fetchOrderHistory();
  }, [userPhone]);

  // Handle expanding/collapsing order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleViewDetails = (orderId) => {
    // Add a pulse animation to the card before navigating
    const orderCard = orderRefs.current[orderId];
    if (orderCard) {
      orderCard.classList.add('pulse-animation');
      setTimeout(() => {
        navigate(`/order-details/${orderId}`);
      }, 400);
    } else {
      navigate(`/order-details/${orderId}`);
    }
  };

  const handleCancelOrder = async (orderId, event) => {
    // Stop event propagation to prevent card expansion
    event.stopPropagation();
    
    // Show confirmation with animated dialog
    const orderElement = orderRefs.current[orderId];
    if (orderElement) {
      orderElement.classList.add('confirm-shake');
      
      setTimeout(() => {
        orderElement.classList.remove('confirm-shake');
        
        if (window.confirm('Are you sure you want to cancel this order?')) {
          processCancelOrder(orderId);
        }
      }, 600);
    } else if (window.confirm('Are you sure you want to cancel this order?')) {
      processCancelOrder(orderId);
    }
  };

  const processCancelOrder = async (orderId) => {
    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:8080/api/public/orders/cancel/${orderId}`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.status}`);
      }
      
      // Add a fade-out animation to the cancelled order
      const orderCard = orderRefs.current[orderId];
      if (orderCard) {
        orderCard.classList.add('order-fade-out');
      }
      
      // Refresh orders after animation
      setTimeout(async () => {
        const updatedOrdersResponse = await fetch(`http://localhost:8080/api/public/orders/history/${userPhone}`);
        if (!updatedOrdersResponse.ok) {
          throw new Error(`Failed to refresh orders: ${updatedOrdersResponse.status}`);
        }
        
        const updatedOrders = await updatedOrdersResponse.json();
        setOrders(updatedOrders);
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError("Failed to cancel order. Please try again.");
      console.error("Error cancelling order:", err);
      setLoading(false);
    }
  };

  const handleReorder = (orderId, event) => {
    // Stop event propagation to prevent card expansion
    event.stopPropagation();
    
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Add reorder animation
      const orderCard = orderRefs.current[orderId];
      if (orderCard) {
        orderCard.classList.add('reorder-animation');
        setTimeout(() => {
          navigate('/orders', { state: { quantity: order.quantity } });
        }, 500);
      } else {
        navigate('/orders', { state: { quantity: order.quantity } });
      }
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

  // Handle tab change with animation
  const changeTab = (tab) => {
    if (tab === activeTab) return;
    
    // Add animation class
    const tabsElement = document.querySelector('.history-tabs');
    if (tabsElement) {
      tabsElement.classList.add('tab-transition');
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => {
          tabsElement.classList.remove('tab-transition');
        }, 300);
      }, 150);
    } else {
      setActiveTab(tab);
    }
  };

  // Handle filter change with animation
  const changeFilter = (newFilter) => {
    if (newFilter === filter) return;
    
    // Add animation class
    const filtersElement = document.querySelector('.filter-buttons');
    if (filtersElement) {
      filtersElement.classList.add('filter-transition');
      setTimeout(() => {
        setFilter(newFilter);
        setTimeout(() => {
          filtersElement.classList.remove('filter-transition');
        }, 300);
      }, 150);
    } else {
      setFilter(newFilter);
    }
  };

  // Save order ref for animations
  const setOrderRef = (el, orderId) => {
    if (el && orderId) {
      orderRefs.current[orderId] = el;
    }
  };

  return (
    <>
      <Navbar />
      <div className="order-history-container">
        <div className="page-header animate-on-scroll" ref={headerRef}>
          <div className="ice-icon">❄️</div>
          <h1>Your Order History</h1>
          {/* <p className="page-description">
            View and manage all your orders with Muzaffarpur Ice Factory
          </p> */}
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="ice-cube-loader">
              <div className="cube">
                <div className="side front"></div>
                <div className="side back"></div>
                <div className="side right"></div>
                <div className="side left"></div>
                <div className="side top"></div>
                <div className="side bottom"></div>
              </div>
            </div>
            <p>Fetching your orders...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">❌</div>
            <div className="error-message">{error}</div>
            <div className="center-actions">
              <button className="btn secondary" onClick={() => navigate('/orders')}>
                <span>Go to Order Page</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="history-tabs animate-on-scroll" ref={tabsRef}>
              <button 
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => changeTab('upcoming')}
              >
                <span className="tab-icon">📅</span>
                <span>Upcoming Orders</span>
                <span className="order-count">{getUpcomingOrders().length}</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => changeTab('past')}
              >
                <span className="tab-icon">🗄️</span>
                <span>Past Orders</span>
                <span className="order-count">{getPastOrders().length}</span>
              </button>
            </div>
            
            <div className="filter-controls animate-on-scroll" ref={filtersRef}>
              <div className="filter-header">
                <div className="filter-label">
                  <i className="fas fa-filter"></i>
                  Filter by status:
                </div>
                <button 
                  className="mobile-filter-toggle"
                  onClick={() => setShowMobileFilters(prevState => !prevState)}
                >
                  {showMobileFilters ? 'Hide Filters' : 'Show Filters'} 
                  <span className={`toggle-icon ${showMobileFilters ? 'open' : ''}`}>▼</span>
                </button>
              </div>
              
              <div className={`filter-buttons ${showMobileFilters ? 'show-mobile' : 'hide-mobile'}`}>
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                  onClick={() => changeFilter('all')}
                >
                  All Orders
                </button>
                <button 
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} 
                  onClick={() => changeFilter('pending')}
                >
                  <span className="status-dot warning"></span>
                  Pending
                </button>
                <button 
                  className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`} 
                  onClick={() => changeFilter('confirmed')}
                >
                  <span className="status-dot info"></span>
                  Confirmed
                </button>
                <button 
                  className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} 
                  onClick={() => changeFilter('delivered')}
                >
                  <span className="status-dot success"></span>
                  Delivered
                </button>
                <button 
                  className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} 
                  onClick={() => changeFilter('rejected')}
                >
                  <span className="status-dot danger"></span>
                  Rejected
                </button>
                <button 
                  className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} 
                  onClick={() => changeFilter('cancelled')}
                >
                  <span className="status-dot danger"></span>
                  Cancelled
                </button>
              </div>
            </div>
            
            <div className="tab-content">
              <h2 className="section-title">
                {activeTab === 'upcoming' ? (
                  <>
                    <i className="fas fa-calendar-alt"></i> Upcoming Orders
                  </>
                ) : (
                  <>
                    <i className="fas fa-history"></i> Past Orders
                  </>
                )}
              </h2>
              
              {getCurrentOrders().length === 0 ? (
                <div className="no-orders">
                  <div className="empty-state-animation">
                    <div className="ice-cube">❄️</div>
                  </div>
                  <h3>No orders found</h3>
                  <p>
                    {filter !== 'all' 
                      ? `No ${filter} orders found in your ${activeTab === 'upcoming' ? 'upcoming' : 'past'} orders.`
                      : `You don't have any ${activeTab === 'upcoming' ? 'upcoming' : 'past'} orders.`}
                  </p>
                  {filter !== 'all' && (
                    <button 
                      className="btn secondary" 
                      onClick={() => changeFilter('all')}
                    >
                      <i className="fas fa-list"></i>
                      <span>Show All Orders</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="orders-list">
                  {getCurrentOrders().map(order => (
                    <div 
                      key={order.id} 
                      ref={(el) => setOrderRef(el, order.id)}
                      data-order-id={order.id}
                      className={`order-card ${getStatusClass(order.status)} ${expandedOrder === order.id ? 'expanded' : ''} ${animatingOrders.includes(order.id.toString()) ? 'slide-in-animation' : ''}`}
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="order-header">
                        <div className="order-id-date">
                          <h3>
                            <i className="fas fa-cube ice-cube-icon"></i>
                            Order #{order.id}
                          </h3>
                          <p>
                            <i className="fas fa-calendar"></i>
                            Placed on: {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <div className={`order-status ${getStatusClass(order.status)}`}>
                          <span className="status-badge">{order.status}</span>
                          <span className="expand-indicator">
                            {expandedOrder === order.id ? 
                              <i className="fas fa-chevron-up"></i> : 
                              <i className="fas fa-chevron-down"></i>
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-summary">
                        <div className="order-info">
                          <div className="info-group">
                            <label>
                              <i className="fas fa-truck-loading"></i>
                              Delivery Date:
                            </label>
                            <p>{formatDate(order.deliveryDate)}</p>
                          </div>
                          <div className="info-group">
                            <label>
                              <i className="fas fa-cubes"></i>
                              Quantity:
                            </label>
                            <p>{order.quantity} blocks</p>
                          </div>
                          <div className="info-group">
                            <label>
                              <i className="fas fa-rupee-sign"></i>
                              Total Amount:
                            </label>
                            <p className="amount">₹{order.totalAmount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      {expandedOrder === order.id && (
                        <div className="expanded-details">
                          <div className="details-section">
                            <h4>Delivery Address</h4>
                            <p>{order.address || "No address specified"}</p>
                          </div>
                          
                          <div className="details-section">
                            <h4>Payment Details</h4>
                            <div className="payment-info">
                              <div className="payment-row">
                                <span>Payment Method:</span>
                                <span>{order.paymentMethod || "Cash on Delivery"}</span>
                              </div>
                              <div className="payment-row">
                                <span>Payment Status:</span>
                                <span className={`payment-badge ${order.paymentStatus === 'Paid' ? 'paid' : 'pending'}`}>
                                  {order.paymentStatus || "Pending"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {order.notes && (
                            <div className="details-section">
                              <h4>Order Notes</h4>
                              <p className="order-notes">{order.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="order-actions">
                        {/* <button 
                          className="btn view-details" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(order.id);
                          }}
                        >
                          <i className="fas fa-eye"></i>
                          <span>View Details</span>
                        </button> */}
                        
                        {activeTab === 'upcoming' && ['pending', 'confirmed'].includes(order.status.toLowerCase()) && (
                          <button 
                            className="btn cancel" 
                            onClick={(e) => handleCancelOrder(order.id, e)}
                          >
                            <i className="fas fa-times-circle"></i>
                            <span>Cancel</span>
                          </button>
                        )}
                        
                        {order.status.toLowerCase() === 'delivered' && (
                          <button 
                            className="btn reorder"
                            onClick={(e) => handleReorder(order.id, e)}
                          >
                            <i className="fas fa-redo-alt"></i>
                            <span>Reorder</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="order-history-actions">
              <button className="btn primary pulse-btn" onClick={() => navigate('/orders')}>
                <i className="fas fa-plus-circle"></i>
                <span>Place New Order</span>
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