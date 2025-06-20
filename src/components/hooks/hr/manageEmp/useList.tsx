import { useState } from "react";
import { useFormCustom } from "../../../../lib/form";
import { useGetApi } from "../../../../hooks/useGetApi";
import { Request } from "../../../../services/hr/employee/getList/type";
import { getListEmp } from "../../../../services/hr/employee/getList";


const defaultValues: Request = {
    search: "",
    page: 1,
    size: 5,
    department: "",
    fullName: ""
}

export function useListEmp() {
    const { control, handleSubmit, reset } = useFormCustom<Request>({ defaultValues });

    const [query, setQuery] = useState<Request>(defaultValues);

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
            search: data.search?.trim(),
            department: data.department?.trim(),
            fullName: data.fullName?.trim(),
            page: data.page || 1,
            size: data.size || 10
        };
        setQuery({ ...submitData });
    }
    const columns = [

        {
            title: 'Tên',
            fieldName: 'fullName',
        },
        {
            title: 'Địa chỉ',
            fieldName: 'address',
        },
        {
            title: 'Phòng ban',
            fieldName: 'department',
        },


    ];


    const { data: tableData, isLoading } = useGetApi<any>(() => getListEmp(query), [query]);

    return [{ columns, tableData, isLoading, control, query }, { handleSubmit, onReset, onSubmit, onPageChange, onRowsPerPageChange }] as const;
}