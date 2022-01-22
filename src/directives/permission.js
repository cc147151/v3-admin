import store from '@/store'
export const permissionFun = (app) => {
  app.directive('permission', {
    mounted(el, { arg }) {
      const permissions =
        store.getters?.userInfo?.permissionList?.menuCodeArr || []
      if (!permissions.includes(arg)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
