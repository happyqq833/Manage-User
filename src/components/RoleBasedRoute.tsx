import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userProvider";

type Props = {
    allowedRoles: string[];
};

export default function RoleBasedRoute({ allowedRoles }: Props) {
    const { user } = useUser();
    const role = user?.role || "";
    console.log("user", user);

    return role && allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}