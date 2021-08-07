<template>
  <div v-if="userId" class="about">
    <h1>Your playlists</h1>
    <div class="container">
      <div class="list">
        <div
          class="list-info"
          v-for="playlist in userPlaylists.items"
          :key="playlist.id"
          @click="getPlaylistInfo(playlist.id, playlist.name)"
          :class="{ activeTab: playlistId === playlist.id }"
        >
          <h3>{{ playlist.name }}</h3>

          <img
            class="playlist"
            v-if="playlist.images && playlist.images.length"
            :src="playlist.images[0].url"
            alt=""
          />

          <img
            class="playlist"
            v-else
            src="../assets/album.png"
            alt=""
          />
        </div>
      </div>

      <div v-show="playlistId" class="music-player">

        <h1>Playlist <span>{{ name }}</span></h1>
        <iframe
          v-if="playlistId"
          :src="'https://open.spotify.com/embed/playlist/' + playlistId"
          height="600"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>

    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {

  data() {
    return {
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
      return this.$store.state.userPlaylists;
    },
  },
  mounted() {
    this.$store.commit("setUserInfo");
    this.userId && this.getUserPlaylists(this.userId);
  },
  methods: {
    getPlaylistInfo(id, name) {
      if (this.playlistId === id) {
        this.playlistId = "";
        this.name = "";
      } else {
        this.playlistId = id;
        this.name = name;
      }
      
    },
    getUserPlaylists(userId) {
      EventService.getUserPlaylists(userId)
        .then((response) => {
          this.$store.commit("setUserPlaylists", response.data);
          let arrayIds = [];
          response.data.items &&
            response.data.items.map((playlist) => {
              arrayIds.push(playlist.id);
            });
        })
        .catch((error) => {
          console.log("There was an error at Home: " + error.response);
        });
    },
  },
  watch: {
      userId() {
        // getUserPlaylists again when refresh the page
        this.getUserPlaylists(this.userId);
      },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 4rem;
}

.container {
  display: flex;
  justify-content: space-evenly;
}

.list {
  display: grid;
  width: 60%;
  grid-template-columns: repeat(3, 3fr);
  /* grid-row: auto; */
  grid-gap: 2rem;
}

.list-info {
  border: solid rgba(255, 255, 255, 0) 5px;
  border-radius: 10px;
  background-color: rgba(68, 68, 68, 0.432);
  transition: all 0.2s ease-in-out;
}
.list-info:hover {
  border: solid salmon 5px;
  cursor: pointer;
}

.playlist {
  height: 10rem;
}

.activeTab {
  background-color: rgba(212, 103, 39, 0.712);
}

.music-player {
  border: ridge #ffbad1af 3px;
  padding: 1rem;
}

span {
  color: rgb(253, 255, 147);
}

</style>
