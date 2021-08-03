<template>
  <div v-if="Object.keys(artistHovered).length > 0">
    <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <!-- <p v-if="isMusicPlayed && !musicUrl">No music preview</p> -->
    <p>{{topTrack.name}}</p>
    <h5>{{trackArtists}}</h5>
    <p>Click to discover more songs from</p>
    <h3>{{ artistHovered.name }}</h3>
    <!-- <p>{{ artistsAlbum.join(' & ')}}</p>
    <h5>First track in the album: </h5>
    <p>{{trackName}}</p>
    <p>{{artistsTrack.join(' & ')}}</p> -->
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
      return this.topTrack.artists && this.topTrack.artists.map(artist => artist.name).join(' & ');
    },
    musicUrl() {
      return this.topTrack.preview_url;
    },
  },
};
</script>

<style scoped>
.audio {
  display: none;
}
</style>
