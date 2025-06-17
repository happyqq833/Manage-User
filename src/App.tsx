import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/userProvider";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeContextProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
          <ToastContainer position="bottom-left" autoClose={3000} />
        </ThemeContextProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
