// src/components/common/CoreAutocomplete.tsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

interface CoreAutocompleteProps<T> {
    control: Control<any>;
    name: string;
    label: string;
    options: T[];
    requiredMessage?: string;
    getOptionLabel?: (option: T) => string;
    isOptionEqualToValue?: (option: T, value: T) => boolean;
    disableClearable?: boolean;
    error?: FieldError;
}

export function CoreAutocomplete<T>({
    control,
    name,
    label,
    options,
    requiredMessage,
    getOptionLabel = (option) => String(option),
    isOptionEqualToValue,
    disableClearable = false,
    error,
}: CoreAutocompleteProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={
                requiredMessage
                    ? { required: requiredMessage }
                    : undefined
            }
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    disableClearable={disableClearable}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            )}
        />
    );
}
