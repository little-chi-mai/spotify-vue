<template>
  <div class="image-track">
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
    <div v-if="isNotiShown" class="noti">
      <p>Added to Saved Tracks!</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      styleObj: {
        height: this.size ? this.size + "px" : 70 + "px",
      },
      isNotiShown: false,
    };
  },
  props: ["track", "image", "album", "size", "scrollToEnd"],
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
      this.scrollToEnd && this.scrollToEnd();
      let trackClicked = this.track.album
        ? this.track
        : { ...this.track, album: { ...this.album } };

      // update saved track counter
      this.$store.commit("setSavedTracks", trackClicked);
      this.$store.commit("setTrackClicked", trackClicked);

      this.isNotiShown = true;
      setTimeout(() => {
        this.isNotiShown = false;
      }, 2500);
      const artistIds = [];
      this.track.artists.forEach((artist) => {
        artistIds.push(artist.id);
      });
      this.$store.commit("setArtistIds", artistIds);
    },
  },
  watch: {
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
  cursor: pointer;
}

.image-track {
  display: inline-block;
  /* position: relative; */
}

.noti {
  position: fixed;
  top: 85vh;
  left: 65vw;
  background-color: rgba(77, 134, 72, 0.877);
  padding: 1rem;
  z-index: 10;
  width: 20rem;
}
</style>
