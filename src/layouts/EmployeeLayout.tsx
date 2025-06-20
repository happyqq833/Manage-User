import React from "react";
import { Box } from "@mui/material";
import CommonDrawer from "../components/common/CommonDrawer";
import CommonAppBar from "../components/common/CommonAppbar";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
    const drawerItems = [
        { text: "Trang chủ", path: "/employee" },
        { text: "Tạo đơn", path: "/employee/request" },
        { text: "Xem đơn", path: "/employee/requests" },
        { text: "Profile", path: "/employee/profile?actionType=view" },
        { text: "Đăng xuất", path: "/logout" }
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CommonAppBar title="Trang dành cho Nhân viên" />
            <CommonDrawer items={drawerItems} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: 3,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
