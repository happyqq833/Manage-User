import api from "../../../../lib/axios";
import { Request } from "./type";

export const getListEmp = async (params: Request): Promise<any> => {
    const res = await api.get('/users-list', { params });
    return res;
}