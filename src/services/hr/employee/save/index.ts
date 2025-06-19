import api from "../../../../lib/axios";
import { User } from "../getDetail/type";

export const postEmp = async (data: User): Promise<any> => {
    const res = api.post('/users', data)
    return res
}

export const putEmp = async (data: User): Promise<any> => {
    const { id } = data
    const res = api.put(`/users/${id}`, data)
    return res
}