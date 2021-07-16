<template>
  <div class="saved-track">
    <h3 class="saved-track-number" @click="showList">
      {{ savedTrackCounter }}
    </h3>

    <div v-if="isListShown" class="list">
      <label for="playlists">Choose from your playlists: </label>
      <select
        name="playlists"
        id="playlists"
        v-model="list"
        @change="onChange"
      >
        <option
          v-for="playlist in userPlaylists.items"
          :key="playlist.id"
          :value="playlist.id"
        >
          {{ playlist.name }}
        </option>
      </select>

      <button 
        class="btn"
        @click="addToList"
      >
        Add tracks to this list
      </button>

      <div v-if="isNotiShown" class="noti">
        <p>Successful added to playlist!</p>
      </div>

      <div class="track" v-for="track in savedTracks" :key="track.id">
        <img :src="track.album.images[0].url" alt="" />
        <div class="track-info">
          <h4>{{ track.name }}</h4>
          <p class="artist-name">
            {{ trackArtists(track.artists) }}
          </p>
        </div>
        <button class="delete-btn" @click="removeTrack(track.id)">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
export default {
  data() {
    return {
      isListShown: false,
      list: "",
      isNotiShown: false
    };
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
      return this.savedTracks.map(track => track.id);
    }
  },
  methods: {
    showList() {
      this.isListShown = !this.isListShown;
      this.$store.commit("updateUserPlaylists");
       EventService
        .getUserPlaylists(this.$store.state.userInfo.id)
        .then(response => {
          this.list = response.data.items[0].id
      });
    },
    trackArtists(array) {
      return array.map((artist) => artist.name).join(" & ");
    },
    removeTrack(trackId) {
      console.log("trying to remove");
      let newTracks = [];
      this.savedTracks.map((track) => {
        if (track.id !== trackId) {
          newTracks.push(track);
        }
      });
      console.log("newTracks", newTracks);
      localStorage.savedTracks = JSON.stringify(newTracks);
      this.$store.commit("setSavedTracks");
    },
    onChange(e) {
      console.log(e.target.value);
      this.list = e.target.value;
    },
    addToList() {
      let stringList = JSON.stringify(this.trackIdArray)
      console.log("STRING LIST", stringList);
      EventService
        .addTracksToPlaylist(this.list, stringList)
        .then(response => {
          console.log('add to list', response);
          this.isNotiShown = true;
          setTimeout(() => {
            this.isNotiShown = false
          }, 2000)
        })
      
    }
  },
};
</script>

<style scoped>
.list {
  position: relative;
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
  background-color: rgb(54, 54, 54);
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
  height: 1.5rem;
  width: 1.5rem;
  background-color: rgba(82, 82, 82, 0.562);
  border-radius: 1rem;
  border: none;

  position: absolute;
  right: 0;
  top: 0.7rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: rgba(255, 203, 168, 0.562);
}

select {
  background-color: rgb(133, 84, 92);
}

.noti {
  position: absolute;
  top: 5rem;
  left: 5rem;
  background-color: rgba(192, 103, 155, 0.664);
}
</style>
