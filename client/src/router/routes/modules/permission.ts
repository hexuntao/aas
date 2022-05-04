export default {
  path: 'permission',
  name: 'permission',
  component: () => import('@/views/permission/index.vue'),
  meta: {
    locale: 'menu.permission',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 6,
  },
  children: [
    {
      path: 'user',
      name: 'permission-user',
      component: () => import('@/views/permission/user/index.vue'),
      meta: {
        locale: 'menu.permission.user',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'role',
      name: 'permission-role',
      component: () => import('@/views/permission/role/index.vue'),
      meta: {
        locale: 'menu.permission.role',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'menu',
      name: 'permission-menu',
      component: () => import('@/views/permission/menu/index.vue'),
      meta: {
        locale: 'menu.permission.menu',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
