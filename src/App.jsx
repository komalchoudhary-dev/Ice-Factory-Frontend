//import './App.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { UserContext, UserProvider } from './UserContext.jsx';
//import Navbar from './Components/Navbar/Navbar.jsx';
//import Footer from './Components/Footer/Footer.jsx';

const Order = lazy(() => import('./Pages/Public/Orders/Order.jsx'));
const OrderDetails = lazy(() => import('./Pages/Public/OrderDetails/OrderDetails.jsx'));
const OrderHistory = lazy(() => import('./Pages/Public/History/OrderHistory.jsx'));
const HomePage = lazy(() => import('./Pages/Public/HomePage/HomePage.jsx'));
const AdminDashboard = lazy(() => import('./Pages/Admin/pages/Dashboard.jsx'));
const AdminOrederRequests = lazy(() => import('./Pages/Admin/pages/OrderRequest.jsx'));
const AdminOrederToBeDelivered = lazy(() => import('./Pages/Admin/pages/OrdersToBeDelivered.jsx'));
const AdminSalesReport = lazy(() => import('./Pages/Admin/pages/SalesReport.jsx'));
const LoginSignup = lazy(() => import('./Pages/Public/Login/LoginSignup.jsx'));
const Detail=lazy(() => import('./Pages/Admin/pages/detail.jsx'));
const SignUp = lazy(() => import('./Pages/Public/Registration/Registration.jsx'));
const Customer=lazy(() => import('./Pages/Admin/pages/Customer.jsx'));
const Profile=lazy(() => import('./Pages/Public/UserProfile/UserProfile.jsx'));
const CustDetail=lazy(() => import('./Pages/Admin/pages/custDetail.jsx'));
const PastorderHistory=lazy(() => import('./Pages/Admin/pages/orderHistory.jsx'));
const ChangePassword=lazy(() => import('./Pages/Admin/pages/changePassword.jsx'));
// Add missing components
const LoadingBar = () => (
  <div className="loading-bar">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingBar />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/orders" element={
            <PageTransition>
              <Order />
            </PageTransition>
          } />
          <Route path="/order-details" element={
            <PageTransition>
              <OrderDetails />
            </PageTransition>
          } />
          <Route path="/order-history" element={
            <PageTransition>
              <OrderHistory />
            </PageTransition>
          } />
          {/* Add other routes as needed */}
          <Route path="/admin-dashboard" element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          } />
          <Route path="/admin-changePassword" element={
            <PageTransition>
              <ChangePassword />
            </PageTransition>
          } />
          <Route path="/admin-order-request" element={
            <PageTransition>
            <AdminOrederRequests/>
            </PageTransition>
          } />
          <Route path="/admin-customer" element={
            <PageTransition>
            <Customer/>
            </PageTransition>
          } />
          <Route path="/admin-customer-detail" element={
            <PageTransition>
            <CustDetail/>
            </PageTransition>
          } />
          <Route path="/admin-Past-Order-history" element={
            <PageTransition>
            <PastorderHistory/>
            </PageTransition>
          } />
          <Route path="/admin-order-request-detail" element={
            <PageTransition>
            <Detail/>
            </PageTransition>
          } />
          <Route path="/admin-tobe-delivered" element={
            <PageTransition>
              <AdminOrederToBeDelivered />
            </PageTransition>
          } />
          <Route path="/sales-report" element={
            <PageTransition>
              <AdminSalesReport />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <LoginSignup />
            </PageTransition>
          } />
          <Route path="/signup" element={
            <PageTransition>
              <SignUp />
            </PageTransition>
          } />
          <Route path="/profile" element={
            <PageTransition>
              <Profile />
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>

        <main className="app-content">
          <AppRoutes />
        </main>
        
      </Router>
    </UserProvider>
  );
}

export default App;
