<template>
  <div v-if="name">
    <h1>Playlist name: {{ name }}</h1>
    <!-- <a :href="url" target="_blank"
      >Click to listen to this playlist on Spotify</a
    > -->
    <!-- <div v-for="item in tracks.items" :key="item.track.id">
      <p>{{ item.track.name }}</p>
      <a :href="item.track.external_urls.spotify" target="_blank">
        <img :src="item.track.album.images[2].url" @hover="playMusic" alt="" />
      </a>
      <audio controls>
        <source :src="item.track.preview_url" type="audio/mpeg" />

        Your browser does not support the audio element.
      </audio>
    </div> -->

    <!-- <p>{{ track.track.name }}</p> -->
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
  methods: {
    playMusic() {},
  },
};
</script>

<style lang="scss" scoped></style>
