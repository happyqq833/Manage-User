import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userProvider";

const LogoutPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/login", { replace: true });
    }, []);

    return null;
};

export default LogoutPage;
