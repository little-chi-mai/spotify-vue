<template>
  <div>
    <p>Logging out...</p>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  mounted() {
    EventService.logout().then(() => {
      this.$store.commit("logout");
      this.$router.push("/");
    });
  },
};
</script>

<style lang="scss" scoped></style>
