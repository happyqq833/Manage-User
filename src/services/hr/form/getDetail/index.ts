import api from "../../../../lib/axios";

export const getDetailForm = async (id: string): Promise<any> => {
    const res = await api.get(`/request-form/${id}`);
    return res.data;
}