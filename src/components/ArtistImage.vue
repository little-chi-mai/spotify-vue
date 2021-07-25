<template>
  <div>
    <img
      class="artist-image"
      :src="url"
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
        height: this.$attrs.size ? this.$attrs.size + "px" : 50 + "px",
      },
      track: {},
    };
  },
  props: ["topTracks"],
  computed: {
    url() {
      return this.$attrs.url;
    },
    artist() {
      return this.$attrs.artist;
    },
    artistId() {
      return this.artist.id;
    },
  },
  methods: {
    setArtistHovered() {
      this.$store.commit("setArtistHovered", this.artist);
      this.$store.commit("setImageHovered", this.artist.images[0].url);
      this.$store.commit("setArtistHoveredTopTrack", this.track);
      this.$store.commit("setIsMusicPlayed", true);
    },
    unsetArtistHovered() {
      this.$store.commit("setArtistHovered", {});

      this.$store.commit("setIsMusicPlayed", false);
    },
    showTrackAndArtistInfo() {
      this.$store.commit("setTrackClicked", this.track);
      this.$store.commit("setArtistIds", [this.artistId]);

    }
  },
  mounted() {
    // this.getArtistTopTracks();
  },
  watch: {
    // topTracks() {
    //   this.track = this.topTracks;
    // },
    // artist() {
    //   this.getArtistTopTracks();
    // }
  },
};
</script>

<style scoped>
.artist-image {
  height: 12rem;
  border-radius: 10rem;
}

.artist-image:hover {
  cursor: pointer;
}
</style>
