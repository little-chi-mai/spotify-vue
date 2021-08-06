<template>
  <div class="recent-played" id="container" ref="container">
    <button
      @click="getRecentTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'recentTracks' }"
    >
      Your recent tracks
    </button>

    <button
      @click="getTopTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'topTracks' }"
    >
      Your top tracks
    </button>

    <button
      @click="getUserLikedTracks"
      class="btn"
      :class="{ activeTab: selectedTab === 'likedTracks' }"
    >
      Your liked tracks
    </button>

    <button
      @click="getNewRelease"
      class="btn"
      :class="{ activeTab: selectedTab === 'newRelease' }"
    >
      New Release
    </button>

    <div
      v-if="recentTracks.length && selectedTab === 'recentTracks'"
      class="recent-tracks block"
    >
      <h3>Your Recent Tracks</h3>
      <span v-for="track in recentTracks" :key="track.played_at">
        <TrackImage :scrollToEnd="scrollToEnd"  :track="track.track" />
      </span>
    </div>

    <div
      v-if="topTracks.length && selectedTab === 'topTracks'"
      class="recent-tracks block"
    >
      <h3>Your Top Tracks</h3>
      <span v-for="track in topTracks" :key="track.id">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track" />
      </span>
    </div>

    <div
      v-if="likedTracks.length && selectedTab === 'likedTracks'"
      class="recent-tracks block"
    >
      <h3>Your Liked Tracks</h3>
      <span v-for="track in likedTracks" :key="track.track.id">
        <TrackImage :scrollToEnd="scrollToEnd" :track="track.track" />
      </span>
    </div>

    <div
      v-if="newRelease.length && selectedTab === 'newRelease'"
      class="recent-tracks block"
    >
      <h3>New release</h3>
      <span v-for="album in newRelease" :key="album.id">
        <!-- <TrackImage :scrollToEnd="scrollToEnd" :track="track.track" /> -->
        
        <NewRelease :album="album" />
      </span>
    </div>

    <BlockPreview :scrollToEnd="scrollToEnd" />

    <BlockTrackInfo :scrollToEnd="scrollToEnd"  :getUserLikedTracks="getUserLikedTracks" />

    <div v-for="artistId in artistIds" :key="artistId">
      <BlockArtistTracks :scrollToEnd="scrollToEnd" :artistId="artistId" />
    </div>

    <BlockAlbumInfo :scrollToEnd="scrollToEnd" />
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import BlockPreview from "@/components/BlockPreview";
import TrackImage from "@/components/TrackImage";
import BlockTrackInfo from "@/components/BlockTrackInfo";
import BlockArtistTracks from "@/components/BlockArtistTracks";
import BlockAlbumInfo from "@/components/BlockAlbumInfo";
import NewRelease from "@/components/NewRelease";

export default {
  // data() {
  //   return {
  //     selectedTab: "",
  //   };
  // },
  components: {
    BlockPreview,
    TrackImage,
    BlockTrackInfo,
    BlockArtistTracks,
    BlockAlbumInfo,
    NewRelease
  },
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
    }
  },
  methods: {
    resetSelectedTab(tabName) {
      if (this.selectedTab === tabName) {
        this.$store.commit("setSelectedTab", "");
        this.$store.dispatch("resetScreen");
        return;
      }
      this.$store.commit("setSelectedTab", tabName);
      
    },
    getRecentTracks() {
      this.resetSelectedTab("recentTracks")
      EventService.getRecentPlayedTracks()
        .then((response) => {
          this.$store.commit("setUserRecentTracks", response.data);
        })
        .catch((error) => {
          this.resetSelectedTab("")
          console.log("There was an error:" + error.response);
        });
      
    },
    getTopTracks() {
      this.resetSelectedTab("topTracks")
      EventService.getUserTopTracks()
        .then((response) => {
          this.$store.commit("setUserTopTracks", response.data);
        })
        .catch((error) => {
          this.resetSelectedTab("")
          console.log("There was an error:" + error.response);
        });
    },
    getUserLikedTracks() {
      this.resetSelectedTab("likedTracks")
      EventService.getUserLikedTracks()
        .then((response) => {
          this.$store.commit("setUserLikedTracks", response.data.items);
        })
        .catch((error) => {
          this.resetSelectedTab("")
          console.log("There was an error:" + error.response);
        });
    },
    getNewRelease() {
      this.resetSelectedTab("newRelease")
      EventService.getNewRelease()
        .then(response => {
          this.$store.commit("setNewRelease", response.data.albums.items);
        })
        .catch((error) => {
          this.resetSelectedTab("")
          console.log("There was an error:" + error.response);
        });
    },
    scrollToEnd() {
      setTimeout(() => {
         const container = this.$refs.container;
        // container.scrollTop = container.scrollHeight;
        let bottom = container.scrollHeight;
        window.scrollTo({
          top: bottom,
          left: 0,
          behavior: "smooth",
        });
      }, 500)
    },
  },
  
};
</script>

<style scoped>

.recent-tracks {
  margin-bottom: 1rem;  
}

button {
  color: rgb(46, 46, 46);
  border-radius: 10px;
  margin: 2rem 0;
}

button:hover {
  color: whitesmoke;
  background-color: rgb(173, 88, 124);
}

.activeTab {
  background-color: #AD1457;
  color: rgb(255, 255, 255);
}

h3 {
  color: rgb(36, 36, 36);
  text-transform: uppercase;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
