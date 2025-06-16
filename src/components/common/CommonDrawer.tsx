import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface CommonDrawerProps {
    items: { text: string; path: string }[];
}

export default function CommonDrawer({ items }: CommonDrawerProps) {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: 'border-box',
                    paddingTop: '64px',

                },
            }}
        >
            <List>
                {items.map((item) => (
                    <ListItemButton key={item.path} component={Link} to={item.path}>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
