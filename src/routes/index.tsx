import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import HrPage from "../pages/hr/HrPage";
import EmployeePage from "../pages/employee/EmployeePage";
import PrivateRoute from "../components/route/PrivateRoute";
import HrLayout from "../layouts/HrLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import ListRequestPage from "../pages/employee/ListRequestPage";
import CreateRequestPage from "../pages/employee/CreateRequestPage";
import ProfilePage from "../pages/employee/ProfilePage";
import ListEmpPage from "../pages/hr/manageEmp/list";
import { DetailEmpPage } from "../pages/hr/manageEmp/[id]";
import { AddNewEmpPage } from "../pages/hr/manageEmp/addNew";
import { ListFormPage } from "../pages/hr/requestForm/list";
import { SaveFormPage } from "../pages/hr/requestForm/save";
import Page404 from "../components/common/Page404";
import RoleBasedRoute from "../components/route/RoleBasedRoute";
import GuestRoute from "../components/route/GuestRoute";
import LogoutPage from "../pages/auth/LogoutPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                }
            />
            <Route path="/logout" element={<LogoutPage />} />
            <Route element={<PrivateRoute />}>
                <Route element={<RoleBasedRoute allowedRoles={["hr"]} />}>
                    <Route element={<HrLayout />}>
                        <Route path="/hr" element={<HrPage />} />
                        <Route path="/hr/emp/list" element={<ListEmpPage />} />
                        <Route path="/hr/emp/:id" element={<DetailEmpPage />} />
                        <Route path="/hr/emp/add-new" element={<AddNewEmpPage />} />
                        <Route path="hr/form/list" element={<ListFormPage />} />
                        <Route path="/hr/form/:id" element={<SaveFormPage />} />
                        <Route path="/hr/profile" element={<ProfilePage />} />

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
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;
