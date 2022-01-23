import { privateRoutes, publicRoutes } from '@/router'

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
// 遍历返回的菜单列表，把和本地相同的拿出来赋值给一个新的路由对象
function filterPrivateRoutes(menus, privateRoutes) {
  return menus.map((itemMenu) => {
    const routeInfo = {}
    const obj = privateRoutes.find(
      (itemRoute) => itemRoute.path === itemMenu.path
    )
    Object.assign(routeInfo, obj)
    if (itemMenu.menuName && routeInfo.meta) {
      routeInfo.meta.title = itemMenu.menuName
    }
    if (itemMenu.icon && routeInfo.meta) {
      routeInfo.meta.icon = itemMenu.icon
    }
    if (itemMenu.children) {
      routeInfo.children = filterPrivateRoutes(itemMenu.children, obj.children)
    }
    // 就算itemMenu没有children，也要用find找到与之对应得本地路由（可能包含非菜单页面or 一级路由）
    return routeInfo
  })
}
// 根的一级菜单一定要有children
// 只处理一级菜单问题，嵌套的一级不在此（只有一个作为菜单子路由的时候该子路由就作为一级菜单显示）因为一级菜单有个需要对应layout的父组件
// eg:visit浏览量菜单
function getMenuRoutersArr(allMenu) {
  return allMenu.map((item) => {
    if (item.children) {
      const levelArr = item.children.filter((item) => !item.hidden)
      if (levelArr.length === 1) {
        item = levelArr[0]
      }
    }
    return item
  })
}
