import { createStore } from 'vuex'
import tradeModule from './tradeModule'
import walletModule from './walletModule'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tradeModule,
    walletModule
  }
})
