import api from "../../../../lib/axios";
import { Request } from "../getDetail/type";


export const deleteEmp = async (params: Request): Promise<any> => {
    const { id } = params;
    const res = await api.delete(`/users/${id}`);
    return res;
}