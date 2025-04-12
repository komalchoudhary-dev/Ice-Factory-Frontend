import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, delivered, cancelled

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch data from your backend API
        // Example: const response = await fetch('http://localhost:8080/api/public/orders/history');
        
        // For now, let's simulate an API response with mock data
        setTimeout(() => {
          const mockOrders = [
            {
              id: 'ORD-2025-001',
              date: '2025-04-07',
              deliveryDate: '2025-04-08',
              customerName: 'John Doe',
              totalAmount: 2500.00,
              status: 'delivered',
              items: [
                { name: 'Ice Block', quantity: 25, price: 100.00 }
              ],
              paymentStatus: 'paid'
            },
            {
              id: 'ORD-2025-002',
              date: '2025-04-08',
              deliveryDate: '2025-04-09',
              customerName: 'John Doe',
              totalAmount: 1500.00,
              status: 'pending',
              items: [
                { name: 'Ice Block', quantity: 15, price: 100.00 }
              ],
              paymentStatus: 'paid'
            },
            {
              id: 'ORD-2025-003',
              date: '2025-04-09',
              deliveryDate: '2025-04-11',
              customerName: 'John Doe',
              totalAmount: 2000.00,
              status: 'processing',
              items: [
                { name: 'Ice Block', quantity: 20, price: 100.00 }
              ],
              paymentStatus: 'pending'
            },
            {
              id: 'ORD-2025-004',
              date: '2025-04-05',
              deliveryDate: '2025-04-07',
              customerName: 'John Doe',
              totalAmount: 500.00,
              status: 'cancelled',
              items: [
                { name: 'Ice Block', quantity: 5, price: 100.00 }
              ],
              paymentStatus: 'refunded',
              cancellationReason: 'Customer requested cancellation'
            }
          ];
          
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError("Failed to load order history");
        setLoading(false);
        console.error("Error fetching order history:", err);
      }
    };
    
    fetchOrderHistory();
  }, []);

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    navigate(`/order-details/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    // In a real app, you would make an API call to cancel the order
    // For now, let's just update the local state
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
    }
  };

  const handleReorder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Navigate to order page with pre-filled quantity
      navigate('/orders');
    }
  };

  const filterOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'delivered': return 'status-success';
      case 'pending': return 'status-warning';
      case 'processing': return 'status-info';
      case 'cancelled': return 'status-danger';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            className={`filter-btn ${filter === 'processing' ? 'active' : ''}`} 
            onClick={() => setFilter('processing')}
          >
            Processing
          </button>
          <button 
            className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} 
            onClick={() => setFilter('delivered')}
          >
            Delivered
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
                  <p>Placed on: {formatDate(order.date)}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              
              <div className="order-summary">
                <div className="order-info">
                  <div className="info-group">
                    <label>Delivery Date:</label>
                    <p>{formatDate(order.deliveryDate)}</p>
                  </div>
                  <div className="info-group">
                    <label>Payment Status:</label>
                    <p className={`payment-status ${order.paymentStatus}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </p>
                  </div>
                  <div className="info-group">
                    <label>Total Amount:</label>
                    <p className="amount">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="order-items">
                  <h4>Order Summary</h4>
                  <div className="item-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item">
                        <div className="item-name-qty">
                          <span className="item-quantity">{item.quantity} x</span>
                          <span className="item-name">{item.name}</span>
                        </div>
                        <div className="item-subtotal">
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {order.status === 'cancelled' && order.cancellationReason && (
                <div className="cancellation-reason">
                  <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
                </div>
              )}
              
              <div className="order-actions">
                <button 
                  className="btn view-details" 
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                
                {(order.status === 'pending' || order.status === 'processing') && (
                  <button 
                    className="btn cancel" 
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
                
                {order.status === 'delivered' && (
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