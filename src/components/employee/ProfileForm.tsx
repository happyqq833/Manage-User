import React from "react";
import { Box, Paper, Typography, Avatar, Grid } from "@mui/material";
import { UserInfo } from "../../services/employee/getdetail/type";


export default function ProfileForm({ userDetail }: { userDetail: UserInfo | null }) {


    return (
        <Paper sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
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
                            : userDetail?.role === "employee"
                                ? "Nhân viên"
                                : "Chưa cập nhật"}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );

}