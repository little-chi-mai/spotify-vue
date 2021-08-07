<template>
  <div class="artist-tracks block" v-if="artistId">
    <div>
      <ArtistImage 
        :size="250" 
        :topTracks="topTracks" 
        :url="artistImage" 
        :artist="artistInfo" 
        :main="true"
      />

      <h2>{{ artistName }}</h2>
      <p>{{ genres }}</p>
      <p>With {{ followers }} followers on Spotify</p>

      <h3 v-if="topTracks.length">TOP TRACKS</h3>
      <div>
        <span v-for="track in topTracks" :key="track.played_at">
          <TrackImage :scrollToEnd="scrollToEnd" :track="track" />
        </span>
      </div>

      <h3 v-if="albums.length">ALBUMS</h3>
      <div>
        <span v-for="album in albums" :key="album.id">
          <AlbumImage :scrollToEnd="scrollToEnd" :album="album" />
        </span>
      </div>
    </div>
    
    <SimilarArtists :artistId="artistId" :similarArtists="similarArtists"/>
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
      similarArtists: []
    };
  },
  props: ["artistId", "scrollToEnd"],
  computed: {
    artistImage() {
      if (Object.keys(this.artistInfo).length && this.artistInfo.images.length) {  
        return this.artistInfo.images[0].url;
      } else {
        return "";
      }
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
        console.log("getArtistInfo", response.data);
        this.artistInfo = response.data.artistInfo;
        this.topTracks = response.data.artistInfo.topTracks;
        this.similarArtists = response.data.relatedArtists;
        console.log(response.data);
      });
    },
    getArtistAlbums() {
      EventService.getArtistAlbums(this.artistId).then((response) => {
        // let albumsArray = [];
        // response.data.items.forEach((album) => {
        //   if (album.album_type === "album") {
        //     EventService.getAlbum(album.id).then((response) => {
        //       albumsArray.push(response.data);
        //     });
        //   }
        // });
        console.log("getArtistAlbums", response.data);
        this.albums = response.data;
      });
    },
  },
  mounted() {
    if (this.artistId) {
      this.getArtistInfo();
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
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

* {
  color: black;
}

.artist-image {
  height: 12rem;
  border-radius: 10rem;
}
</style>
