import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import CoreButton from "./CoreButton";
import { width } from "@mui/system";
import { useNavigate } from "react-router-dom";

type CoreDeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
};

export default function CoreDeleteDialog({
    open,
    onClose,
    onConfirm,
    title = "Xác nhận xoá",
    description = "Bạn có chắc muốn xoá mục này? Hành động không thể hoàn tác.",
}: CoreDeleteDialogProps) {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <CoreButton
                    onClick={() => onClose()}
                    sx={{ margin: 2, maxWidth: 120 }}
                    variant="outlined"
                >
                    Hủy
                </CoreButton>
                <CoreButton
                    onClick={() => onConfirm()}
                    sx={{ margin: 2, maxWidth: 120 }}
                    variant="outlined"

                >
                    Xoá
                </CoreButton>
            </DialogActions>
        </Dialog>
    );
}
