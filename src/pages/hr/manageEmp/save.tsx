import { U } from "vitest/dist/chunks/environment.LoooBwUu";
import { BaseResponse } from "../../../services/type";

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