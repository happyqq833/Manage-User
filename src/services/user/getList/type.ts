export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

export interface UserInput {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}