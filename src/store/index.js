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
    userTopArtists: [],
    userLikedTracks: [],
    newRelease: [],
    isLoggedIn: false,
    trackHovered: {},
    albumHovered: {},
    artistHovered: {},
    newReleaseHovered:{},
    artistHoveredTopTrack: {},
    isMusicPlayed: false,
    musicUrl: "",
    imageHovered: "",
    trackClicked: {},
    albumClicked: {},
    artistIds: [],
    userPlaylists: {},
    savedTracks: JSON.parse(localStorage.getItem("savedTracks")),
    selectedTab: "",
    searchResults: []
  },
  mutations: {
    setUserInfo(state) {
      if (Object.keys(state.userInfo).length !== 0) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
      EventService.getUserInfo()
        .then((response) => {
          state.userInfo = response.data.userInfo;
          state.isLoggedIn = true;
          // console.log(state.userInfo);
        })
        .catch((error) => {
          console.log("There was an error at Home: " + error.response);
        });
    },
    logout(state) {
      state.userInfo = {};
      state.isLoggedIn = false;
    },
    setTrackHovered(state, payload) {
      state.trackHovered = payload;
    },
    setUserRecentTracks(state, payload) {
      state.userRecentTracks = payload;
    },
    setUserTopTracks(state, payload) {
      state.userTopTracks = payload;
    },
    setUserTopArtists(state, payload) {
      state.userTopArtists = payload;
    },
    setUserLikedTracks(state, payload) {
      state.userLikedTracks = payload;
    },
    setNewRelease(state, payload) {
      state.newRelease = payload;
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
    setNewReleaseHovered(state, payload) {
      state.newReleaseHovered = payload;
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
    setSelectedTab(state, payload) {
      state.selectedTab = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
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
    resetScreen(context) {
      console.log("TRYING TO RESET");
      context.commit("setTrackClicked", {});
      context.commit("setAlbumClicked", {});
      context.commit("setArtistIds", []);
      context.commit("setSearchResults", []);
      context.commit("setUserLikedTracks", []);
      context.commit("setUserTopTracks", []);
      context.commit("setUserTopArtists", []);
      // context.commit("setUserTopTracks", []);
    }
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
