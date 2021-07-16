<template>
  <div
    class="track-preview"
    v-if="
      Object.keys(this.$store.state.trackHovered).length !== 0 ||
      Object.keys(this.$store.state.albumHovered).length !== 0
      ||
      Object.keys(this.$store.state.artistHovered).length !== 0
    "
  >
    <!-- <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <p v-if="isMusicPlayed && !musicUrl">No music preview</p> -->

    <img :src="imageUrl" alt="" />

    <!-- <div v-if="Object.keys(this.$store.state.trackHovered).length !== 0"> -->
      <TrackPreview />
    <!-- </div> -->

    <!-- <div v-if="Object.keys(this.$store.state.albumHovered).length !== 0"> -->
      <AlbumPreview />
    <!-- </div> -->

    <!-- <div v-if="Object.keys(this.$store.state.artistHovered).length !== 0"> -->
      <ArtistPreview />
    <!-- </div> -->
  </div>
</template>

<script>
import TrackPreview from "@/components/TrackPreview";
import AlbumPreview from "@/components/AlbumPreview";
import ArtistPreview from "@/components/ArtistPreview";

export default {
  components: {
    TrackPreview,
    AlbumPreview,
    ArtistPreview
  },
  computed: {
    imageUrl() {
      return this.$store.state.imageHovered;
    },
    // musicUrl() {
    //   return this.$store.state.musicUrl;
    // },
    // isMusicPlayed() {
    //   return this.$store.state.isMusicPlayed;
    // }
  },
};
</script>

<style scoped>
.track-preview {
  position: fixed;
  top: 10vh;
  left: 65vw;
  background-color: rgba(66, 66, 66, 0.26);
}

img {
  height: 20rem;
}
</style>
