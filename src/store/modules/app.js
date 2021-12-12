import { getItem, setItem } from '@/utils/storage'
import { LANG, STORAGEVARIABLES } from '@/constant'
import variables from '@/styles/variables.scss'
export default {
  namespaced: 'app',
  state: {
    sidebarOpened: false,
    cssVar: {
      ...variables,
      ...getItem(STORAGEVARIABLES)
    },
    language: getItem(LANG) || 'zh'
  },
  mutations: {
    changeSidebar(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    changeCssVar(state, { key, value }) {
      state.cssVar[key] = value
    }
  },
  actions: {
    changeSideBarOpened(context, payload) {
      context.commit('changeSidebar')
    }
  }
}
