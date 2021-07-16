<template>
  <div>
    <h1>🥁 Vue Spotify 🎸</h1>
    <div class="user-info">
      <img v-if="userInfo.images" :src="userInfo.images[0].url" alt="" />
      <div class="user-info__account">
        <h2>{{ userInfo.display_name }}</h2>
        <p>{{ userInfo.email }}</p>
      </div>
    </div>
    <!-- <iframe class="player" src="https://open.spotify.com/embed/track/2BzDh1kitD9Zliv03YtKtL" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->
    <SavedTracks />
    <RecentPlayedTracks />
  </div>
</template>

<script>
import RecentPlayedTracks from "@/components/RecentPlayedTracks.vue";
import SavedTracks from "@/components/SavedTracks.vue";

export default {
  components: {
    RecentPlayedTracks,
    SavedTracks,
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    };
  },
  computed: {
    // numberOfSavedTracks() {
    //   return JSON.parse(localStorage.getItem("savedTracks")).length;
    // },
  },
  // mounted() {
  //   this.$store.commit('updateUserPlaylists');
  // }
};
</script>

<style scoped>
/* .player {
  display: none;
} */

.user-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-info > * {
  margin: 0;
}
.user-info__account > p,
.user-info__account > h2 {
  margin: 0;
  text-align: left;
}

.user-info > img {
  height: 60px;
  margin-right: 2rem;
}
</style>
