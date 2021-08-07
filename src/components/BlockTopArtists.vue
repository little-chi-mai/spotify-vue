<template>
  <div class="block recent-tracks" v-if="topArtists.length">
    <h3>YOUR TOP ARTISTS</h3>
    <div class="top-artist" v-for="artist in topArtists" :key="artist.id">
      <ArtistImage :artist="artist" :topTracks="artist.topTracks" :size="100"/>
    </div>
  </div>
</template>

<script>
import ArtistImage from "@/components/ArtistImage";

export default {
  components: {
    ArtistImage,
  },
  computed: {
    topArtists() {
      return this.$store.state.userTopArtists;
    },
  },
};
</script>

<style scoped>
.block > h3 {
  color: rgb(39, 39, 39);
}

.top-artist {
  display: inline-block;
  margin-right: 4px;
}

.recent-tracks {
  margin-bottom: 1rem;
}

.recent-tracks > h3 {
  color: rgb(43, 43, 43);
  text-transform: uppercase;
}
</style>
