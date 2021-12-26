import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'
import permission from './modules/permission'
export default createStore({
  getters,
  modules: {
    user,
    app,
    permission
  }
})
