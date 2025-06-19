import { RequestForm } from "../../../employee/createRequest/type";

export type Request = RequestForm & {
    status: "pending" | "rejected" | "approved";
};