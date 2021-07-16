<template>
  <div v-if="Object.keys(albumHovered).length > 0">
    <audio v-if="isMusicPlayed && musicUrl" controls autoplay class="audio">
      <source :src="musicUrl" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <p v-if="isMusicPlayed && !musicUrl">No music preview</p>
    <h3>{{ albumHovered.name }}</h3>
    <p>{{ artistsAlbum.join(' & ')}}</p>
    <h5>First track in the album: </h5>
    <p>{{trackName}}</p>
    <p>{{artistsTrack.join(' & ')}}</p>
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

.album-preview {
  position: fixed;
  top: 10rem;
  right: 10rem;
  background-color: rgba(66, 66, 66, 0.26);
}
</style>
