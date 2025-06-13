import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;

