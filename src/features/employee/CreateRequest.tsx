import React from "react";
import {
    Autocomplete,
    TextField,
    Button,
    Box,
    Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { CoreAutocomplete } from "../../components/atoms/CoreAutocomplete";
import CoreInput from "../../components/atoms/CoreInput";
import CoreButton from "../../components/atoms/CoreButton";
import { useCreateRequest } from "../../components/hooks/employee/useCreateRequest";
import { RequestFormType } from "../../enums";

interface User {
    id: string;
    username: string;
    avatar?: string;
}

interface FormData {
    loaiDon: string;
    nguoiPheDuyet: User | null;
    lyDo: string;
    thoiGianNghi: string;
}



export default function CreateRequest() {
    const { onSubmit, control, handleSubmit, errors, isSubmitting, isValid, user } = useCreateRequest();
    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
            <h2>Tạo đơn yêu cầu</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        label="Người tạo đơn"
                        value={user?.username || ""}
                        disabled
                    />

                    <CoreAutocomplete
                        control={control}
                        name="name"
                        label="Loại đơn"
                        options={RequestFormType}
                        requiredMessage="Vui lòng chọn loại đơn"
                    />

                    <CoreInput
                        control={control}
                        name="reason"
                        label="Lý do"
                        multiline
                        rows={3}
                        required
                    />

                    <Controller
                        control={control}
                        name="createdAt"
                        rules={{ required: "Vui lòng nhập thời gian nghỉ" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="date"
                                label="Thời gian nghỉ"
                                InputLabelProps={{ shrink: true }}
                                helperText={errors.createdAt?.message}
                            />
                        )}
                    />


                    <CoreButton
                        type="submit"
                        disabled={isSubmitting || !isValid}
                    >
                        Gửi
                    </CoreButton>

                </Stack>
            </form>
        </Box>
    );
}
