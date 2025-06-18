import { BaseResponse } from "../../../type";

export type User = {
    id: string;
    username: string;
    fullName: string;
    dob: string;
    phone: string;
    address: string;
    department: string;
    position: string;
    role: "hr" | "employee";
    avatar: string;
};

export type Response = BaseResponse<User>;
export type Request = {
    id?: string | number;
}