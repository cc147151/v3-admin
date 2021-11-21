import { setItem } from '../../utils/storage'
import { TOKEN } from '@/constant'
import { login } from '@/api/sys.js'
import md5 from 'md5'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login(context, { username, password }) {
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            console.log(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
