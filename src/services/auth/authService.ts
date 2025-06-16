import { Request } from './type'
import api, { setAccessToken } from '../../lib/axios'

export async function login(payload: Request) {
    const res = await api.post("/login", payload);
    const token = res.data.accessToken;
    setAccessToken(token);
}
