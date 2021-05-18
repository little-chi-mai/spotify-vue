<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>User {{ $route.query.code }}</div>
    <UserInfo :accessToken="accessToken" />
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import EventService from "@/services/EventService";

export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      accessToken: this.$route.query.code,
    };
  },
  created() {
    console.log(this.$route.query);
    EventService.getAccessToken().then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
</script>

<style lang="scss" scoped></style>
