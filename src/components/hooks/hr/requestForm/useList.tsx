import React from 'react';
import { useState } from "react";
import { useFormCustom } from "../../../../lib/form";
import { Request } from "../../../../services/employee/listRequest/type";
import { useGetApi } from "../../../../hooks/useGetApi";
import { getListRequestForm } from "../../../../services/employee/listRequest";
import { Chip } from "@mui/material";

const defaultValues: Request = {
    page: 1,
    size: 5,
    name: '',
    status: '',
};

export function useListRequestForm() {
    const { control, handleSubmit, reset } = useFormCustom<Request>({ defaultValues });

    const [query, setQuery] = useState<Request>(defaultValues);

    const renderStatus = (val: string) => {
        if (val === 'approved') {
            return <Chip sx={{ minWidth: 80 }} size='small' label="Đã duyệt" color="success" />
        }
        if (val === 'pending') {
            return <Chip sx={{ minWidth: 80 }} size='small' label="Chờ duyệt" color="warning" />
        }
        return <Chip sx={{ minWidth: 80 }} size='small' label="Từ chối" color="error" />

    }

    const onPageChange = (_: unknown, newPage: number) => {
        setQuery((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };
    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery((prev) => ({
            ...prev,
            size: parseInt(event.target.value),
            page: 1,
        }));
    };


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
    const total = tableData?.data?.totalElements ?? 0;

    return [{ columns, tableData, isLoading, control, query, total }, { handleSubmit, onReset, onSubmit, onPageChange, onRowsPerPageChange }] as const;
}