import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: 'app',
  state: {
    sidebarOpened: false,
    language: getItem(LANG) || 'zh'
  },
  mutations: {
    changeSidebar(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    }
  },
  actions: {
    changeSideBarOpened(context, payload) {
      context.commit('changeSidebar')
    }
  }
}
