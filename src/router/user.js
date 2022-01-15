import layout from '@/layout/index'
export const user = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    name: 'User',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user/user-manage/index'),
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/menus',
        component: () => import('@/views/user/menus/index'),
        meta: {
          title: '菜单管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/user/role-list/index'),
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/user/permission-list/index'),
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user/user-info/index'),
        hidden: true
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/user/import/index'),
        hidden: true
      }
    ]
  }
]
