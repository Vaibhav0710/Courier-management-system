import React, { createContext, useState, useContext, useEffect } from "react";

const RoleContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("userType") || null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    setRole(storedRole);
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
