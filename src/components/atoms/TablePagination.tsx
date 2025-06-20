import React from "react";
import { TablePagination } from "@mui/material";

export const MyTablePagination = ({
    total,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: {
    total: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <TablePagination
            component="div"
            labelRowsPerPage='ggg'
            count={total}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 20]}
        />
    );
};
