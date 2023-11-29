import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  

  const updateUser = (userData) => {
    console.log(userData)
    setUserId(userData.userId);
    setUser(userData.username)
  };

  const clearUserId = () => {
    setUserId('');
    setUser('');
  };
  
  //set up global data
  return (
    <UserContext.Provider value={{ userId,user, updateUser,clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
