import React from 'react';
import { useState } from "react";
import { useGetApi } from "../../../hooks/useGetApi";
import { useFormCustom } from "../../../lib/form";
import { getListRequestForm } from "../../../services/employee/listRequest";
import { Request, Response } from "../../../services/employee/listRequest/type";
import { render } from "@testing-library/react";
import { Chip } from "@mui/material";

const defaultValues: Request = {
    name: '',
    status: '',
};

export function useListRequest() {
    const { control, handleSubmit, reset } = useFormCustom<Request>({ defaultValues });

    const [query, setQuery] = useState<Request>(defaultValues);

    const renderStatus = (val: string) => {
        if (val === 'approved') {
            return <Chip sx={{ minWidth: 70 }} size='small' label="Đã duyệt" color="success" />
        }
        if (val === 'pending') {
            return <Chip sx={{ minWidth: 70 }} size='small' label="Chờ duyệt" color="warning" />
        }
        return <Chip sx={{ minWidth: 70 }} size='small' label="Từ chối" color="error" />

    }


    const onReset = () => {
        reset();
        setQuery({ ...defaultValues });
    };

    const onSubmit = (data: Request) => {
        const submitData = {
            ...data,
            status: data.status ?? true,
            name: data.name ?? "gggg",
        };
        setQuery({ ...submitData });
    }
    const columns = [
        {
            title: 'Tên đơn',
            fieldName: 'name',
        },
        {
            title: 'Lý do',
            fieldName: 'reason',
        },
        {
            title: 'Trạng thái',
            fieldName: 'status',
            render: (val: string) => renderStatus(val)
        },

        {
            title: 'Ngày tạo',
            fieldName: 'createdAt',
        }
    ];


    const { data: tableData, isLoading } = useGetApi<any>(() => getListRequestForm(query), [query]);

    return [{ columns, tableData, isLoading, control }, { handleSubmit, onReset, onSubmit }] as const;
}