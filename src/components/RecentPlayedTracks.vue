<template>
  <div class="recent-played">
    <button @click="getTracks" class="btn">Your recent tracks</button>
    <div class="recent-tracks block">
      <span v-for="track in tracks" :key="track.played_at">
        <TrackImage :track="track.track" />
      </span>
      <!-- @click="getArtistTopTracks(track.track.artists[0].id)" -->
    </div>

    <BlockPreview />

    <BlockTrackInfo />

    <div v-for="artistId in artistIds" :key="artistId">
      <BlockArtistTracks :artistId="artistId" />
    </div>

    <BlockAlbumInfo />

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
    getArtistTopTracks(id) {
      EventService.getArtistTopTracks(id)
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
.recent-played {
  padding: 2rem 0;
}
.recent-tracks {
  background-color: white;
  margin-bottom: 1rem;
  width: 60vw;
}

button {
  color: rgb(46, 46, 46);
  border-radius: 10px;
  margin: 2rem 0;
}

button:hover {
  color: whitesmoke;
  background-color: rgb(173, 88, 124);
  
}
</style>
