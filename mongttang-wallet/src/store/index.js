import { createStore } from "vuex";
import tradeModule from "./tradeModule";
import walletModule from "./walletModule";

export default createStore({
  state: {
    privateKey: "",
    address: "",
  },
  getters: {},
  mutations: {
    SET_PRIVATEKEY(state, privateKey) {
      state.privateKey = privateKey;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    },
  },
  actions: {},
  modules: {
    tradeModule,
    walletModule,
  },
});
