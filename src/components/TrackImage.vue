<template>
  <img
    v-if="image || track.album.images"
    class="image"
    :src="imageUrl"
    alt=""
    :style="styleObj"
    @click="showTrackAndArtistInfo"
    @mouseover="setTrackHovered"
    @mouseleave="unsetTrackHovered"
  />
</template>

<script>
// import EventService from "@/services/EventService";

export default {
  data() {
    return {
      styleObj: {
        height: this.$attrs.size ? this.$attrs.size + "px" : 70 + "px",
      },
    };
  },
  props: ["track", "image", "album"],
  computed: {
    imageUrl: {
      get() {
        return this.track.album ? this.track.album.images[0].url : this.image;
      },
      set(val) {
        this.imageUrl = val;
      },
    },
  },
  methods: {
    setTrackHovered() {
      this.unsetTrackHovered();
      this.$store.commit("setTrackHovered", this.track);
      this.$store.commit("setIsMusicPlayed", true);
      this.$store.commit("setImageHovered", this.imageUrl);
    },
    unsetTrackHovered() {
      this.$store.commit("setTrackHovered", {});
      this.$store.commit("setIsMusicPlayed", false);
      this.$store.commit("setImageHovered", "");
    },
    showTrackAndArtistInfo() {
      console.log("CLICKED");

      let trackClicked = this.track.album
        ? this.track
        : { ...this.track, album: { ...this.album } };
      let savedTracks = JSON.parse(localStorage.getItem("savedTracks"))
        ? JSON.parse(localStorage.getItem("savedTracks"))
        : [];
      this.pushUnique(savedTracks, trackClicked);

      localStorage.savedTracks = JSON.stringify(savedTracks);

      // update saved track counter
      this.$store.commit("setSavedTracks");

      this.$store.commit("setTrackClicked", trackClicked);
      const artistIds = [];
      this.track.artists.forEach((artist) => {
        artistIds.push(artist.id);
      });
      this.$store.commit("setArtistIds", artistIds);
      // EventService.getArtistTopTracks(this.track.artists[0].id).then(
      //   (response) => {
      //     console.log(response);
      //   }
      // );
    },
    pushUnique(savedTracks, trackClicked) {
      let isUnique = true;
      let newTrackArray = savedTracks;
      savedTracks.map((track) => {
        if (track.id === trackClicked.id) {
          isUnique = false;
        }
      });
      if (isUnique) {
        newTrackArray.push(trackClicked);
      }
      return newTrackArray;
    },
  },
  watch: {
    track(newTrack, oldVal) {
      // watch it
      console.log("Prop TRACK changed: ", newTrack, " | was: ", oldVal);
      // this.imageUrl = newTrack.album ? newTrack.album.images[0].url : this.$store.state.albumClicked.images[0].url;
    },
    album(newVal, oldVal) {
      // watch it
      console.log("Prop ALBUM changed: ", newVal, " | was: ", oldVal);
    },
  },
};
</script>

<style scoped>
.image {
  display: inline-block !important;
  transition: all 0.1s ease-in-out;
  border: 3px solid transparent;
}

.image:hover {
  border: 3px solid rgb(206, 122, 168);
  transform: scale(1.07);
}
</style>
