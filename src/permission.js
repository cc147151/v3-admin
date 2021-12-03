import router from './router'
import store from './store'

// 白名单路由(不需要token可访问得)

const whiteRoutes = ['/login', '/test']

router.beforeEach((to, from, next) => {
  console.log(to.path, store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      return next('/')
    }
    if (!store.getters.hasUserInfo) {
      store.dispatch('user/getUserInfo')
    }
    next()
  } else {
    if (whiteRoutes.includes(to.path)) {
      return next()
    }
    next('/login')
  }
})
