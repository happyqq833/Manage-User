import React, { ReactNode } from "react";
import { MoonIcon } from "../icons/Moon";
import { Button } from "@mui/material";
import { useColorMode } from "../context/ThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { toggleColorMode, mode } = useColorMode()

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-700">
      <nav className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h1>
        <Button onClick={toggleColorMode} className="text-gray-800 dark:text-white">
          <MoonIcon></MoonIcon>
        </Button>
      </nav>

      <main className="flex-grow p-4">
        {children}
      </main>

      <footer className="p-4 text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800">
        <p>Hehe</p>
      </footer>
    </div>
  );
};

export default MainLayout;