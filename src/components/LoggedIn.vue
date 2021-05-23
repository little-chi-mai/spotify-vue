<template>
  <div>
    <h1>Welcome to Vue Spotify</h1>
    <p>Display name: {{ userInfo.display_name }}</p>
    <p>Email: {{ userInfo.email }}</p>
    <img v-if="userInfo.images" :src="userInfo.images[0].url" alt="" />

    <h2>Your playlists</h2>

    <div v-for="playlist in userPlaylists.items" :key="playlist.id">
      <p>{{ playlist.name }}</p>

      <img
        class="playlist"
        v-if="playlist.images"
        :src="playlist.images[0].url"
        alt=""
        @click="getPlaylistInfo(playlist.id)"
      />
    </div>

    <Playlist :tracks="tracks" :name="name" :url="url" />

    <RecentPlayedTracks />
    
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import Playlist from "@/components/Playlist.vue";
import RecentPlayedTracks from "@/components/RecentPlayedTracks.vue";

export default {
  components: {
    Playlist,
    RecentPlayedTracks
  },
  data() {
    return {
      userInfo: {},
      userPlaylists: {},
      playlistChosen: "",
      tracks: {},
      name: "",
      url: "",
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
  methods: {
    getPlaylistInfo(id) {
      EventService.getPlaylistInfo(id)
        .then((response) => {
          // this.events = response.data;
          console.log(response.data);
          this.tracks = response.data.tracks;
          this.name = response.data.name;
          this.url = response.data.external_urls.spotify;
          // this.userInfo = response.data.userInfo;
          // this.userPlaylists = response.data.userPlaylists;
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
  },
};
</script>

<style scoped>
.playlist {
  height: 10rem;
}
</style>
