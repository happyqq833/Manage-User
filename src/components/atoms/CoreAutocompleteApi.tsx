// src/components/common/CoreAutocompleteApi.tsx
import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

interface CoreAutocompleteApiProps<T> {
    control: Control<any>;
    name: string;
    label: string;
    fetchOptions: (inputValue?: string) => Promise<T[]>;
    getOptionLabel?: (option: T) => string;
    isOptionEqualToValue?: (option: T, value: T) => boolean;
    disableClearable?: boolean;
    error?: FieldError;
}

export function CoreAutocompleteApi<T>({
    control,
    name,
    label,
    fetchOptions,
    getOptionLabel = (option) => String(option),
    isOptionEqualToValue,
    disableClearable = false,
    error,
}: CoreAutocompleteApiProps<T>) {
    const [options, setOptions] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setLoading(true);
            fetchOptions(inputValue)
                .then((data) => setOptions(data))
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, fetchOptions]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    inputValue={inputValue}
                    onInputChange={(_, value) => setInputValue(value)}
                    onChange={(_, value) => field.onChange(value)}
                    options={options}
                    loading={loading}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    disableClearable={disableClearable}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading && <CircularProgress size={20} />}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            )}
        />
    );
}
