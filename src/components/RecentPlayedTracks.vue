<template>
  <div>
    <h1>Recent played tracks</h1>
    <button @click="getTracks">Get recent tracks</button>
    <div>
      <span v-for="track in tracks" :key="track.played_at">
        <img
          class="image"
          :src="track.track.album.images[2].url"
          alt=""
          @click="getArtistTracks(track.track.artists[0].id)"
        />
      </span>
    </div>

    <div v-for="arrays in artistTracks" :key="artistTracks.indexOf(arrays)">
      <span v-for="track in arrays" :key="track.disc_number * Math.random()">
        <img
          class="image"
          :src="track.album.images[2].url"
          alt=""
          @click="getArtistTracks(track.artists[0].id)"
        />
      </span>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
// import { response } from "express";

export default {
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
        console.log(imageUrl);
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
};
</script>

<style scoped>
.image {
  display: inline-block !important;
}
</style>
