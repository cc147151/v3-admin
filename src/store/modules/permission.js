import { privateRoutes, publicRoutes } from '@/router'
import {
  superAdminMenus,
  adminMenus,
  staffMenus
} from '@/router/testRoleRouter'

export default {
  namespaced: 'permission',
  state: {
    menuRouters: []
  },
  mutations: {
    changePermissionState(state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async getMenus(context, menus) {
      // 改造成test数据
      if (context.rootGetters.userInfo) {
        const { userInfo } = context.rootGetters
        if (userInfo.title === '超级管理员') {
          menus = superAdminMenus
        } else if (userInfo.title === '管理员') {
          menus = adminMenus
        } else {
          menus = staffMenus
        }
      }
      // 从定义的私有路由表里筛选出后端返回的指定路由表
      const privateRoutesArr = filterPrivateRoutes(menus, privateRoutes)
      privateRoutesArr.push({
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/error-page/404'),
        hidden: true
      })
      // 处理一下一级菜单问题（只有一个子路由的时候该子路由就作为一级菜单显示）
      const menuRoutersArr = getMenuRoutersArr([
        ...publicRoutes,
        ...privateRoutesArr
      ])
      // 赋值
      context.commit('changePermissionState', {
        key: 'menuRouters',
        value: menuRoutersArr
      })
      // 返回出去添加路由表
      return privateRoutesArr
    }
  }
}
// 从定义的私有路由表里筛选出后端返回的指定路由表，后续去添加路由
function filterPrivateRoutes(menus, privateRoutes) {
  let routerArr = []
  routerArr = privateRoutes.filter((itemRouter) => {
    return menus.some((itemMenus) => {
      if (itemMenus.path === itemRouter.path) {
        if (itemMenus.children && itemMenus.children.length > 0) {
          itemRouter.children = filterPrivateRoutes(
            itemMenus.children,
            itemRouter.children
          )
        } else {
          delete itemRouter.children
        }
        return true
      } else {
        return false
      }
    })
  })
  return routerArr
}
// 处理一下一级菜单问题（只有一个子路由的时候该子路由就作为一级菜单显示）
function getMenuRoutersArr(allMenu) {
  return allMenu.map((item) => {
    if (item.children) {
      if (item.children.filter((item) => !item.hidden).length === 1) {
        item = item.children[0]
      }
    }
    return item
  })
}
