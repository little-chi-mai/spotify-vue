<template>
  <div class="similar-artists">
    <h3>Related Artists</h3>
    <div v-for="artist in similarArtists" :key="artist.id">
      <ArtistImage :artist="artist" :url="artist.images[0].url" />
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import ArtistImage from "@/components/ArtistImage";

export default {
  data() {
    return {
      similarArtists: [],
    };
  },
  components: {
    ArtistImage,
  },
  props: ["artistId"],
  computed: {
    mainArtistId() {
      return this.artistId;
    },
  },
  methods: {
    getSimilarArtirsts(artistId) {
      EventService.getSimilarArtirsts(artistId).then((response) => {
        // console.log("getSimilarArtirsts", response.data);
        this.similarArtists = response.data.artists;
      });
    },
    getArtistTracks(artistId) {
      EventService.getArtistTracks(artistId).then((response) => {
        console.log("GET ARTIST TRACKS", response);
        this.topTracks = response.data;
      });
    },
  },
  mounted() {
    this.getSimilarArtirsts(this.mainArtistId);
  },
  watch: {
    artistId(newId) {
      this.getSimilarArtirsts(newId);
    },
  },
};
</script>

<style scoped>
.similar-artists {
  display: flex;
  flex-wrap: wrap;
  max-width: 7rem;
  margin: 0 1rem;
}
.similar-artists > h3 {
  color: rgb(94, 94, 94);
}
.similar-artists > div {
  margin: 0;
}
</style>
