import React from "react"
import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  TextFieldProps
} from "@mui/material"
import { Controller, Control, FieldValues, Path } from "react-hook-form"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"

type CoreInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  control: Control<T>
  className?: string
  descriptionText?: string
  tooltip?: string
  startIcon?: React.ReactNode
} & TextFieldProps

export default function CoreInput<T extends FieldValues>({
  name,
  label,
  control,
  className,
  descriptionText,
  tooltip,
  startIcon,
  type,
  ...rest
}: CoreInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="flex items-center justify-between">
            {label && (
              <label className="font-medium text-gray-700">
                {label}
                {tooltip && (
                  <Tooltip title={tooltip}>
                    <span className="ml-1 text-blue-500 cursor-help">ⓘ</span>
                  </Tooltip>
                )}
              </label>
            )}
          </div>

          <TextField
            {...field}
            value={field.value ?? ""}
            fullWidth
            className={className}
            error={!!error}
            helperText={error?.message || descriptionText}
            type={isPassword && !showPassword ? "password" : "text"}
            InputProps={{
              startAdornment: startIcon ? (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ) : undefined,
              endAdornment: isPassword && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...rest}
          />
        </>
      )}
    />
  )
}
