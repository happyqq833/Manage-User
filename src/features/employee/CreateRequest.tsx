import React from "react";
import {
    Autocomplete,
    TextField,
    Button,
    Box,
    Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormCustom } from "../../lib/form";
import { useUser } from "../../context/userProvider";
import { CoreAutocomplete } from "../../components/atoms/CoreAutocomplete";

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

const loaiDonOptions = ["Nghỉ phép", "Đi trễ", "Về sớm"];

const nguoiPheDuyetOptions: User[] = [
    { id: "u001", username: "Trưởng phòng A" },
    { id: "u002", username: "Quản lý B" },
];

export default function CreateRequest() {
    const { user } = useUser(); // Trả về object: { id, name, avatar }

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useFormCustom<FormData>({
        defaultValues: {
            loaiDon: "",
            nguoiPheDuyet: null,
            lyDo: "",
            thoiGianNghi: "",
        },
    });

    const onSubmit = (data: FormData) => {
        const requestData = {
            ...data,
            nguoiTao: {
                id: user?.id,
                username: user?.username,
            },
            thoiGianTao: new Date().toISOString(),
        };


        // TODO: Gửi POST đến API ở đây
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
            <h2>Tạo đơn yêu cầu</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {/* Hiển thị người tạo */}
                    <TextField
                        label="Người tạo đơn"
                        value={user?.username || ""}
                        disabled
                    />

                    <CoreAutocomplete
                        control={control}
                        name="loaiDon"
                        label="Loại đơn"
                        options={loaiDonOptions}
                        requiredMessage="Vui lòng chọn loại đơn"
                        error={errors.loaiDon}
                    />

                    <CoreAutocomplete
                        control={control}
                        name="nguoiPheDuyet"
                        label="Người phê duyệt"
                        options={nguoiPheDuyetOptions}
                        requiredMessage="Vui lòng chọn người phê duyệt"
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option?.username || ""
                        }
                        isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    />

                    {/* Lý do */}
                    <Controller
                        control={control}
                        name="lyDo"
                        rules={{ required: "Vui lòng nhập lý do" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Lý do"
                                multiline
                                rows={3}
                                error={!!errors.lyDo}
                                helperText={errors.lyDo?.message}
                            />
                        )}
                    />

                    {/* Thời gian nghỉ */}
                    <Controller
                        control={control}
                        name="thoiGianNghi"
                        rules={{ required: "Vui lòng nhập thời gian nghỉ" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="date"
                                label="Thời gian nghỉ"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.thoiGianNghi}
                                helperText={errors.thoiGianNghi?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !isValid}
                    >
                        Gửi yêu cầu
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
