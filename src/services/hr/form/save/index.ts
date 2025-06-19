import api from "../../../../lib/axios"
import { Request } from "./type"

export const putForm = async (data: Request): Promise<any> => {
    const { id } = data
    const res = api.put(`/request-form//${id}`, data)
    return res
}