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
  props: ["album", "image", "scrollToEnd"],
  computed: {
    featuredTrack() {
      return this.album.tracks.items[0].preview_url;
    },
  },
  methods: {
    getAlbum() {
      this.scrollToEnd && this.scrollToEnd();
      EventService.getAlbum(this.album.id).then((response) => {
        this.$store.commit("setAlbumClicked", response.data);
      });
    },
    setAlbumHovered(album, isPlayed, imageUrl) {
      this.$store.dispatch("setAlbumHovered", {
        album: album,
        isMusicPlayed: isPlayed,
        imageUrl: imageUrl,
      });
    },
  },
};
</script>

<style scoped>
img:hover {
  cursor: pointer;
}
</style>
