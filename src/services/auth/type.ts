import { BaseResponse } from "../type"

export type Request = {
    username: string
    password: string
}

type LoginResponseData = {
    token: string
    role: 'hr' | 'employee'
    username: string
    avatar: string
}

export type Response = BaseResponse<LoginResponseData>