import axios from 'axios';

/** 用户列表 */
export function getUserList(data?: any) {
  return axios.post('/admin/sys/user/page', data);
}

/** 添加用户 */
export function addUser(data?: any) {
  return axios.post('/admin/sys/user/add', data);
}

/** 用户信息 */
export function getUserInfo(data?: any) {
  return axios.get('/admin/sys/user/info', { params: data });
}

/** 删除用户 */
export function deleteUser(data?: any) {
  return axios.post('/admin/sys/user/delete', data);
}

/** 更新用户信息 */
export function updateUser(data?: any) {
  return axios.post('/admin/sys/user/update', data);
}

/** 更新用户密码 */
export function updateUserPassword(data?: any) {
  return axios.post('/admin/sys/user/password', data);
}
