import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "../components/ui/UserList";
import UserDetail from "../components/ui/UserDetail";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
    );
};

export default AppRoutes;
