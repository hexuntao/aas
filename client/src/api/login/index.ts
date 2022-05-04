import axios from 'axios';

export interface LoginRes {
  token: string;
}

export function login(data: any) {
  return axios.post<LoginRes>('/admin/login', data);
}

export function logout() {
  return axios.post('/admin/logout');
}

/**
 * 获取图片验证码
 */
export function getImageCaptcha(params?: any) {
  return axios.get<any>('/admin/captcha/img', { params });
}
