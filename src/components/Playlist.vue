<template>
  <div v-if="name">
    <h1>Playlist <span>{{ name }}</span></h1>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    tracks: Object,
    url: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
span {
  color: rgb(253, 255, 147);
}

</style>
