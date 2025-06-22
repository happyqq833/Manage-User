import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userProvider";

type Props = {
    children: React.ReactNode;
};

const GuestRoute = ({ children }: Props) => {
    const { user } = useUser()
    if (user) {
        const role = user?.role
        return <Navigate to={`/${role}`} replace />;
    }

    return <>{children}</>;
};

export default GuestRoute;
