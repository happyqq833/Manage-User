
import api from "../../../lib/axios";
import { Response } from "./type";

export const getDetailUser = async (id: string): Promise<Response> => {
    const res = await api.get<Response>(`/user/${id}`, {

    });

    return res.data;
};
