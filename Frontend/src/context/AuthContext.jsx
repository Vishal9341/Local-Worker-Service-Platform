import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user || !user.token) return;

    const pingHeartbeat = async () => {
      try {
        await fetch('http://localhost:5000/api/auth/heartbeat', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (err) {
        console.error('Heartbeat ping failed', err);
      }
    };

    // Ping immediately on login, then every 60 seconds
    pingHeartbeat();
    const interval = setInterval(pingHeartbeat, 60000);
    
    return () => clearInterval(interval);
  }, [user]);

  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    sessionStorage.setItem('user', JSON.stringify(updatedData));
    setUser(updatedData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
