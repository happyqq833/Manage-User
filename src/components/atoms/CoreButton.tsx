import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { ReactNode } from 'react'

interface CoreButtonProps extends ButtonProps {
    children: ReactNode
}

export default function CoreButton({
    children,
    ...rest
}: CoreButtonProps) {
    return (
        <Button
            variant="contained"
            fullWidth
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                height: 44
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}
