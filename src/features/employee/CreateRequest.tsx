import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { CoreAutocomplete } from "../../components/atoms/CoreAutocomplete";
import CoreInput from "../../components/atoms/CoreInput";
import CoreButton from "../../components/atoms/CoreButton";
import { useCreateRequest } from "../../components/hooks/employee/useCreateRequest";
import { RequestForm, RequestFormType } from "../../enums";
import { Grid } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function CreateRequest() {
    const { onSubmit, control, handleSubmit, errors, isSubmitting, isValid, user } = useCreateRequest();
    const navigate = useNavigate()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} padding={4}>
                <Grid size={4}>
                    <CoreInput
                        control={control}
                        name='createdBy.username'
                        label="Người tạo đơn"
                        value={user?.username || ""}
                        disabled
                        variant="standard"
                    />
                </Grid>

                <Grid size={4}>
                    <CoreAutocomplete
                        control={control}
                        name="name"
                        label="Loại đơn"
                        options={RequestForm}
                    />

                </Grid>
                <Grid size={4}>
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
                                variant="standard"
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <CoreInput
                        control={control}
                        name="reason"
                        label="Lý do"
                        multiline
                        rows={2}
                        required
                        variant="standard"

                    />
                </Grid>

            </Grid>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <CoreButton
                    sx={{ margin: 2, maxWidth: 100 }}
                    variant="outlined"
                    onClick={() => navigate('/employee')}>
                    Back
                </CoreButton>
                <CoreButton
                    sx={{ margin: 2, maxWidth: 100 }}
                    variant="outlined"
                    type="submit"
                    disabled={isSubmitting || !isValid}>
                    Gửi
                </CoreButton>
            </div>
        </form>

    );
}
