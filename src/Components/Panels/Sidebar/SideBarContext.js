import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

    return (
        <SidebarContext.Provider value={{ openMenu, toggleMenu }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
