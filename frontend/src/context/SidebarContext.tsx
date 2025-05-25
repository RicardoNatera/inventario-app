"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  abierto: false,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const toggle = () => setAbierto((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ abierto, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
