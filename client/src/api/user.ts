import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
  captchaId: string;
  verifyCode: string;
}

export function getUserInfo() {
  return axios.get<UserState>('/admin/account/info');
}
