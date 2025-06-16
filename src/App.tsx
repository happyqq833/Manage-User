import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/userProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeContextProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </ThemeContextProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
