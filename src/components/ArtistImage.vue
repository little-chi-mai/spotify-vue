<template>
  <div>
    <img
      class="artist-image"
      v-if="url"
      :src="url"
      alt=""
      :style="styleObj"
      @mouseover="setArtistHovered"
      @mouseleave="unsetArtistHovered"
      @click="showTrackAndArtistInfo"
    />
    <img
      class="artist-image"
      v-else
      src="../assets/artist.jpg"
      alt=""
      :style="styleObj"
      @mouseover="setArtistHovered"
      @mouseleave="unsetArtistHovered"
      @click="showTrackAndArtistInfo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleObj: {
        height: this.size ? this.size + "px" : 50 + "px",
      },
    };
  },
  props: ["topTracks", "main", "artist", "size"],
  computed: {
    artistId() {
      return this.artist.id;
    },
    track() {
      return this.topTracks ? this.topTracks[0] : {}
    },
    url() {
      return this.artist.images && this.artist.images.length && this.artist.images[0].url
    }
  },
  methods: {
    setArtistHovered() {
      this.$store.commit("setArtistHovered", this.artist);
      this.artist.images.length && this.$store.commit("setImageHovered", this.artist.images[0].url);
      // if (this.main) {
        this.$store.commit("setArtistHoveredTopTrack", this.track);
        this.$store.commit("setIsMusicPlayed", true);
      // }
    },
    unsetArtistHovered() {
      this.$store.commit("setArtistHovered", {});
      this.$store.commit("setIsMusicPlayed", false);
      this.$store.commit("setArtistHoveredTopTrack", {});
    },
    showTrackAndArtistInfo() {
      this.$store.commit("setTrackClicked", this.track);
      this.$store.commit("setArtistIds", [this.artistId]);
      // !this.main && this.$store.commit("setAlbumClicked", {})
    }
  },
};
</script>

<style scoped>
.artist-image {
  height: 12rem;
  border-radius: 10rem;
  transition: all 0.1s ease-in-out;
}

.artist-image:hover {
  border: 3px solid rgb(206, 122, 168);
  /* transform: scale(1.07); */
  cursor: pointer;
}
</style>
