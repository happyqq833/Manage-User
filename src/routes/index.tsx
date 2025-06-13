import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import HrPage from "../pages/hr/HrPage";
import EmployeePage from "../pages/employee/EmployeePage";
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route element={<RoleBasedRoute allowedRoles={["hr"]} />}>
                    <Route path="/hr" element={<HrPage />} />
                </Route>

                <Route element={<RoleBasedRoute allowedRoles={["employee"]} />}>
                    <Route path="/employee" element={<EmployeePage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
