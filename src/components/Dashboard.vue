<template>
  <div>
    <button
      @click="getRecentTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'recentTracks' }"
    >
      Your Recent Tracks
    </button>

    <button
      @click="getTopTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'topTracks' }"
    >
      Your Top Tracks
    </button>

    <button
      @click="getTopArtists"
      class="btn"
      :class="{ activeTab: selectedTab === 'topArtists' }"
    >
      Your Top Artists
    </button>

    <button
      @click="getUserLikedTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'likedTracks' }"
    >
      Your Liked Tracks
    </button>

    <button
      @click="getNewRelease"
      class="btn"
      :class="{ activeTab: selectedTab === 'newRelease' }"
    >
      New Release
    </button>

    <form @submit="search" @submit.prevent>
      <input
        @input="onInputTrack"
        type="text"
        :value="inputTrack"
        placeholder="Enter a track's name"
      />
      <input
        @input="onInputArtist"
        type="text"
        :value="inputArtist"
        placeholder="Enter an artist's name"
      />
      <button :disabled="!inputTrack && !inputArtist" class="btn">
        Search
      </button>
    </form>
  </div>
</template>

<script>
  import EventService from "@/services/EventService"

  export default {
    data() {
      return {
        inputTrack: "",
        inputArtist: "",
      };
    },
    props: ["setSearchTerm"],
    computed: {
    artistIds() {
      return this.$store.state.artistIds;
    },
    recentTracks() {
      return this.$store.state.userRecentTracks;
    },
    topTracks() {
      return this.$store.state.userTopTracks;
    },
    likedTracks() {
      return this.$store.state.userLikedTracks;
    },
    selectedTab() {
      return this.$store.state.selectedTab;
    },
    newRelease() {
      return this.$store.state.newRelease;
    },
    searchResults() {
      return this.$store.state.searchResults;
    },
  },
    methods: {
      resetSelectedTab(tabName) {
        console.log("FUNCTION IS CALLED2");
        if (this.selectedTab === tabName && tabName !== "searchResults") {
          console.log("FUNCTION IS CALLED3");
          this.$store.commit("setSelectedTab", "");
          this.$store.dispatch("resetScreen");
          return;
        }
        console.log("FUNCTION IS CALLED4");
        this.$store.dispatch("resetScreen");
        this.$store.commit("setSelectedTab", tabName);
        
      },
      getRecentTracks() {
        this.resetSelectedTab("recentTracks");
        EventService.getRecentPlayedTracks()
          .then((response) => {
            this.$store.commit("setUserRecentTracks", response.data);
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      getTopTracks() {
        console.log("FUNCTION IS CALLED");
        this.resetSelectedTab("topTracks");
        EventService.getUserTopTracks()
          .then((response) => {
            this.$store.commit("setUserTopTracks", response.data);
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      getTopArtists() {
        this.resetSelectedTab("topArtists");
        EventService.getUserTopArtists()
          .then((response) => {
            console.log("setUserTopArtists", response.data);
            this.$store.commit("setUserTopArtists", response.data);
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      getUserLikedTracks() {
        this.resetSelectedTab("likedTracks");
        EventService.getUserLikedTracks()
          .then((response) => {
            this.$store.commit("setUserLikedTracks", response.data.items);
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      getNewRelease() {
        this.resetSelectedTab("newRelease");
        EventService.getNewRelease()
          .then((response) => {
            this.$store.commit("setNewRelease", response.data.albums.items);
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      search() {
        console.log("SEARCH");
        this.resetSelectedTab("searchResults");
        let term = "";
        if (this.inputTrack && this.inputArtist) {
          term = `track: ${this.inputTrack} artist: ${this.inputArtist}`;
        } else if (this.inputTrack && !this.inputArtist) {
          term = this.inputTrack;
        } else if (!this.inputTrack && this.inputArtist) {
          term = `artist: ${this.inputArtist}`;
        }
        EventService.searchTracks(term)
          .then((response) => {
            console.log("RESPONSE", response.data);
            this.$store.commit("setSearchResults", response.data.tracks.items);
            this.setSearchTerm(term);
            this.inputTrack = "";
            this.inputArtist = "";
          })
          .catch((error) => {
            this.resetSelectedTab("");
            console.log("There was an error:" + error.response);
          });
      },
      onInputTrack(e) {
        this.inputTrack = e.target.value;
      },
      onInputArtist(e) {
        this.inputArtist = e.target.value;
      },
    }
  }
</script>

<style scoped>

button {
  color: rgb(46, 46, 46);
  border-radius: 10px;
  margin: 0.5rem 0;
}

button:hover {
  color: whitesmoke;
  background-color: rgb(173, 88, 124);
}

.activeTab {
  background-color: #ad1457;
  color: rgb(255, 255, 255);
}

h3 {
  color: rgb(36, 36, 36);
  text-transform: uppercase;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

input {
  color: rgb(41, 41, 41);
  width: 12rem;
  padding: 0.3rem;
  height: 3rem;
  border-radius: 0.5rem;
}
</style>