export default {
  namespaced: 'app',
  state: {
    sidebarOpened: false
  },
  mutations: {
    changeSidebar(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  },
  actions: {
    changeSideBarOpened(context, payload) {
      context.commit('changeSidebar')
    }
  }
}
