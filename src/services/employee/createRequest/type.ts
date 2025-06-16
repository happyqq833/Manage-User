
export type User = {
    id: string | number
    username: string
    role: string
}
export type RequestForm = {
    id: string | number
    name: string
    reason: string
    createdBy: User
    createdAt: string
    approver: User

}
