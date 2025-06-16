import React from "react";
import { Box } from "@mui/material";
import CommonDrawer from "../components/common/CommonDrawer";
import CommonAppBar from "../components/common/CommonAppbar";
import { Outlet } from "react-router-dom";

export default function HrLayout() {
    const drawerItems = [
        { text: "Trang chủ", path: "/hr" },
        { text: "Quản lý nhân viên", path: "/hr/employees" },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CommonAppBar title="Trang dành cho HR" />
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