<template>
  <div class="saved-track">
    <h3 class="saved-track-number" @click="showList">
      {{ savedTrackCounter }}
    </h3>

    <div v-if="isListShown">
      <div class="track" v-for="track in savedTracks" :key="track.id">
        <img :src="track.album.images[0].url" alt="" />
        <div class="track-info">
            <h4>{{ track.name }}</h4>
            <p class="artist-name">
              {{ trackArtists(track.artists) }}
            </p>
        </div>
        <button @click="removeTrack(track.id)">X</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isListShown: false,
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
  },
  methods: {
    showList() {
      this.isListShown = !this.isListShown;
    },
    trackArtists(array) {
      return array.map((artist) => artist.name).join(" & ");
    },
    removeTrack(trackId) {
      console.log("trying to remove");
      let newTracks = [];
      this.savedTracks.map(track => {
        if (track.id !== trackId) {
          newTracks.push(track);
        }
      })
      console.log('newTracks', newTracks);
      localStorage.savedTracks = JSON.stringify(newTracks);
      this.$store.commit("setSavedTracks");
    }
  },
};
</script>

<style scoped>
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

button {
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

button:hover {
  background-color: rgba(255, 203, 168, 0.562);
}
</style>
