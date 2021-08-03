<template>
  <div class="block wrapper" v-if="Object.keys(track).length !== 0">
    <TrackImage :track="track" :size="200" />
    <div class="info">
      <h2>{{ name }}</h2>
      <p>From album {{ album }}</p>
      <p>By {{ artists.join(" & ") }}</p>
    </div>
    <button @click="addToSavedTracks">+ Add to your liked songs</button>
  </div>
</template>

<script>
import TrackImage from "@/components/TrackImage";
import EventService from "@/services/EventService";

export default {
  components: {
    TrackImage,
  },
  computed: {
    track: {
      get() {
        return this.$store.state.trackClicked;
      },
      set() {
        this.$store.commit("setTrackClicked", this.track);
      },
    },
    name() {
      return this.track.name;
    },
    album() {
      return this.track.album && this.track.album.name;
    },
    // trackImage() {
    //   return this.track.album && this.track.album.images[0].url;
    // },
    artists() {
      const names = [];
      this.track.artists.map((artist) => {
        names.push(artist.name);
      });
      return names;
    },
    // artistImages() {
    //   const images = [];
    //   this.track.artists.map((artist) => {
    //     images.push(artist.images[0].url);
    //   });
    //   return images;
    // },
  },
  // watch: {
  //   "$store.state.trackClicked"() {
  //     this.track = this.$store.state.trackClicked;
  //   },
  // },
  methods: {
    addToSavedTracks() {
      console.log("CLICKED");
      EventService.addToSavedTracks(this.track.id).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: rgb(255, 255, 255);
  display: flex;
  padding: 1rem;
}

.info {
  text-align: left;
  padding-left: 2rem;
}

.info > * {
  color: black;
}

img {
  height: 15rem;
}

button {
  height: 2rem;
  color: brown;
}
</style>
