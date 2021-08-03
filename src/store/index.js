import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);
Vue.config.devtools = true;

function pushUnique(savedTracks, trackClicked) {
  let isUnique = true;
  let newTrackArray = savedTracks;
  savedTracks.map((track) => {
    if (track.id === trackClicked.id) {
      isUnique = false;
    }
  });
  if (isUnique) {
    newTrackArray.push(trackClicked);
  }
  return newTrackArray;
}

export default new Vuex.Store({
  state: {
    userInfo: {},
    userRecentTracks: [],
    userTopTracks: [],
    userLikedTracks: [],
    isLoggedIn: false,
    trackHovered: {},
    albumHovered: {},
    artistHovered: {},
    artistHoveredTopTrack: {},
    isMusicPlayed: false,
    musicUrl: "",
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
    setUserRecentTracks(state, payload) {
      state.userRecentTracks = payload;
    },
    setUserTopTracks(state, payload) {
      state.userTopTracks = payload;
    },
    setUserLikedTracks(state, payload) {
      state.userLikedTracks = payload;
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
    setSavedTracks(state, trackClicked) {
      let savedTracks = JSON.parse(localStorage.getItem("savedTracks"))
        ? JSON.parse(localStorage.getItem("savedTracks"))
        : [];
      pushUnique(savedTracks, trackClicked);
      // save in local storage
      localStorage.savedTracks = JSON.stringify(savedTracks);
      // save on state
      state.savedTracks = savedTracks;
    },
    removeSavedTrack(state, trackId) {
      let oldTracks = JSON.parse(localStorage.getItem("savedTracks"));
      let newTracks = [];
      oldTracks.map((track) => {
        if (track.id !== trackId) {
          newTracks.push(track);
        }
      });
      localStorage.savedTracks = JSON.stringify(newTracks);
      // save on state
      state.savedTracks = newTracks;
    },
    clearSavedTracks(state) {
      localStorage.savedTracks = JSON.stringify([]);
      state.savedTracks = [];
    },
    setUserPlaylists(state, payload) {
      state.userPlaylists = payload;
    },
    updateUserPlaylists(state) {
      EventService.getUserPlaylists(state.userInfo.id).then((response) => {
        state.userPlaylists = response.data;
      });
    },
  },
  actions: {
    // have to use dispatch
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
