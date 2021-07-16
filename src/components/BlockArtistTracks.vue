<template>
  <div class="artist-tracks block" v-if="artistId">
    <div>
      <ArtistImage :size="250" :topTracks="topTracks" :url="artistImage" :artist="artistInfo" />

      <h2>{{ artistName }}</h2>
      <p>{{ genres }}</p>
      <p>With {{ followers }} followers on Spotify</p>

      <h3>TOP TRACKS</h3>
      <div>
        <span v-for="track in topTracks" :key="track.played_at">
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
    
    <SimilarArtists :artistId="artistId"/>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import TrackImage from "@/components/TrackImage";
import AlbumImage from "@/components/AlbumImage";
import SimilarArtists from "@/components/SimilarArtists";
import ArtistImage from "@/components/ArtistImage";

export default {
  props: ["artistId"],
  components: {
    TrackImage,
    AlbumImage,
    SimilarArtists,
    ArtistImage,
  },
  data() {
    return {
      artistInfo: {},
      topTracks: [],
      albums: [],
      suggestedArtists: [],
    };
  },
  methods: {
    getArtistInfo(artistId) {
      EventService.getArtistInfo(artistId).then((response) => {
        this.artistInfo = response.data;
      });
    },
    getArtistTopTracks(artistId) {
      EventService.getArtistTopTracks(artistId).then((response) => {
        this.topTracks = response.data;
      });
    },
    getArtistAlbums(artistId) {
      EventService.getArtistAlbums(artistId).then((response) => {
        let albumsArray = [];
        response.data.items.forEach((album) => {
          if (album.album_type === "album") {
            EventService.getAlbum(album.id).then((response) => {
              albumsArray.push(response.data);
            });
          }
        });
        this.albums = albumsArray;
      });
    },
  },
  mounted() {
    this.getArtistInfo(this.artistId);
    this.getArtistTopTracks(this.artistId);
    this.getArtistAlbums(this.artistId);
    // this.getSimilarArtirsts(this.artistId)
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
  display: flex;
  align-items: flex-start;
}

* {
  color: black;
}

.artist-image {
  height: 12rem;
  border-radius: 10rem;
}
</style>
