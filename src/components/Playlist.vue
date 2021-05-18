<template>
  <div v-if="id">
    <h1>Playlist coming soon</h1>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      playlistInfo: {},
    };
  },
  mounted() {
    EventService.getPlaylistInfo(this.id)
      .then((response) => {
        // this.events = response.data;
        console.log(response.data);
        // this.userInfo = response.data.userInfo;
        // this.userPlaylists = response.data.userPlaylists;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
};
</script>

<style lang="scss" scoped></style>
