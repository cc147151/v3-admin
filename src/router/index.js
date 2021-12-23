import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
const RouteView = {
  render() {
    return (
      <>
        <RouterView></RouterView>
      </>
    )
  }
}
const layout = import('@/layout/index')
/**
 * 私有路由表
 */
export const privateRoutes = [
  {
    path: '/marking',
    component: layout,
    redirect: '/marking/active',
    meta: {
      title: 'marking'
    },
    children: [
      {
        path: '/marking/active',
        meta: {
          title: 'active'
        },
        component: () => import('@/views/marking/index')
      },
      {
        path: '/marking/yuanDan',
        component: RouteView,
        redirect: '/marking/yuanDan/product',
        meta: {
          title: 'yuanDan'
        },
        children: [
          {
            path: '/marking/yuanDan/product',
            component: () => import('@/views/marking/product.vue'),
            meta: {
              title: 'product'
            }
          },
          {
            path: '/marking/yuanDan/list',
            component: () => import('@/views/marking/list.vue'),
            meta: {
              title: 'list'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: '用户管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index')
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index')
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index')
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: '创建文章',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index')
      }
    ]
  }
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/test',
    component: () => import('@/views/Test')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})
export default router
