import React from "react"
import { Navigate, Outlet } from "react-router-dom"


type Props = {
    allowedRoles: string[]
}

export default function RoleBasedRoute({ allowedRoles }: Props) {
    const role = localStorage.getItem("role")
    return role && allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" replace />
}