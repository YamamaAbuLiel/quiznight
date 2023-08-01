import React, { createContext, useState, useContext } from 'react';

const BackgroundContext = createContext();

export function useBackgroundContext() {
  return useContext(BackgroundContext);
}

export function BackgroundProvider({ children }) {
  const [selectedBackground, setSelectedBackground] = useState(null);

  return (
    <BackgroundContext.Provider value={{ selectedBackground, setSelectedBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}