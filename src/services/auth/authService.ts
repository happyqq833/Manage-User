import axios from '../../lib/axios'
import { BaseResponse } from '../type'
import { Request, Response } from './type'


// export const login = async (payload: Request): Promise<Response> => {
//     const res = await axios.post<Response>('/login', payload)
//     return res.data
// }
import api, { setAccessToken } from '../../lib/axios'

export async function login(payload: Request) {
    const res = await api.post("/login", payload);
    const token = res.data.accessToken;
    setAccessToken(token);
}
