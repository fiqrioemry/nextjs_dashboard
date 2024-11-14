"use client";
import Container from "@/components/Container";
import Header from "@/components/Header";
import LoadingPage from "@/components/LoadingPage";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Suspense } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {loading ? <LoadingPage /> : <>{children}</>}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
