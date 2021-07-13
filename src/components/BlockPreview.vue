<template>
  <div
    class="track-preview"
    v-if="Object.keys(this.$store.state.trackHovered).length !== 0 || Object.keys(this.$store.state.albumHovered).length !== 0"
  >
    <img :src="imageUrl" alt="" />

    <div v-if="Object.keys(this.$store.state.trackHovered).length !== 0">
      <TrackPreview />
    </div>
    
    <div v-if="Object.keys(this.$store.state.albumHovered).length !== 0">
      <AlbumPreview />
    </div>
  </div>
</template>

<script>
import TrackPreview from "@/components/TrackPreview";
import AlbumPreview from "@/components/AlbumPreview";
export default {
  components: {
    TrackPreview,
    AlbumPreview
  },
  computed: {
    imageUrl() {
      return this.$store.state.imageHovered;
    },
  },
};
</script>

<style scoped>

.track-preview {
  position: fixed;
  top: 10rem;
  right: 10rem;
  background-color: rgba(66, 66, 66, 0.26);
}

img {
  height: 20rem;
}
</style>
