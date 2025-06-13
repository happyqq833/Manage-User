import axios from '../../lib/axios'
import { BaseResponse } from '../type'
import { Request, Response } from './type'


export const login = async (payload: Request): Promise<Response> => {
    const res = await axios.post<Response>('/login', payload)
    return res.data
}
