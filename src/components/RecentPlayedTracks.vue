<template>
  <div class="recent-played">
    <button @click="getRecentTracks" class="btn">Your recent tracks</button>
    <button @click="getTopTracks" class="btn">Your top tracks</button>
    <button @click="getUserSavedTracks" class="btn">Your library</button>
    <div v-if="recentTracks" class="recent-tracks block">
      <span v-for="track in recentTracks" :key="track.played_at">
        <TrackImage :track="track.track" />
      </span>
    </div>

    <div v-if="topTracks" class="recent-tracks block">
      <span v-for="track in topTracks" :key="track.id">
        <TrackImage :track="track" />
      </span>
    </div>

    <div v-if="savedTracks" class="recent-tracks block">
      <span v-for="track in savedTracks" :key="track.track.id">
        <TrackImage :track="track.track" />
      </span>
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
      recentTracks: [],
      topTracks: [],
      savedTracks: [],
      images: [],
      // chosenButton:
    };
  },
  methods: {
    getRecentTracks() {
      EventService.getRecentPlayedTracks()
        .then((response) => {
          this.recentTracks = response.data;
          this.getImages();
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    getTopTracks() {
      EventService.getUserTopTracks()
        .then((response) => {
          this.topTracks = response.data;
          console.log("getUserTopTracks", response.data);
          this.getImages();
        })
        .catch((error) => {
          console.log("There was an error:" + error.response);
        });
    },
    getUserSavedTracks() {
      EventService.getUserSavedTracks().then((response) => {
        console.log("GET Saved tracks", response.data);
        this.savedTracks = response.data.items;
      });
    },
    getImages() {
      this.recentTracks.map((trackInfo) => {
        let imageUrl = trackInfo.track.album.images[2].url;

        this.images.push(imageUrl);
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
