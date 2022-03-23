import timeSince from '@/utils/time'
import getTokenList from '@/apis/tokens'

const tokenList = {
  namespaced: true,
  state: () => ({
    items: [],
    error: '',
    last_visible: '',
    has_next: false
  }),
  getters: {
    items: (state) => state.items,
    last_visible: (state) => state.last_visible,
    has_next: (state) => state.has_next,
    error: (state) => state.error
  },
  mutations: {
    reset (state) {
      state.items = []
      state.last_visible = ''
      state.has_next = false
    },
    items (state, items) {
      items.map((item) => {
        item.created_at = timeSince(item.created_at)
        return item
      })

      state.items = [...state.items, ...items]
    },
    last_visible (state, last_visible) {
      state.last_visible = last_visible
    },
    error (state, error) {
      state.error = error
    },
    has_next (state, has_next) {
      state.has_next = has_next
    },
  },
  actions: {
    async getTokens({ commit }, payload) {
      const { network, ...params } = payload;
      try {
        const token_list = await getTokenList(network, params)
        const items = this.getters['tokenList/items']

        if (token_list.tokens && token_list.tokens.length > 0) {
          commit('items', token_list.tokens)
          commit('last_visible', token_list.last_visible)
          commit('has_next', token_list.last_visible && token_list.last_visible != '' ? true : false)
        } else if (token_list.tokens && token_list.tokens.length < 1 && items.length > 0) {
          commit('has_next', false)
        } else {
          commit('reset')
        }
      } catch(err) {
        commit('error', err.message)
        commit('reset')
      }
    },
  }
}

export default tokenList
