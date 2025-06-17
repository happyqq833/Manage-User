import { PageResponse } from "../../type";
import { RequestForm } from "../createRequest/type";

export type Request = {
    name: string;
    status: string;
}

export type Response = PageResponse<RequestForm>;