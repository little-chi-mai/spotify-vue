<template>
  <div>
    <h1>Recent played tracks</h1>
    <button @click="getTracks">Get recent tracks</button>
    <div class="recent-tracks">
      <span v-for="track in tracks" :key="track.played_at">
        <TrackImage :track="track.track" />
      </span>
      <!-- @click="getArtistTracks(track.track.artists[0].id)" -->
    </div>

    <BlockPreview />

    <BlockTrackInfo />

    <div v-for="artistId in artistIds" :key="artistId">
      <BlockArtistTracks :artistId="artistId" />
    </div>

    <BlockAlbumInfo />

    <!-- <div v-for="arrays in artistTracks" :key="artistTracks.indexOf(arrays)">
      <span v-for="track in arrays" :key="track.disc_number * Math.random()">
        <TrackImage :track="track" />
      </span>
    </div> -->
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import BlockPreview from "@/components/BlockPreview";
import TrackImage from "@/components/TrackImage";
import BlockTrackInfo from "@/components/BlockTrackInfo";
import BlockArtistTracks from "@/components/BlockArtistTracks";
import BlockAlbumInfo from "@/components/BlockAlbumInfo";

export default {
  components: {
    BlockPreview,
    TrackImage,
    BlockTrackInfo,
    BlockArtistTracks,
    BlockAlbumInfo,
  },
  data() {
    return {
      tracks: [],
      images: [],
      artistTracks: [],
    };
  },
  methods: {
    getTracks() {
      EventService.getRecentPlayedTracks()
        .then((response) => {
          console.log(response.data);
          this.tracks = response.data;
          this.getImages();
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    getImages() {
      this.tracks.map((trackInfo) => {
        let imageUrl = trackInfo.track.album.images[2].url;

        this.images.push(imageUrl);
      });
    },
    getArtistTracks(id) {
      EventService.getArtistTracks(id)
        .then((response) => {
          console.log(response.data);
          this.artistTracks = [...this.artistTracks, ...[response.data]];
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
  },
  computed: {
    artistIds() {
      return this.$store.state.artistIds;
    },
  },
};
</script>

<style scoped>
.recent-tracks {
  background-color: white;
  margin-bottom: 1rem;
}
</style>
