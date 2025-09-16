import axios from "axios";
import { APP } from "~/config/env";
// Axios custom
const privateApi = axios.create({
    baseURL: APP.API_URL,
    withCredentials: true,
});

// Refresh Token khi hết hạn
const refreshToken = () => {
    return axios.post(`${APP.API_URL}/auth/refresh`, null, { withCredentials: true });
};
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // ngăn lặp vô hạn nếu refresh token cũng lỗi
            try {
                await refreshToken(); // cần await
                return privateApi(originalRequest); // Retry request ban đầu
            } catch (error) {
                console.log(">>> Log instance Axios error: ", error);
            }
        }
        return Promise.reject(error);
    },
);

export default privateApi;
