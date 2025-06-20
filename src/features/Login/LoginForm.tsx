import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Paper, Typography, Button, CircularProgress, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CoreInput from "../../components/atoms/CoreInput"
import { Request } from "../../services/auth/type"
import { login } from "../../services/auth/authService"
import { getUserInfo } from "../../ultis/auth"
import { useUser } from "../../context/userProvider"


export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Request>()

  const navigate = useNavigate()
  const { setUser } = useUser()

  useEffect(() => {
    const { user } = useUser()
    const role = user?.role
    if (user) {
      navigate(`/${role}`);
    }
  }, []);

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
        alert(err.message)
      } else {
        alert("Đã xảy ra lỗi khi đăng nhập")
      }
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Đăng nhập
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CoreInput
          name="username"
          label="Tài khoản"
          control={control}
          placeholder="Nhập tài khoản"
          type="text"
          error={!!errors.username}
        />

        <CoreInput
          name="password"
          label="Mật khẩu"
          control={control}
          placeholder="Nhập mật khẩu"
          type="password"
          error={!!errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </Box>
    </Paper>
  )
}
