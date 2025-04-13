// UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || null);
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch user details whenever userPhone changes
  useEffect(() => {
    const fetchUserData = async () => {
      // Skip if no user is logged in
      if (!userPhone) {
        setUserDetails(null);
        setUserAddress(null);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch user details
        const detailsResponse = await fetch(`http://localhost:8080/api/public/users/details/${encodeURIComponent(userPhone)}`);
        
        if (!detailsResponse.ok) {
          throw new Error(`Failed to fetch user details: ${detailsResponse.status}`);
        }
        
        const detailsData = await detailsResponse.json();
        setUserDetails(detailsData);
        
        // Store user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify(detailsData));
        
        // Fetch user address
        const addressResponse = await fetch(`http://localhost:8080/api/public/users/phone/${encodeURIComponent(userPhone)}/address`);
        
        if (addressResponse.ok) {
          const addressData = await addressResponse.json();
          
          if (Array.isArray(addressData) && addressData.length > 0) {
            setUserAddress(addressData);
            localStorage.setItem('userAddress', JSON.stringify(addressData));
          } else {
            setUserAddress(null);
            localStorage.removeItem('userAddress');
          }
        } else {
          console.warn(`Failed to fetch user address: ${addressResponse.status}`);
          setUserAddress(null);
          localStorage.removeItem('userAddress');
        }
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userPhone]);
  
  // On initial load, try to restore user data from localStorage
  useEffect(() => {
    const storedDetails = localStorage.getItem('userDetails');
    const storedAddress = localStorage.getItem('userAddress');
    
    if (storedDetails) {
      try {
        setUserDetails(JSON.parse(storedDetails));
      } catch (err) {
        console.error('Error parsing stored user details', err);
        localStorage.removeItem('userDetails');
      }
    }
    
    if (storedAddress) {
      try {
        setUserAddress(JSON.parse(storedAddress));
      } catch (err) {
        console.error('Error parsing stored user address', err);
        localStorage.removeItem('userAddress');
      }
    }
  }, []);
  
  const login = async (phone) => {
    localStorage.setItem('userPhone', phone);
    setUserPhone(phone);
    // User details and address will be fetched by the useEffect hook
  };
  
  const logout = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userAddress');
    setUserPhone(null);
    setUserDetails(null);
    setUserAddress(null);
  };
  
  // Force refresh user data (useful after profile updates)
  const refreshUserData = async () => {
    if (!userPhone) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user details
      const detailsResponse = await fetch(`http://localhost:8080/users/details/${encodeURIComponent(userPhone)}`);
      
      if (!detailsResponse.ok) {
        throw new Error(`Failed to fetch user details: ${detailsResponse.status}`);
      }
      
      const detailsData = await detailsResponse.json();
      setUserDetails(detailsData);
      localStorage.setItem('userDetails', JSON.stringify(detailsData));
      
      // Fetch user address
      const addressResponse = await fetch(`http://localhost:8080/api/public/users/phone/${encodeURIComponent(userPhone)}/address`);
      
      if (addressResponse.ok) {
        const addressData = await addressResponse.json();
        
        if (Array.isArray(addressData) && addressData.length > 0) {
          setUserAddress(addressData);
          localStorage.setItem('userAddress', JSON.stringify(addressData));
        } else {
          setUserAddress(null);
          localStorage.removeItem('userAddress');
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Error refreshing user data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Format address into a string
  const getFormattedAddress = () => {
    if (!userAddress || !Array.isArray(userAddress) || userAddress.length === 0) {
      return '';
    }
    
    const address = userAddress[0]; // Get first address
    return `${address.street}, ${address.city} - ${address.pincode}`;
  };
  
  return (
    <UserContext.Provider value={{ 
      userPhone,
      userDetails,
      userAddress,
      formattedAddress: getFormattedAddress(),
      login,
      logout,
      refreshUserData,
      loading,
      error 
    }}>
      {children}
    </UserContext.Provider>
  );
};