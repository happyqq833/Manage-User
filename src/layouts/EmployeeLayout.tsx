import React from "react";
import { Box, Toolbar } from "@mui/material";
import CommonDrawer from "../components/common/CommonDrawer";
import CommonAppBar from "../components/common/CommonAppbar";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
    const drawerItems = [
        { text: "Trang chủ", path: "/employee" },
        { text: "Tạo đơn", path: "/employee/request" },
        { text: "Xem đơn", path: "/employee/requests" },
        { text: "Thông tin cá nhân", path: "/employee/profile" },
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
                    ml: '240px',
                    mt: '64px'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
