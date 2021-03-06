import router, { removeRoutes } from '@/router'
import { setItem, getItem, removeAllItem } from '../../utils/storage'
import { TOKEN } from '@/constant'
import { login, userInfo } from '@/api/sys.js'
// import md5 from 'md5'
export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN) || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, { username, password }) {
      return new Promise((resolve, reject) => {
        login({
          userName: username,
          userPwd: password
        })
          .then((res) => {
            context.commit('setToken', res.data.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo(context) {
      const { data } = await userInfo()
      context.commit('setUserInfo', data)
      return data
    },
    loginOut(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      context.commit('setUserInfo', {})
      removeAllItem()
      removeRoutes()
      router.replace('/login')
      // location.href
    }
  }
}
