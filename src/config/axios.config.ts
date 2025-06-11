import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export enum ApiEnvironment {
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production'
}

const getEnvironment = (): ApiEnvironment => {
  const env = import.meta.env.VITE_API_ENV || 'development';
  return env as ApiEnvironment;
};

const getBaseUrl = (): string => {
  return 'https://reqres.in/api';
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': 'reqres-free-v1'

  }
};

const axiosInstance: AxiosInstance = axios.create(defaultConfig);

// Interceptor đơn giản để log request và response
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  USERS: {
    BASE: '/users',
    BY_ID: (id: string | number) => `/users/${id}`
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string | number) => `/products/${id}`
  }
};

export default axiosInstance;
