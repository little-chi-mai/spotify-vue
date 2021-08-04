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
        height: this.$attrs.size ? this.$attrs.size + "px" : 50 + "px",
      },
    };
  },
  props: ["topTracks", "main"],
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
    track() {
      return this.topTracks ? this.topTracks[0] : {}
    },
  },
  methods: {
    setArtistHovered() {
      this.$store.commit("setArtistHovered", this.artist);
      this.artist.images.length && this.$store.commit("setImageHovered", this.artist.images[0].url);
      if (this.main) {
        this.$store.commit("setArtistHoveredTopTrack", this.track);
        this.$store.commit("setIsMusicPlayed", true);
      }
    },
    unsetArtistHovered() {
      this.$store.commit("setArtistHovered", {});
      this.$store.commit("setIsMusicPlayed", false);
      this.$store.commit("setArtistHoveredTopTrack", {});
    },
    showTrackAndArtistInfo() {
      this.$store.commit("setTrackClicked", this.track);
      this.$store.commit("setArtistIds", [this.artistId]);
      !this.main && this.$store.commit("setAlbumClicked", {})
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
