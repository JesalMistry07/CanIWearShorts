"use client"

import { createContext, useContext, useState } from "react";

export type NavbarContextType = {
    isOpen: boolean; 
    setIsOpen: (value: boolean) => void; 
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </NavbarContext.Provider>
    );
  };
  
  // 4. Custom hook for consuming context
  export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
      throw new Error("useNavbar must be used within a NavbarProvider");
    }
    return context;
  };