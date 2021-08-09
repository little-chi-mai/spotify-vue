<template>
  <div v-if="Object.keys(artistHovered).length > 0">
    <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>

    <div v-if="isMusicPlayed">
      <p>{{ topTrack && topTrack.name }}</p>
      <h5>{{ trackArtists }}</h5>

      <h5>First track in the album:</h5>
      <p>{{ album && album.name}}</p>

    </div>

    <div v-else>
      <p>Click to discover more songs from</p>
    </div>

    <h3>{{ artistHovered && artistHovered.name }}</h3>
  </div>
</template>

<script>
export default {
  computed: {
    artistHovered() {
      return this.$store.state.artistHovered;
    },
    isMusicPlayed() {
      return this.$store.state.isMusicPlayed;
    },
    topTrack() {
      return this.$store.state.artistHoveredTopTrack;
    },
    trackArtists() {
      return (
        this.topTrack.artists &&
        this.topTrack.artists.map((artist) => artist.name).join(" & ")
      );
    },
    musicUrl() {
      return this.topTrack && this.topTrack.preview_url;
    },
    album() {
      return this.topTrack && this.topTrack.album;
    },
  },
};
</script>

<style scoped>
.audio {
  display: none;
}
</style>
