import axios from 'axios';

/**
 * 角色列表
 */
export function getRoleList(data?: any) {
  return axios.get<any>('/admin/sys/role/page', data);
}

/**
 * 添加角色
 */
export function addRole(data?: any) {
  return axios.post<any>('/admin/sys/role/add', data);
}
