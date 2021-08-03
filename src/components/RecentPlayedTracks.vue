<template>
  <div class="recent-played">
    <button @click="getRecentTracks" class="btn">Your recent tracks</button>
    <button @click="getTopTracks" class="btn">Your top tracks</button>
    <button @click="getUserLikedTracks" class="btn">Your liked tracks</button>
    <div v-if="recentTracks.length" class="recent-tracks block">
      <h3>Your Recent Tracks</h3>
      <span v-for="track in recentTracks" :key="track.played_at">
        <TrackImage :track="track.track" />
      </span>
    </div>

    <div v-if="topTracks.length" class="recent-tracks block">
      <h3>Your Top Tracks</h3>
      <span v-for="track in topTracks" :key="track.id">
        <TrackImage :track="track" />
      </span>
    </div>

    <div v-if="likedTracks.length" class="recent-tracks block">
      <h3>Your Liked Tracks</h3>
      <span v-for="track in likedTracks" :key="track.track.id">
        <TrackImage :track="track.track" />
      </span>
    </div>

    <BlockPreview />

    <BlockTrackInfo :getUserLikedTracks="getUserLikedTracks"/>

    <div v-for="artistId in artistIds" :key="artistId">
      <BlockArtistTracks :artistId="artistId" />
    </div>

    <BlockAlbumInfo />
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import BlockPreview from "@/components/BlockPreview";
import TrackImage from "@/components/TrackImage";
import BlockTrackInfo from "@/components/BlockTrackInfo";
import BlockArtistTracks from "@/components/BlockArtistTracks";
import BlockAlbumInfo from "@/components/BlockAlbumInfo";

export default {
  components: {
    BlockPreview,
    TrackImage,
    BlockTrackInfo,
    BlockArtistTracks,
    BlockAlbumInfo,
  },
  methods: {
    getRecentTracks() {
      EventService.getRecentPlayedTracks()
        .then((response) => {
          this.$store.commit("setUserRecentTracks", response.data);
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    getTopTracks() {
      EventService.getUserTopTracks()
        .then((response) => {
          this.$store.commit("setUserTopTracks", response.data);
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    getUserLikedTracks() {
      EventService.getUserLikedTracks().then((response) => {
        this.$store.commit("setUserLikedTracks", response.data.items);
      });
    },
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
  },
};
</script>

<style scoped>
.recent-played {
  padding: 2rem 0;
}
.recent-tracks {
  background-color: white;
  margin-bottom: 1rem;
  width: 60vw;
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
h3 {
  color: rgb(150, 78, 78);
}
</style>
