<template>
  <div v-if="Object.keys(albumHovered).length > 0">
    <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <p v-if="isMusicPlayed && !musicUrl">No music preview</p>
    <p>{{trackName}}</p>
    <h4>{{artistsTrack.join(' & ')}}</h4>
    <h5>First track in album</h5>
    <h3>{{ albumHovered.name }}</h3>
    <p>by {{ artistsAlbum.join(' & ')}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    isMusicPlayed() {
      return this.$store.state.isMusicPlayed;
    },
    albumHovered() {
      return this.$store.state.albumHovered;
    },
    musicUrl() {
      return this.$store.state.albumHovered.tracks.items[0].preview_url;
    },
    imageUrl() {
      return this.$store.state.imageHovered;
    },
    artistsAlbum() {
      let artists = [];
      artists = this.albumHovered.artists.map((artist) => {
        return artist.name
      });
      return artists;
    },
    artistsTrack() {
      let artists = [];
      artists = this.albumHovered.tracks.items[0].artists.map((artist) => {
        return artist.name
      });
      return artists;
    },
    trackName() {
      return this.albumHovered.tracks.items[0].name
    }
  },
};
</script>

<style scoped>
.audio {
  display: none;
}

img {
  height: 20rem;
}

</style>
