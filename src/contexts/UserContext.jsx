import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userProfile');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userProfile', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userProfile');
    navigate('/onboarding');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);