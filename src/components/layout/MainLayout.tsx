import React, { ReactNode } from "react";
import { MoonIcon } from "../../icons/Moon";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  function toggleDarkMode() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-700">
      <nav className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">User Management</h1>
        <button
          className="flex p-2 text-black rounded hover:text-yellow-400 dark:text-white focus:outline-none hover:bg-gray-500 dark:hover:bg-gray-500 dark:hover:text-yellow-400"
          onClick={toggleDarkMode}
        >
          <MoonIcon></MoonIcon>
        </button>
      </nav>
      
      <main className="flex-grow p-4">
        {children}
      </main>
      
      <footer className="p-4 text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800">
        <p>© 2023 User Management System</p>
      </footer>
    </div>
  );
};

export default MainLayout;