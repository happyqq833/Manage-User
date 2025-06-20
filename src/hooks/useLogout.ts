// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";

const useLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser()

    const handleLogout = () => {
        localStorage.removeItem('accesstoken');
        setUser(null);
        navigate('/login', { replace: true });
    };

    return handleLogout;
};

export default useLogout;
