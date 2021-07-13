<template>
  <div v-if="Object.keys($store.state.trackHovered).length > 0">
    <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <p v-if="isMusicPlayed && !musicUrl">No music preview</p>
    <h3>{{ trackHovered.name }}</h3>
    <p>{{ trackHovered.artists[0].name }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      isMusicPlayed() {
        return this.$store.state.isMusicPlayed;
      },
      trackHovered() {
        return this.$store.state.trackHovered;
      },
      musicUrl() {
        return this.$store.state.trackHovered.preview_url;
      },
    }
  }
</script>

<style scoped>

.audio {
  display: none;
}

</style>