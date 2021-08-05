<template>
  <div class="block wrapper" v-if="Object.keys(track).length !== 0">
    <TrackImage :track="track" :size="200" :scrollToEnd="scrollToEnd" />
    <div class="info">
      <h2>{{ name }}</h2>
      <p>From album {{ album }}</p>
      <p>By {{ artists.join(" & ") }}</p>
    </div>
    <button @click="addToLikedTracks">+ Add to your Liked Songs</button>
    <div v-if="isNotiShown" class="noti" :class="{notiFail: notiFail}">
      <p>{{ notiMessage }}</p>
    </div>
  </div>
</template>

<script>
import TrackImage from "@/components/TrackImage";
import EventService from "@/services/EventService";

export default {
  data() {
    return {
      isNotiShown: false,
      notiMessage: "",
      notiFail: false,
    };
  },
  components: {
    TrackImage,
  },
  props: ["getUserLikedTracks", "scrollToEnd"],
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
    addToLikedTracks() {
      EventService.addToLikedTracks(this.track.id)
        .then((response) => {
          this.notiMessage = response.data.message;
          if (!response.data.added) this.notiFail = true;
          this.isNotiShown = true;
          setTimeout(() => {
            this.isNotiShown = false;
          }, 2500);
          this.$store.state.userLikedTracks.length && this.getUserLikedTracks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-start;
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
  min-height: 2rem;
  color: rgb(230, 230, 230);
  border-radius: 10px;
  padding: 0.5rem;
  background-color: rgb(129, 64, 86);
  border: none;
}

button:hover {
  background-color: rgb(165, 40, 82);
  cursor: pointer;
}

.noti {
  position: fixed;
  top: 85vh;
  left: 65vw;
  background-color: rgba(77, 134, 72, 0.877);
  padding: 1rem;
  z-index: 10;
  width: 20rem;
}

.notiFail {
  background-color: rgba(238, 186, 90, 0.877) !important;
}
</style>
