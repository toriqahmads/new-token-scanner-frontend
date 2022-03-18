import Vue from 'vue'
import Vuex from 'vuex'
import tokenList from './modules/token-list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    tokenList
  }
})
