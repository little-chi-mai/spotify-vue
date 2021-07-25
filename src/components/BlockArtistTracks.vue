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
  props: ["artistId"],
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
  methods: {
    getArtistInfo() {
      EventService.getArtistInfo(this.artistId).then((response) => {
        this.artistInfo = response.data;
        console.log('getArtistInfo', this.artistInfo);
      });
    },
    getArtistTopTracks() {
      EventService.getArtistTopTracks(this.artistId).then((response) => {
        this.topTracks = response.data;
        console.log('getArtistTopTracks', this.topTracks);
      });
    },
    getArtistAlbums() {
      EventService.getArtistAlbums(this.artistId).then((response) => {
        let albumsArray = [];
        response.data.items.forEach((album) => {
          if (album.album_type === "album") {
            EventService.getAlbum(album.id).then((response) => {
              albumsArray.push(response.data);
            });
          }
        });
        this.albums = albumsArray;
        console.log('getArtistAlbums', this.albums);
      });
    },
  },
  mounted() {
    if (this.artistId) {
      console.log("MOUNTED AND HAVE ARTIST ID", this.artistId);
      this.getArtistInfo();
      this.getArtistTopTracks();
      this.getArtistAlbums();
    }
  },
  // watch: {
  //   artistId(val, oldval) {
  //     console.log("CHANGEEE", oldval);
  //     this.getArtistInfo();
  //     this.getArtistTopTracks();
  //     this.getArtistAlbums();
  //   },
  // },
  
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
