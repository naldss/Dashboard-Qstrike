import axios from 'axios';
import { getToken } from '@/utils/token';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;