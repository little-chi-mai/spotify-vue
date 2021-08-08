<template>
  <div v-if="playlist.name">
    <h3>{{ playlist.name }}</h3>
    <img
      class="playlist"
      v-if="playlist.images && playlist.images.length"
      :src="playlist.images[0].url"
      alt=""
    />

    <img class="playlist" v-else src="../assets/album.png" alt="" />
  </div>
</template>

<script>

export default {
  props: ["playlist"] 
};
</script>

<style scoped>
.playlist {
  height: 10rem;
}

h1 {
  margin-bottom: 2rem;
}

</style>
