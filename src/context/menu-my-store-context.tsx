"use client";

import { createContext, useContext, useState } from "react";

export interface MenuMyStoreContextValue {
  menus: string[];
  menuActive: string;
  onChangeMenu: (menu: string) => void;
}

const MenuMyStoreContext = createContext<MenuMyStoreContextValue>(
  {} as MenuMyStoreContextValue
);

export const MenuMyStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const menus = ["Store Information", "Location"];
  const [menuActive, setMenuActive] = useState(menus[0]);

  const onChangeMenu = (menu: string) => {
    setMenuActive(menu);
  };

  return (
    <MenuMyStoreContext.Provider value={{ menus, menuActive, onChangeMenu }}>
      {children}
    </MenuMyStoreContext.Provider>
  );
};

export const useMenuMyStoreContext = () => {
  const context = useContext(MenuMyStoreContext);

  if (!context) {
    throw new Error("MenuMyStoreContext not found");
  }

  return context;
};
