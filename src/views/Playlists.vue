<template>
  <div v-if="userId" class="about">
    <h1>Your playlists</h1>
    <div class="list">
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
import EventService from "@/services/EventService";
import Playlist from "@/components/Playlist.vue";

export default {
  components: {
    Playlist,
  },
  data() {
    return {
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
    },
    userPlaylists() {
      return this.$store.state.userPlaylists
    }
  },
  mounted() {
    EventService.getUserPlaylists(this.userId)
      .then((response) => {
        this.$store.commit('setUserPlaylists', response.data)
      })
      .catch((error) => {
        console.log("There was an error at Home: " + error.response);
      });
  },
  methods: {
    getPlaylistInfo(id) {
      EventService.getPlaylistInfo(id)
        .then((response) => {
          console.log(response.data);
          this.tracks = response.data.tracks;
          this.name = response.data.name;
          this.url = response.data.external_urls.spotify;
          this.playlistId = response.data.id;
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    
  },
};
</script>

<style scoped>
.list {
  display: grid;
  width: 60%;
  grid-template-columns: repeat(3, 3fr);
  /* grid-row: auto; */
  grid-gap: 2rem;
}

.list-info {
  border: solid rgba(255, 199, 193, 0.507) 2px;
  border-radius: 10px;
}

.playlist {
  height: 10rem;
}

img {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

img:hover {
  border: solid salmon 5px;
}
</style>
