
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

const api = axios.create({
    baseURL: "/",
    withCredentials: true,
});


let accessToken = localStorage.getItem("accessToken");

export const setAccessToken = (token: string) => {
    accessToken = token;
    localStorage.setItem("accessToken", token);
};

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/login")
        ) {
            originalRequest._retry = true;

            try {
                const response = await axios.post("/refresh-token", null, {
                    withCredentials: true,
                });

                const newAccessToken = (response.data as any).accessToken;
                setAccessToken(newAccessToken);

                // Cập nhật accessToken mới vào request cũ
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                };

                // Gửi lại request cũ
                return api(originalRequest);
            } catch (e) {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }

        throw error;
    }
);

export default api;
