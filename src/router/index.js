import { createRouter, createWebHashHistory } from 'vue-router'
import { user, marking, article, visit } from './router'
import store from '../store'
import layout from '@/layout/index'
/**
 * 私有路由表
 */
export const privateRoutes = [...user, ...marking, ...article, ...visit]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    name: 'login'
  },
  {
    path: '/test',
    component: () => import('@/views/Test'),
    hidden: true
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
          icon: 'yonghu-yuan',
          title: '个人中心'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})
export const removeRoutes = () => {
  store.getters.privateRoutesArr.forEach((item) => {
    router.removeRoute(item.name)
  })
}
export default router
