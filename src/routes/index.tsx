import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import HrPage from "../pages/hr/HrPage";
import EmployeePage from "../pages/employee/EmployeePage";
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";
import HrLayout from "../layouts/HrLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import ListRequestPage from "../pages/employee/ListRequestPage";
import CreateRequestPage from "../pages/employee/CreateRequestPage";
import ProfilePage from "../pages/employee/ProfilePage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route element={<RoleBasedRoute allowedRoles={["hr"]} />}>
                    <Route element={<HrLayout />}>
                        <Route path="/hr" element={<HrPage />} />
                    </Route>
                </Route>

                <Route element={<RoleBasedRoute allowedRoles={["employee"]} />}>
                    <Route element={<EmployeeLayout />}>
                        <Route path="/employee" element={<EmployeePage />} />
                        <Route path="/employee/request" element={<CreateRequestPage />} />
                        <Route path="/employee/requests" element={<ListRequestPage />} />
                        <Route path="/employee/profile" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
