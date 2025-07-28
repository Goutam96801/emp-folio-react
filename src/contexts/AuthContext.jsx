import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password, rememberMe) => {
    // Mock authentication - in real app, this would call an API
    if (username === 'admin' && password === 'password') {
      const userData = { username, name: 'Administrator' };
      setUser(userData);
      
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(userData));
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedUsername');
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rememberedUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};