"use client";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {pathname !== "/dashboard" && <Header />}
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
