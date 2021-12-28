import { privateRoutes, publicRoutes } from '@/router'
import {
  superAdminMenus,
  adminMenus,
  staffMenus
} from '@/router/testRoleRouter'

export default {
  namespaced: 'permission',
  state: {
    menuRouters: [],
    // 动态添加的路由
    privateRoutesArr: []
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
      context.commit('changePermissionState', {
        key: 'privateRoutesArr',
        value: privateRoutesArr
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
          // 经过筛选后发现后端返回children里只有需要菜单栏隐藏的路由，菜单栏会隐藏该路由
          if (itemRouter.children.every((item) => item.hidden)) {
            itemRouter.hidden = true
          }
        } else if (itemMenus.children && itemMenus.children.length === 0) {
          // 防止显示一个无子集但是children为空数组的菜单   (super-admin账号的article)
          itemRouter.hidden = true
          // 删掉是为了防止去注册路由（代码定义的路由会被筛选到）
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
// 根的一级菜单一定要有children
// 只处理一级菜单问题，嵌套的一级不在此（只有一个作为菜单子路由的时候该子路由就作为一级菜单显示）因为一级菜单有个需要对应layout的父组件
// eg:visit浏览量菜单
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
