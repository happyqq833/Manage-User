import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
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
};

export default function CoreTable({ columns, data = [], isLoading }: CoreTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.fieldName}>{col.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((col) => (
                                <TableCell key={col.fieldName}>
                                    {col.render ? col.render(row[col.fieldName], row) : row[col.fieldName]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}