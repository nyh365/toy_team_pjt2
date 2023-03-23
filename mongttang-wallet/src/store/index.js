import { createStore } from 'vuex'
import tradeModule from './tradeModule'
import walletModule from './walletModule'


export default createStore({
  state: {
    privateKey:"",
  },
  getters: {
  },
  mutations: {
    SET_PRIVATEKEY(state, privateKey){
      state.privateKey = privateKey;
    }
  },
  actions: {
  },
  modules: {
    tradeModule,
    walletModule
  }
})
