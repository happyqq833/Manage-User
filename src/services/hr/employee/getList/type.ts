import { PageResponse } from "../../../type";

export type Employee = {
    id: string;
    fullName: string;
    address: string;
    department: string;
}

export type Response = PageResponse<Employee>;

export type Request = {
    page: number;
    size: number;
    search?: string;
    department?: string;
    fullName?: string;
}