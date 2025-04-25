import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

const AuthStatus = () => {
  const { userPhone, userDetails, userAddress, formattedAddress, logout, loading } = useContext(UserContext);
  
  if (loading) {
    return <div className="user-status loading">Loading user info...</div>;
  }
  
  return userPhone ? (
    <div className="user-status">
      {userDetails ? (
        <>
          <span className="user-greeting">
            Hello, {userDetails.firstName ? `${userDetails.firstName} ${userDetails.lastName}` : userPhone}
          </span>
          {formattedAddress && (
            <span className="user-address">{formattedAddress}</span>
          )}
          <button onClick={logout} className="logout-btn">Logout</button>
        </>
      ) : (
        <>
          <span>Logged in as: {userPhone}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  ) : (
    <Link to="/login" className="login-link">Login</Link>
  );
};

export default AuthStatus;