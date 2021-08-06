<template>
  <div v-if="Object.keys(album).length">
    <h2>{{album.name}}</h2>
    <p>New Album by <strong>{{artistsName}}</strong></p>
    <p>Released on {{date}}, total {{totalTracks}} tracks</p>
    <h4>Click to discover more about this album</h4>
  </div>
</template>

<script>
  export default {
    computed: {
      album() {
        return this.$store.state.newReleaseHovered;
      },
      artistsName() {
        let artistArray = [];
        this.album.artists && this.album.artists.map(artist => artistArray.push(artist.name));
        return artistArray.join(' & ');
      },
      date() {
        return this.album.release_date;
      },
      totalTracks() {
        return this.album.total_tracks;
      }
    }
  }
</script>

<style scoped>

</style>