import router from './router'
import store from './store'

// 白名单路由(不需要token可访问得)

const whiteRoutes = ['/login', '/test']

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      return next('/')
    }
    if (!store.getters.hasUserInfo) {
      const { permissionList } = await store.dispatch('user/getUserInfo')
      const privateRoutesArr = await store.dispatch(
        'permission/getMenus',
        permissionList.menu
      )
      privateRoutesArr.map((item) => {
        router.addRoute(item)
      })
      // 添加完动态路由之后，需要在进行一次主动跳转
      return next(to.path)
    }
    next()
  } else {
    if (whiteRoutes.includes(to.path)) {
      return next()
    }
    next('/login')
  }
})
