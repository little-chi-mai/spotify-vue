<template>
  <div class="saved-track">
    <h3 class="saved-track-number" @click="showList">
      {{ savedTrackCounter }}
    </h3>

    <div v-if="isListShown" class="list">
      <button class="close-btn" @click="closeList">X</button>
      <label for="playlists">Choose from your playlists</label>
      <select name="playlists" id="playlists" v-model="list" @change="onChange">
        <option
          v-for="playlist in userPlaylists.items"
          :key="playlist.id"
          :value="playlist.id"
        >
          {{ playlist.name }}
        </option>
      </select>
      <button :disabled='!savedTrackCounter' class="btn" @click="addToList">Add tracks to this list</button>

      
      <form @submit.prevent>
        <span>Or create a new playlist</span>
        <input
          @input="onInputChange"
          type="text"
          :value="input"
          placeholder="Give your playlist a name"
        />
        <button :disabled='!input' class="btn" @click="createPlaylist">Create playlist</button>
      </form>

      <div v-if="isNotiShown" class="noti">
        <p>Successful added to playlist!</p>
      </div>

      <div class="track" v-for="track in savedTracks" :key="track.id">
        <!-- <img @hover="showReview" :src="track.album.images[0].url" alt="" /> -->
        <TrackImage :track="track" :size="50" />
        <div class="track-info">
          <h4>{{ track.name }}</h4>
          <p class="artist-name">
            {{ trackArtists(track.artists) }}
          </p>
        </div>
        <button class="delete-btn" @click="removeTrack(track.id)">—</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import TrackImage from "@/components/TrackImage";

export default {
  data() {
    return {
      isListShown: false,
      list: "",
      isNotiShown: false,
      input: "",
    };
  },
  components: {
    TrackImage,
  },
  computed: {
    savedTrackCounter() {
      return this.$store.state.savedTracks
        ? this.$store.state.savedTracks.length
        : 0;
    },
    savedTracks() {
      return this.$store.state.savedTracks;
    },
    userPlaylists() {
      return this.$store.state.userPlaylists;
    },
    trackIdArray() {
      return this.savedTracks.map((track) => track.id);
    },
  },
  methods: {
    getUserPlaylists() {
      EventService.getUserPlaylists(this.$store.state.userInfo.id).then(
        (response) => {
          // set the default list
          this.list = response.data.items.length && response.data.items[0].id;
          console.log(this.list);
          this.$store.commit("setUserPlaylists", response.data);
        }
      );
    },
    showList() {
      this.isListShown = !this.isListShown;
      // this.$store.commit("updateUserPlaylists");
      this.getUserPlaylists();
    },
    trackArtists(array) {
      return array.map((artist) => artist.name).join(" & ");
    },
    removeTrack(trackId) {
      this.$store.commit("removeSavedTrack", trackId);
    },
    onChange(e) {
      this.list = e.target.value;
    },
    addToList() {
      let stringList = JSON.stringify(this.trackIdArray);
      EventService.addTracksToPlaylist(this.list, stringList).then(
        (response) => {
          console.log("add to list", response);
          this.isNotiShown = true;
          setTimeout(() => {
            this.isNotiShown = false;
          }, 2000);
          this.$store.commit("clearSavedTracks");
        }
      );
    },
    createPlaylist() {
      EventService.createPlaylist(this.input).then((response) => {
        console.log(response);
        this.getUserPlaylists();
        this.input = "";
      });
    },
    onInputChange(e) {
      this.input = e.target.value;
    },
    closeList() {
      this.isListShown = false;
    }
  },
};
</script>

<style scoped>
h3 {
  margin: 1rem;
}

.list {
  position: relative;
  background-color: rgba(151, 151, 151, 0.219);
  width: 50vw;
  margin: 0 auto;
  padding: 1rem 3rem;
}
.close-btn {
  height: 1.5rem;
  width: 1.5rem;
  background-color: rgba(82, 82, 82, 0);
  /* border-radius: 1rem; */
  border: none;

  position: absolute;
  right: 1rem;
  top: 0.7rem;
  cursor: pointer;
  font-weight: bold;
}

.close-btn:hover {
  border-radius: 1rem;
  background-color: rgba(95, 95, 95, 0.61);
}

#playlists {
  /* height: 2rem; */
  padding: 5px;
  font-size: 14px;
}

.saved-track {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.saved-track-number {
  background-color: rgb(153, 93, 150);
  color: rgb(218, 218, 218);
  width: 3rem;
  cursor: pointer;
}

.artist-name {
  font-size: 13px;
}

img {
  height: 3rem;
  margin-right: 1rem;
}

.track {
  display: flex;
  margin-bottom: 1rem;
  position: relative;
}

.track:hover {
  background-color: rgba(119, 119, 119, 0.295);
}

.track-info > h4,
.track-info > p {
  text-align: left;
}

/* .add-tracks-btn {
  background-color: pink;
  color: rgb(39, 39, 39);
  padding: 0.5rem;
} */

.delete-btn {
  height: 1.7rem;
  width: 1.7rem;
  background-color: rgba(82, 82, 82, 0.562);
  border-radius: 1rem;
  border: none;
  color: rgb(197, 197, 197);
  /* font-weight: bold; */

  position: absolute;
  right: 0;
  top: 0.7rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: rgba(255, 220, 197, 0.356);
}

select {
  background-color: rgb(133, 84, 92);
  margin: 0.5rem;
}

.noti {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-color: rgba(192, 103, 155, 0.884);
  padding: 1rem;
  width: 20rem;
}

input {
  background-color: rgb(133, 84, 92);
  padding: 5px;
  font-size: 14px;
  min-width: 10rem;
  margin: 0.5rem;
}

input::placeholder {
  color: rgb(184, 184, 184);
  font-size: 12px;
}

button {
  margin: 0.5rem;
}
</style>
