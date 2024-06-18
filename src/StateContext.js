// StateContext.js
import React, { createContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

  return (
    <StateContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
