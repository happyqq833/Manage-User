import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    TablePagination,
} from "@mui/material";

type ColumnDef = {
    title: string;
    fieldName: string;
    render?: (value: any, row: any) => React.ReactNode;
};

type CoreTableProps = {
    columns: ColumnDef[];
    data?: any[];
    isLoading?: boolean;
    onRowClick?: (row: any) => void;

    page?: number;
    rowsPerPage?: number;
    total?: number;
    onPageChange?: (event: unknown, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CoreTable({
    columns,
    data = [],
    isLoading,
    onRowClick,
    page = 0,
    rowsPerPage = 5,
    total = 0,
    onPageChange = () => { },
    onRowsPerPageChange,
}: CoreTableProps) {
    const stt: ColumnDef = {
        fieldName: "stt",
        title: "STT",
    };
    const columnsWithStt = [stt, ...columns];

    const dataWithStt = data.map((item, index) => ({
        stt: page * rowsPerPage + index + 1,
        ...item,
    }));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columnsWithStt.map((col) => (
                            <TableCell key={col.fieldName}>{col.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataWithStt.map((row, index) => (
                        <TableRow
                            key={index}
                            hover
                            style={{ cursor: onRowClick ? "pointer" : "default" }}
                            onClick={() => onRowClick?.(row)}
                        >
                            {columnsWithStt.map((col) => (
                                <TableCell key={col.fieldName}>
                                    {col.render
                                        ? col.render(row[col.fieldName], row)
                                        : row[col.fieldName]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </TableContainer>
    );
}
