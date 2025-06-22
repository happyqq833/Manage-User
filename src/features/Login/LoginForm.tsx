import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Paper, Typography, Button, CircularProgress, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CoreInput from "../../components/atoms/CoreInput"
import { Request } from "../../services/auth/type"
import { login } from "../../services/auth/authService"
import { getUserInfo } from "../../ultis/auth"
import { useUser } from "../../context/userProvider"
import { toast } from "react-toastify"
import CoreButton from "../../components/atoms/CoreButton"
import { Grid } from "@mui/system"


export default function LoginForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<Request>()

    const navigate = useNavigate()
    const { setUser } = useUser()


    const onSubmit = async (data: Request) => {
        try {
            const result = await login(data)

            const userData = getUserInfo();
            setUser(userData)

            const roleRedirectMap: Record<string, string> = {
                hr: "/hr",
                employee: "/employee"
            }

            const redirectPath = roleRedirectMap[userData.role] || "/"
            navigate(redirectPath, { replace: true })

        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error('Đã xảy ra lỗi khi đăng nhập')
            }
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 8 }}>
            <Typography variant="h5" mb={3} textAlign="center">
                Đăng nhập
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} padding={3}>
                    <Grid size={12}>
                        <CoreInput
                            name="username"
                            label="Tên đăng nhập"
                            control={control}
                            placeholder="Nhập tên đăng nhập"
                            type="text"
                            rules={{ required: "Vui lòng nhập tên đăng nhập" }}
                            error={!!errors.username}
                        />
                    </Grid>
                    <Grid size={12}>
                        <CoreInput
                            name="password"
                            label="Mật khẩu"
                            control={control}
                            placeholder="Nhập mật khẩu"
                            type="password"
                            rules={{ required: "Vui lòng nhập mật khẩu" }}
                            required
                            error={!!errors.password}
                        />
                    </Grid>
                    <Grid size={12}>
                        <CoreButton
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            fullWidth
                        >
                            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                        </CoreButton>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}
