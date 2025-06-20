import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import img404 from "../../assets/404.png";
import { useUser } from "../../context/userProvider";

const Page404 = () => {
    const { user } = useUser()
    const role = user?.role
    return (
        <div className="relative h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col gap-10 items-center justify-center">
                <img src={img404} alt="404" style={{ width: 300, height: 300 }} />

                <Typography variant="h5">Ooops... 404!</Typography>
                <Typography variant="subtitle1">
                    Trang bạn yêu cầu không thể được tìm thấy.
                </Typography>

                <Link to={`/${role}`} className="text-[#0078D4] underline">
                    Quay lại trang chủ
                </Link>
            </div>
        </div>
    );
};

export default Page404;
