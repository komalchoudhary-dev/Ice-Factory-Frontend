// UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('authToken');

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userPhone) {
        setUserDetails(null);
        setUserAddress(null);
        setUserEmail(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const detailsResponse = await fetch(
          `http://localhost:8080/api/public/users/details/${encodeURIComponent(userPhone)}`,
          { headers }
        );

        if (!detailsResponse.ok) {
          throw new Error(`Failed to fetch user details: ${detailsResponse.status}`);
        }

        const detailsData = await detailsResponse.json();
        setUserDetails(detailsData);

        if (detailsData.email) {
          setUserEmail(detailsData.email);
          localStorage.setItem('userEmail', detailsData.email);
        }

        localStorage.setItem('userDetails', JSON.stringify(detailsData));

        const addressResponse = await fetch(
          `http://localhost:8080/api/public/users/phone/${encodeURIComponent(userPhone)}/address`,
          { headers }
        );

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

  useEffect(() => {
    const storedDetails = localStorage.getItem('userDetails');
    const storedAddress = localStorage.getItem('userAddress');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails);
        setUserDetails(parsedDetails);

        if (!storedEmail && parsedDetails.email) {
          setUserEmail(parsedDetails.email);
          localStorage.setItem('userEmail', parsedDetails.email);
        }
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

  const login = async (phone, token = null) => {
    localStorage.setItem('userPhone', phone);
    setUserPhone(phone);

    if (token) {
      setAuthToken(token);
    }
  };

  const logout = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('authToken');
    setUserPhone(null);
    setUserEmail(null);
    setUserDetails(null);
    setUserAddress(null);
  };

  const refreshUserData = async () => {
    if (!userPhone) return;

    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const detailsResponse = await fetch(
        `http://localhost:8080/api/public/users/details/${encodeURIComponent(userPhone)}`,
        { headers }
      );

      if (!detailsResponse.ok) {
        throw new Error(`Failed to fetch user details: ${detailsResponse.status}`);
      }

      const detailsData = await detailsResponse.json();
      setUserDetails(detailsData);

      if (detailsData.email) {
        setUserEmail(detailsData.email);
        localStorage.setItem('userEmail', detailsData.email);
      }

      localStorage.setItem('userDetails', JSON.stringify(detailsData));

      const addressResponse = await fetch(
        `http://localhost:8080/api/public/users/phone/${encodeURIComponent(userPhone)}/address`,
        { headers }
      );

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

  const getFormattedAddress = () => {
    if (!userAddress || !Array.isArray(userAddress) || userAddress.length === 0) {
      return '';
    }

    const address = userAddress[0];
    return `${address.street}, ${address.city} - ${address.pincode}`;
  };

  return (
    <UserContext.Provider value={{
      userPhone,
      userEmail,
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