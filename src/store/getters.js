export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  menuRouters: (state) => state.permission.menuRouters,
  language: (state) => state.app.language,
  cssVar: (state) => state.app.cssVar,
  sidebarOpened: (state) => state.app.sidebarOpened
}
