import { BaseResponse } from "../../type";

export type UserInfo = {
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

export type Response = BaseResponse<UserInfo>;