<template>
  <div class="similar-artists">
    <h3>Related Artists</h3>
    <div v-if="similarArtists.length === 0">
      <p>No Related Artists on Spotify</p>
    </div>
    <div v-else class="artists">
      <div v-for="artist in similarArtists" :key="artist.id">
        <ArtistImage :artist="artist" />
      </div>
    </div>
  </div>
</template>

<script>
import ArtistImage from "@/components/ArtistImage";

export default {
  components: {
    ArtistImage,
  },
  props: ["artistId", "similarArtists"],
};
</script>

<style scoped>
.similar-artists {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.similar-artists > h3 {
  color: rgb(94, 94, 94);
}

.similar-artists > div {
  margin: 0;
}

.artists {
  display: flex;
  width: 8rem;
  flex-wrap: wrap;
  justify-content: center;
}

p {
  color: rgb(75, 75, 75);
}
</style>
