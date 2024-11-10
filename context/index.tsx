"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface GlobalContext {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a type
const GlobalContext = createContext<GlobalContext | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}


const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};