<template>
  <div class="artist-tracks" v-if="artistId">
    <img class="artist-image" :src="artistImage" alt="" />
    <h2>{{ artistName }}</h2>
    <p>{{ genres }}</p>
    <p>With {{ followers }} followers on Spotify</p>
    <h3>TOP TRACKS</h3>
    <div>
      <span v-for="track in tracks" :key="track.played_at">
        <TrackImage :track="track" />
      </span>
    </div>

    <h3>ALBUMS</h3>
    <div>
      <span v-for="album in albums" :key="album.id">
        <AlbumImage :album="album" />
      </span>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import TrackImage from "@/components/TrackImage";
import AlbumImage from "@/components/AlbumImage";

export default {
  props: ["artistId"],
  components: {
    TrackImage,
    AlbumImage,
  },
  data() {
    return {
      artistInfo: {},
      tracks: [],
      albums: [],
    };
  },
  methods: {
    getArtistInfo(artistId) {
      EventService.getArtistInfo(artistId).then((response) => {
        console.log(response);
        console.log("getArtistInfo");
        this.artistInfo = response.data;
      });
    },
    getArtistTracks(artistId) {
      EventService.getArtistTracks(artistId).then((response) => {
        console.log("GET ARTIST TRACKS", response);
        this.tracks = response.data;
      });
    },
    getArtistAlbums(artistId) {
      EventService.getArtistAlbums(artistId).then((response) => {
        console.log("GET ARTIST ALBUMS", response);
        let albumsArray = [];
        response.data.items.forEach((album) => {
          if (album.album_type === "album") {
            
            EventService.getAlbum(album.id).then((response) => {
              // console.log("GET ALBUM", response);
              albumsArray.push(response.data);
              // this.$store.commit("setAlbumClicked", response.data);
            });
          }
        });
        this.albums = albumsArray;
      });
    },
    getAlbum() {
      
    },
  },
  mounted() {
    this.getArtistInfo(this.artistId);
    this.getArtistTracks(this.artistId);
    this.getArtistAlbums(this.artistId);
  },
  watch: {
    artistId(val, oldval) {
      console.log("CHANGEEE", oldval);
      this.getArtistInfo(val);
    },
  },
  computed: {
    artistImage() {
      return Object.keys(this.artistInfo).length !== 0
        ? this.artistInfo.images[0].url
        : "";
    },
    artistName() {
      return this.artistInfo.name;
    },
    genres() {
      return Object.keys(this.artistInfo).length !== 0
        ? this.artistInfo.genres.join(", ")
        : "";
    },
    followers() {
      return Object.keys(this.artistInfo).length !== 0
        ? this.artistInfo.followers.total
        : "";
    },

  },
};
</script>

<style scoped>
.artist-tracks {
  background-color: white;
  margin-top: 1rem;
  padding: 1rem;
}

* {
  color: black;
}

.artist-image {
  height: 12rem;
  border-radius: 10rem;
}
</style>
