import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem('sovereignUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    setError('');
    
    // For demo purposes, we'll use a simple mock authentication
    // In a real application, this would make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials
        if (email === 'demo@sovereign.com' && password === 'password') {
          const user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@sovereign.com',
            role: 'rep',
            isAdmin: true,
            avatar: null
          };
          
          // Save user to local storage
          localStorage.setItem('sovereignUser', JSON.stringify(user));
          
          // Update state
          setCurrentUser(user);
          resolve(user);
        } else if (email === 'admin@sovereign.com' && password === 'admin') {
          const user = {
            id: '2',
            name: 'Admin User',
            email: 'admin@sovereign.com',
            role: 'admin',
            isAdmin: true,
            avatar: null
          };
          
          // Save user to local storage
          localStorage.setItem('sovereignUser', JSON.stringify(user));
          
          // Update state
          setCurrentUser(user);
          resolve(user);
        } else {
          setError('Invalid email or password');
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('sovereignUser');
    
    // Update state
    setCurrentUser(null);
  };

  // Register function (for future implementation)
  const register = (email, password, name) => {
    setError('');
    
    // This would typically make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, just reject with a message
        setError('Registration is currently disabled. Please contact your administrator.');
        reject(new Error('Registration is currently disabled'));
      }, 1000);
    });
  };

  // Reset password function (for future implementation)
  const resetPassword = (email) => {
    setError('');
    
    // This would typically make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, just resolve with a success message
        resolve('Password reset email sent. Please check your inbox.');
      }, 1000);
    });
  };

  // Update profile function (for future implementation)
  const updateProfile = (userData) => {
    setError('');
    
    // This would typically make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, update the user in local storage
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('sovereignUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        resolve(updatedUser);
      }, 1000);
    });
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="loading-spinner">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
