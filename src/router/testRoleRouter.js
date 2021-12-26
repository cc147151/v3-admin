export const superAdminMenus = [
  {
    path: '/user',
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo'
      },
      {
        path: '/user/import',
        name: 'import'
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/create'
      }
    ]
  },
  {
    path: '/marking',
    redirect: '/marking/active',
    meta: {
      title: '营销中心'
    },
    children: [
      {
        path: '/marking/active',
        meta: {
          title: '活动管理'
        }
      },
      {
        path: '/marking/theme',
        redirect: '/marking/theme/yuanDan',
        meta: {
          title: '活动主题'
        },
        children: [
          {
            path: '/marking/theme/yuanDan',
            meta: {
              title: '元旦活动'
            }
          },
          {
            path: '/marking/theme/newYear',
            meta: {
              title: '春节活动'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/visit',
    redirect: '/visit/index',
    children: [
      {
        path: '/visit/index',
        meta: {
          title: '浏览量'
        }
      }
    ]
  }
]
export const adminMenus = [
  {
    path: '/user',
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo'
      },
      {
        path: '/user/import',
        name: 'import'
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/create'
      }
    ]
  },
  {
    path: '/visit',
    redirect: '/visit/index',
    children: [
      {
        path: '/visit/index',
        meta: {
          title: '浏览量'
        }
      }
    ]
  }
]
export const staffMenus = [
  {
    path: '/user',
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo'
      },
      {
        path: '/user/import',
        name: 'import'
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/create'
      }
    ]
  },
  {
    path: '/visit',
    redirect: '/visit/index',
    children: [
      {
        path: '/visit/index',
        meta: {
          title: '浏览量'
        }
      },
      {
        path: '/visit/detail',
        // hidden: true
        meta: {
          title: '详情'
        }
      }
    ]
  }
]
