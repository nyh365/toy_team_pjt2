
export default {
    state: {
      user: {},
    },
    mutations: {
      SET_USER(state, payload){
        state.user = payload;
      },
    },
    actions: {
      // action functions
      getUser(){
      },
    },
    getters: {
      // getter functions
    }
  }