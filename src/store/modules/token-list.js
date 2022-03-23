import _ from 'lodash'
import timeSince from '@/utils/time'
import getTokenList from '@/apis/tokens'

const tokenList = {
  namespaced: true,
  state: () => ({
    data: [{
      network: '',
      items: [],
      last_visible: '',
      has_next: false
    }]
  }),
  getters: {
    data: (state) => state.data
  },
  mutations: {
    reset(state, network) {
      const index = _.findIndex(state.data, { network })
      if (index > -1) {
        state.data[index] = {
          network: '',
          items: [],
          last_visible: '',
          has_next: false
        }
      }
    },
    items(state, payload) {
      const { network, items, last_visible, has_next } = payload
      const index = _.findIndex(state.data, { network })

      if (index > -1) {
        items.map((item) => {
          item.created_at = timeSince(item.created_at)
          return item
        })

        state.data[index].items = [...state.data[index].items, ...items]
        state.data[index].last_visible = last_visible
        state.data[index].has_next = has_next
      } else {
        state.data.push({
          network,
          items,
          last_visible,
          has_next
        })
      }
    },
    has_next(state, payload) {
      const { network, has_next } = payload
      const index = _.findIndex(state.data, { network })
      console.log(state.data, network)
      if (index > -1) state.data[index].has_next = has_next
    },
    last_visible(state, payload) {
      const { network, last_visible } = payload
      const index = _.findIndex(state.data, { network })
      if (index > -1) state.data[index].last_visible = last_visible
    }
  },
  actions: {
    async getTokens({ commit }, payload) {
      const { network, ...params } = payload;
      try {
        const token_list = await getTokenList(network, params)

        if (token_list.tokens && token_list.tokens.length > 0) {
          const has_next = token_list.last_visible && token_list.last_visible != '' || token_list.last_visible != null ? true : false
          const item_data = {
            network,
            items: token_list.tokens,
            last_visible: token_list.last_visible,
            has_next
          }
          commit('items', item_data)
        } else {
          commit('has_next', { has_next: false, network })
        }
      } catch(err) {
        commit('error', err.message)
        commit('reset', network)
      }
    },
  }
}

export default tokenList
