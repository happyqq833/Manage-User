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
import { f } from "msw/lib/glossary-2792c6da";

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
};

export default function CoreTable({ columns, data = [], isLoading, onRowClick }: CoreTableProps) {

    const stt: ColumnDef = {
        fieldName: "stt",
        title: "STT",
    }
    const columnsWithStt = [stt, ...columns];
    console.log("columnsWithStt", columnsWithStt);

    const dataWithStt = data.map((item, index) => ({
        stt: index + 1,
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
                            onClick={() => onRowClick?.(row)} >
                            {columnsWithStt.map((col) => (
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