<template>
  <div v-if="userId" class="about">
    <h1>Spotify playlists</h1>
    <form @submit="search" @submit.prevent>
      <input
        @input="onInput"
        type="text"
        :value="input"
        placeholder="Enter an playlist's name"
      />
      <button :disabled="!input" class="btn">Search</button>
    </form>
    <div v-show="searchTerm" class="container">
      <h2>SEARCH RESULT FOR <span>{{searchTerm.toUpperCase()}}</span></h2>
      <div class="list">
        <div
          class="list-info"
          v-for="playlist in searchResult"
          :key="playlist.id"
          @click="getPlaylistInfo(playlist.id, playlist.name)"
          :class="{ activeTab: playlistId === playlist.id }"
        >
          <Playlist :playlist="playlist"/>
        </div>
      </div>
      <hr>
    </div>  


    <div v-show="Object.keys(userPlaylists).length" class="container">
      
      <h2>YOUR PLAYLISTS</h2>
      <div class="list">
        <div
          class="list-info"
          v-for="playlist in userPlaylists.items"
          :key="playlist.id"
          @click="getPlaylistInfo(playlist.id, playlist.name)"
          :class="{ activeTab: playlistId === playlist.id }"
        >
          <Playlist :playlist="playlist"/>
        </div>
      </div>

      <div v-show="playlistId" class="music-player">
        <h2>
          Playlist <span>{{ name }}</span>
        </h2>
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
import Playlist from "@/components/Playlist";

export default {
  data() {
    return {
      tracks: {},
      name: "",
      url: "",
      playlistId: "",
      input: "",
      searchResult: [],
      searchTerm: ''
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
  components: {
    Playlist
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
    onInput(e) {
      this.input = e.target.value;
      console.log(this.input);
    },
    async search() {
      if (this.input === "") {
        return;
      }
      let searchResult = await EventService.searchPlaylists(this.input);
      this.searchResult = searchResult.data.playlists.items;
      this.searchTerm = this.input;
      this.input = "";
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
  margin-bottom: 2rem;
}


.container {
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  width: 60%;
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 3fr);
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
  position: fixed;
  top: 19rem;
  right: 10%;
  max-width: 400px;
  background-color: rgba(109, 109, 109, 0.356);
}

span {
  color: rgb(253, 255, 147);
}

input {
  color: rgb(255, 255, 255);
  height: 2.5rem;
  width: 15rem;
  background-color: rgb(110, 85, 133);
  padding: 0.5rem;
}

input::placeholder {
  color: rgb(182, 182, 182);
}

hr {
  margin: 2rem 4rem;
}
</style>
