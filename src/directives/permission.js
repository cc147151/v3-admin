import store from '@/store'
export const permissionFun = (app) => {
  app.directive('permission', {
    mounted(el, { arg }) {
      const permissions = store.getters?.userInfo?.permission?.points || []
      if (!permissions.includes(arg)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
