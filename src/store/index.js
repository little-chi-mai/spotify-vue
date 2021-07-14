import Vue from "vue";
import Vuex from "vuex";
// import EventService from "@/services/EventService.js";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLoggedIn: false,
    trackHovered: {},
    albumHovered: {},
    isMusicPlayed: false,
    imageHovered: '',
    trackClicked: {},
    albumClicked: {},
    artistIds: [],
    // savedTrackCounter: JSON.parse(localStorage.getItem("savedTracks")).length,
    savedTracks: JSON.parse(localStorage.getItem("savedTracks"))
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
      if (Object.keys(state.userInfo).length !== 0) {
        state.isLoggedIn = true;
        console.log("setIsLoggedIn", state.isLoggedIn);
      } else {
        state.isLoggedIn = false;
      }
    },
    // setIsLoggedIn(state, payload) {
    //   state.isLoggedIn = payload;
    // },
    setTrackHovered(state, payload) {
      state.trackHovered = payload;
    },
    setImageHovered(state, payload) {
      state.imageHovered = payload;
    },
    setIsMusicPlayed(state, payload) {
      state.isMusicPlayed = payload;
    },
    isLoggedIn(state, payload) {
      state.isLoggedIn = payload
    },
    setTrackClicked(state, payload) {
      state.trackClicked = payload
    }, 
    setArtistIds(state, payload) {
      state.artistIds = payload
    },
    setAlbumClicked(state, payload) {
      state.albumClicked = payload
    },
    setAlbumHovered(state, payload) {
      state.albumHovered = payload
    },
    // setSavedTrackCounter(state) {
    //   state.savedTrackCounter = JSON.parse(localStorage.getItem("savedTracks")).length;
    // },
    setSavedTracks(state) {
      state.savedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    }
  },
  actions: {
    setTrackHovered(context, payload) {
      context.commit("setTrackHovered", payload.track);
      context.commit("setIsMusicPlayed", payload.isMusicPlayed);
      context.commit("setImageHovered", payload.imageUrl);
    },
    setAlbumHovered(context, payload) {
      context.commit("setAlbumHovered", payload.album);
      context.commit("setIsMusicPlayed", payload.isMusicPlayed);
      context.commit("setImageHovered", payload.imageUrl);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    },
    savedTrackCounter() {
      return JSON.parse(localStorage.getItem("savedTracks")).length;
    }
  }
});
