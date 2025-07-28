import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string, rememberMe: boolean): boolean => {
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