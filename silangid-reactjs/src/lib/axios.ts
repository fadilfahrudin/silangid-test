import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosWithAuth = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menyisipkan token Authorization
axiosWithAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosWithAuth;
