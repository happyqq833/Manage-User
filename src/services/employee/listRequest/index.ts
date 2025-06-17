import api from "../../../lib/axios";
import { Request } from "./type";

export const getListRequestForm = async (params: Request): Promise<any> => {
    const res = await api.get('/request-form', { params });
    return res;
};
