<template>
  <div>
    <h1>Welcome to Vue Spotify</h1>
    <p>Display name: {{ userInfo.display_name }}</p>
    <p>Email: {{ userInfo.email }}</p>
    <img v-if="userInfo.images" :src="userInfo.images[0].url" alt="" />

    <h2>Your playlists</h2>
    <ul>
      <li v-for="playlist in userPlaylists.items" :key="playlist.id">
        <p>{{ playlist.name }}</p>

        <!-- <a href="/playlist"> -->
        <img
          class="playlist"
          v-if="playlist.images"
          :src="playlist.images[0].url"
          alt=""
          @click="playlistChosen = playlist.id"
        />
        <!-- </a> -->
      </li>
    </ul>

    <Playlist :id="playlistChosen"/>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import Playlist from "@/components/Playlist.vue";

export default {
  components: {
    Playlist,
  },
  data() {
    return {
      userInfo: {},
      userPlaylists: {},
      playlistChosen: "",
      // image: this.user.images[0].url
    };
  },
  created() {
    EventService.getUserInfo()
      .then((response) => {
        // this.events = response.data;
        console.log(response.data);
        this.userInfo = response.data.userInfo;
        this.userPlaylists = response.data.userPlaylists;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
    // EventService.getUserPlaylists()
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  },
  methods: {},
};
</script>

<style scoped>
.playlist {
  height: 10rem;
}
</style>
