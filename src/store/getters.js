import variables from '@/styles/variables.scss'
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  language: (state) => state.app.language,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened
}
