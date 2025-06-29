import api from "../../../../lib/axios";
import { Request } from "./type";

export const getDetailEmp = async (params: Request): Promise<any> => {
    const { id } = params;
    const res = await api.get(`/user/${id}`);
    return res.data;
}