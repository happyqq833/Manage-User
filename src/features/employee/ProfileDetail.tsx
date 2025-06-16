import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Paper,
    CircularProgress,
    Typography,
    Grid,
} from "@mui/material";

import { getDetailUser } from "../../services/employee/getdetail";
import { Response, UserInfo } from "../../services/employee/getdetail/type";
import { useSimpleApi } from "../../hooks/useGetApi";
import { useUser } from "../../context/userProvider";
import { useProfileDetail } from "../../components/hooks/employee/useProfileDetail";

export default function ProfileDetail() {

    const { userDetail, isLoading } = useProfileDetail()
    return (
        <Paper sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>

            {isLoading && (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            )}
            <Box display="flex" alignItems="center" mb={4}>
                <Avatar
                    src={userDetail?.avatar ?? "https://via.placeholder.com/80"}
                    sx={{ width: 80, height: 80, mr: 3 }}
                    alt={userDetail?.fullName ?? "Avatar"}
                />
                <Box>
                    <Typography variant="h5">{userDetail?.fullName}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {userDetail?.position} - {userDetail?.department}
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={2}>
                <Grid >
                    <Typography variant="subtitle2">Tài khoản</Typography>
                    <Typography>{userDetail?.username || "Chưa cập nhật"}</Typography>
                </Grid>

                <Grid >
                    <Typography variant="subtitle2">Ngày sinh</Typography>
                    <Typography>{userDetail?.dob || "Chưa cập nhật"}</Typography>
                </Grid>

                <Grid >
                    <Typography variant="subtitle2">Số điện thoại</Typography>
                    <Typography>{userDetail?.phone || "Chưa cập nhật"}</Typography>
                </Grid>

                <Grid >
                    <Typography variant="subtitle2">Địa chỉ</Typography>
                    <Typography>{userDetail?.address || "Chưa cập nhật"}</Typography>
                </Grid>

                <Grid >
                    <Typography variant="subtitle2">Vai trò</Typography>
                    <Typography>
                        {userDetail?.role === "hr"
                            ? "HR"
                            : "Chưa cập nhật"}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
