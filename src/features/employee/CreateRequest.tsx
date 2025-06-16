import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import CoreInput from "../../components/atoms/CoreInput";
import { Form, useForm } from "react-hook-form";
export default function CreateRequest() {

    const options = [
        { label: '', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
    ];

    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <h1>Create Request</h1>
            <Form>
                <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
                <CoreInput
                    control={control}
                    label="Request Title"
                    name="requestTitle"
                    placeholder="Enter request title"
                    fullWidth
                    required
                    variant="outlined"
                />
            </Form>


        </div>
    );
}