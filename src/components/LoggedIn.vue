<template>
  <div>
    <h1>Welcome to Vue Spotify</h1>
    <p>Display name: {{ user.display_name }}</p>
    <p>Email: {{ user.email }}</p>
    <img v-if="user.images" :src="user.images[0].url" alt="" />
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  data() {
    return {
      user: {},
      // image: this.user.images[0].url
    };
  },
  created() {
    EventService.getUserInfo()
      .then((response) => {
        // this.events = response.data;
        console.log(response.data);
        this.user = response.data;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped></style>
