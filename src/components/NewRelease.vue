<template>
  <div v-if="album.images && album.images.length" class="album">
    <img 
      @mouseover="onMouseover" 
      @mouseleave="onMouseleave" 
      @click="onClick"
      :src="album.images[0].url" alt=""
    >
  </div>
</template>

<script>
  import EventService from "@/services/EventService"
  export default {
    props:["album"],
    methods: {
      onMouseover() {
        this.$store.commit("setNewReleaseHovered", this.album)
        this.$store.commit("setImageHovered", this.album.images[0].url)
        
      },
      onMouseleave() {
        this.$store.commit("setNewReleaseHovered", {})
        this.$store.commit("setImageHovered", "")
      },
      onClick() {
        const albumId = this.album.id;
        console.log("CLICKED");
        console.log("ALBUMID", albumId);
        if (albumId === this.$store.state.albumClicked.id) return;
        EventService.getAlbum(albumId).then(response => {
          console.log("GET ALBUM", response.data);
          this.$store.commit("setAlbumClicked", response.data);
          // reset when users click different albums
          this.$store.commit("setArtistIds", []);
          this.$store.commit("setTrackClicked", {});
        })

        
      }
    }
  }
</script>

<style scoped>
.album {
  display: inline-block;
}

img {
  height: 70px;
  display: inline-block !important;
  transition: all 0.1s ease-in-out;
  border: 3px solid transparent;
}

img:hover {
  border: 3px solid rgb(206, 122, 168);
  transform: scale(1.07);
  cursor: pointer;
}

</style>