/**
 *  http 请求 拦截器
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store';

export interface HttpResponse<T = unknown> {
  message: string;
  code?: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // console.log(res);
    if (res.code !== 200) {
      Message.error({
        content: res.message || '错误',
        duration: 5 * 1000,
      });
      if (res.code === 11002) {
        const useUser = useUserStore();
        useUser.logout();
      }

      return Promise.reject(new Error(res.data?.message || 'Error'));
    }
    return res;
  },
  (error) => {
    const responseError = error.response;
    console.log(responseError);
    Message.error({
      content: responseError.data?.message || responseError.statusText,
      duration: 5 * 1000,
    });
    return Promise.reject(responseError);
  }
);
