import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLoggedIn: false
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
      if (Object.keys(state.userInfo).length !== 0) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
  },
  actions: {
    async setUserInfo(state) {
      const newUserInfo = await EventService.getUserInfo();
      state.commit("setUserInfo", newUserInfo);
    },
  },
  modules: {},
});
