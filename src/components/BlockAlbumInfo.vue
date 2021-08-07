<template>
  <div v-if="Object.keys(album).length !== 0" class="album block">
    <AlbumImage :scrollToEnd="scrollToEnd" :album="album" :size="270" />
    <h2>{{ album.name }}</h2>
    <p>Released {{ album.release_date }}</p>
    <p>{{ album.type }} by {{ artistNames.join(" & ") }}</p>
    <p>Total tracks: {{ album.total_tracks }}</p>

    <div>
      <span v-for="track in album.tracks.items" :key="track.id">
        <TrackImage
          :track="track"
          :image="album.images[0].url"
          :album="album"
          :scrollToEnd="scrollToEnd"
        />
      </span>
    </div>
  </div>
</template>

<script>
import AlbumImage from "@/components/AlbumImage";
import TrackImage from "@/components/TrackImage";

export default {
  components: {
    AlbumImage,
    TrackImage,
  },
  props: ["scrollToEnd"],
  computed: {
    album() {
      return this.$store.state.albumClicked;
    },
    artistNames() {
      const artists = [];
      this.album.artists &&
        this.album.artists.map((artist) => {
          artists.push(artist.name);
        });
      return artists;
    },
  },
};
</script>

<style scoped>
.album {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.album > * {
  color: black;
}
</style>
