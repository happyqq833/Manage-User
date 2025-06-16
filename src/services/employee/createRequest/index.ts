import api from "../../../lib/axios";
import { RequestForm } from "./type";

export const postRequestForm = async (payload: RequestForm): Promise<any> => {
    const res = await api.post('/create', payload);
    return res.data;
};
