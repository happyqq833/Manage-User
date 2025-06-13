import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const token = localStorage.getItem("assessToken");

    return token ? <Outlet /> : <Navigate to="/login" replace />
}
