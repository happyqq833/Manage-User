import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useUser } from "../../context/userProvider";

interface CommonAppBarProps {
    title: string;
}

export default function CommonAppBar({ title }: CommonAppBarProps) {
    const { user } = useUser();
    return (
        <AppBar position="fixed" sx={{ bgcolor: "primary.main", zIndex: 10000 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>

                {user && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body1">
                            {user.username} ({user.role})
                        </Typography>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
