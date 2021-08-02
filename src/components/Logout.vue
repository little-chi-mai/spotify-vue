<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  mounted() {
    EventService.logout().then(() => {
      this.$store.commit("setUserInfo", {});
      this.$router.push("/");
    });
  },
};
</script>

<style lang="scss" scoped></style>
