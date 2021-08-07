<template>
  <img
    v-if="album.images && album.images.length"
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
      if (this.album.tracks.items && this.album.tracks.items.length) {
        return this.album.tracks.items[0].preview_url;
      } else {
        return "";
      }
      
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
img {
  transition: all 0.2s ease-in-out;
  border: 3px solid rgba(206, 122, 168, 0);
}

img:hover {
  border: 3px solid rgb(206, 122, 168);
  transform: scale(1.07);
  cursor: pointer;
}
</style>
