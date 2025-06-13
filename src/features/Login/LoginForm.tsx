import React from "react"
import { useForm } from "react-hook-form"
import { Paper, Typography, Button, CircularProgress, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CoreInput from "../../components/CoreInput"
import { Request } from "../../services/auth/type"
import { login } from "../../services/auth/authService"


export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Request>()

  const navigate = useNavigate()

  const onSubmit = async (data: Request) => {
    try {
      const result = await login(data)

      localStorage.setItem("token", result.data.token)
      localStorage.setItem("role", result.data.role)
      localStorage.setItem("user", JSON.stringify(result.data.avatar))

      navigate(result.data.role === "hr" ? "/hr" : "/employee")
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
