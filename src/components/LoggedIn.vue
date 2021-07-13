<template>
  <div>
    <h1>Welcome to Vue Spotify</h1>
    <div class="user-info">
      <img v-if="userInfo.images" :src="userInfo.images[0].url" alt="" />
      <div class="user-info__account">
        <p>Account name: {{ userInfo.display_name }}</p>
        <p>Email: {{ userInfo.email }}</p>
      </div>
    </div>

    <h2>Your playlists</h2>
    <button @click="createPlaylist">Create playlist</button>

    <div class="list-info" v-for="playlist in userPlaylists.items" :key="playlist.id">
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
    RecentPlayedTracks,
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      userPlaylists: this.$attrs.userPlaylists,
      playlistChosen: "",
      tracks: {},
      name: "",
      url: "",
      playlistId: "",
      // image: this.user.images[0].url
    };
  },
  created() {},
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

/* .list-info {
  display: flex;
} */

.playlist {
  height: 10rem;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-info > * {
  margin: 3rem;
}
</style>
