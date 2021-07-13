<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
// import { response } from "express";

export default {
  mounted() {
    EventService.logout().then(() => {
      // this.$store.state.userInfo = {};
      this.$store.commit("setUserInfo", {});
      this.$store.commit("setIsLoggedIn", false);
      this.$router.push("/");
    });
  },
};
</script>

<style lang="scss" scoped></style>
