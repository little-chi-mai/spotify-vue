import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLoggedIn: false,
    trackHovered: {},
    albumHovered: {},
    artistHovered: {},
    artistHoveredTopTrack: {},
    isMusicPlayed: false,
    musicUrl: '',
    imageHovered: "",
    trackClicked: {},
    albumClicked: {},
    artistIds: [],
    userPlaylists: {},
    // savedTrackCounter: JSON.parse(localStorage.getItem("savedTracks")).length,
    savedTracks: JSON.parse(localStorage.getItem("savedTracks")),
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
    setMusicUrl(state, payload) {
      state.musicUrl = payload;
    },
    isLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setTrackClicked(state, payload) {
      state.trackClicked = payload;
    },
    setArtistIds(state, payload) {
      state.artistIds = payload;
    },
    setAlbumClicked(state, payload) {
      state.albumClicked = payload;
    },
    setAlbumHovered(state, payload) {
      state.albumHovered = payload;
    },
    setArtistHovered(state, payload) {
      state.artistHovered = payload;
    },
    setArtistHoveredTopTrack(state, payload) {
      state.artistHoveredTopTrack = payload;
    },
    setSavedTracks(state) {
      state.savedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    },
    setUserPlaylists(state, payload) {
      state.userPlaylists = payload;
    },
    updateUserPlaylists(state) {
      EventService
        .getUserPlaylists(state.userInfo.id)
        .then(response => {
          state.userPlaylists = response.data
      });
    },
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
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    savedTrackCounter() {
      return JSON.parse(localStorage.getItem("savedTracks")).length;
    },
  },
});
