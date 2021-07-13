<template>
  <img
    v-if="album.images"
    :src="album.images[0].url"
    alt=""
    :style="styleObj"
    @click="getAlbum"
    @mouseover="setAlbumHovered(album, true, album.images[0].url)"
    @mouseleave="setAlbumHovered({}, false, '')"
  />
</template>

<script>
import EventService from "@/services/EventService";
export default {
  data() {
    return {
      styleObj: {
        height: this.$attrs.size ? this.$attrs.size + "px" : 70 + "px",
      },
    };
  },
  props: ["album", "image"],
  computed: {
    featuredTrack() {
      return this.album.tracks.items[0].preview_url;
    },
  },
  methods: {
    getAlbum() {
      EventService.getAlbum(this.album.id).then((response) => {
        // console.log("GET ALBUM", response);
        this.$store.commit("setAlbumClicked", response.data);
      });
    },
    setAlbumHovered(album, isPlayed, imageUrl) {
      // console.log(arguments);
      console.log("DISPATCHING", {
        album: album,
        isPlayed: isPlayed,
        imageUrl: imageUrl,
      });
      this.$store.dispatch("setAlbumHovered", {
        album: album,
        isMusicPlayed: isPlayed,
        imageUrl: imageUrl,
      });
    },
  },
  watch: {},
};
</script>

<style scoped>
/* img {
  height: 64px;
} */
</style>
