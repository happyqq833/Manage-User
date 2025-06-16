import { jwtDecode } from "jwt-decode";

export interface UserInfo {
    username: string;
    role: string;
}

export function saveAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
}

export function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function getUserInfo(): any {
    const token = getAccessToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token) as UserInfo;

        return decoded;
    } catch {
        return null;
    }


}

export function logout() {
    localStorage.removeItem("accessToken");
}
