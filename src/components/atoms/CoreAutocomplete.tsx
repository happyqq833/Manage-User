import React, { useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";
import { find, get } from "lodash";
import { useSearchParams } from "react-router-dom";

interface OptionType {
    name: string;
    value: any;
}

interface CoreAutocompleteProps<T extends OptionType> {
    control: Control<any>;
    name: string;
    label: string;
    options: T[];
    requiredMessage?: string;
    disableClearable?: boolean;
    error?: FieldError;
}

export function CoreAutocomplete<T extends OptionType>({
    control,
    name,
    label,
    options,
    disableClearable = false,
    error,
}: CoreAutocompleteProps<T>) {

    const [searchParams] = useSearchParams();
    const actionType = searchParams.get("actionType");
    const isView = actionType === "view";

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const selectedOption = options.find((opt) => opt.value === field.value) || null;

                return (
                    <Autocomplete
                        options={options}
                        disableClearable={disableClearable}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.value === value}
                        value={selectedOption}
                        onChange={(_, newValue) => {
                            field.onChange(newValue?.value ?? null);
                        }}
                        disabled={isView}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={error?.message}
                                variant="standard"

                            />
                        )}
                    />
                );
            }}
        />
    );
}
