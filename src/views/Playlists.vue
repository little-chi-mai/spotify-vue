<template>
  <div v-if="userId" class="about">
    <h1>Your playlists</h1>
    <button @click="createPlaylist">Create playlist</button>

    <div
      class="list-info"
      v-for="playlist in userPlaylists.items"
      :key="playlist.id"
    >
      <h3>{{ playlist.name }}</h3>

      <img
        class="playlist"
        v-if="playlist.images && playlist.images[0]"
        :src="playlist.images[0].url"
        alt=""
        @click="getPlaylistInfo(playlist.id)"
      />

      <img
        class="playlist"
        v-if="!playlist.images[0]"
        src="../assets/album.png"
        alt=""
        @click="getPlaylistInfo(playlist.id)"
      />
    </div>

    <Playlist :tracks="tracks" :name="name" :url="url" />
    <iframe
      v-if="playlistId"
      :src="'https://open.spotify.com/embed/playlist/' + playlistId"
      height="380"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>

<script>
// import UserInfo from "@/components/UserInfo.vue";
import EventService from "@/services/EventService";
import Playlist from "@/components/Playlist.vue";

export default {
  components: {
    // UserInfo,
    Playlist,
  },
  data() {
    return {
      userPlaylists: {},
      playlistChosen: "",
      tracks: {},
      name: "",
      url: "",
      playlistId: "",
    };
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    } 
  },
  mounted() {
    // this.userInfo = this.$store.state.userInfo;
    EventService.getUserPlaylists(this.userId)
      .then((response) => {
        // this.events = response.data;
        console.log(response.data);
        // this.userInfo = response.data.userInfo;
        this.userPlaylists = response.data;
      })
      .catch((error) => {
        console.log("There was an error at Home: " + error.response);
      });
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
          this.playlistId = response.data.id;
          // this.userInfo = response.data.userInfo;
          // this.userPlaylists = response.data.userPlaylists;
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    createPlaylist() {
      EventService.createPlaylist();
    },
  },
};
</script>

<style scoped>
.playlist {
  height: 10rem;
}
</style>
