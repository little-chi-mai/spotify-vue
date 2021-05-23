<template>
  <div>
    <h1>Recent played tracks coming soon</h1>
    <button @click="getTracks">Get recent tracks</button>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  methods: {
    getTracks() {
      EventService.getRecentPlayedTracks()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
        console.log("There was an error:" + error.response);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
