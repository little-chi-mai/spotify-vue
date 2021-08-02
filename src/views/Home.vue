<template>
  <div class="container">
    <div class="home" v-if="!isLoggedIn">
      <h1>Discover your Spotify</h1>
      <p>Your interface for music discovery, powered by Spotify.</p>
      <Introduction />
      <div class="btn-wrapper">
        <a :href="loginUrl">
          <button class="login-btn">Log in with Spotify</button>
        </a>
      </div>

      <video autoplay loop controls width="90%">
        <source
          src="https://discoverquickly.com/static/media/dq-promo.8d999945.m4v"
        />
      </video>
    </div>

    <LoggedIn v-else="" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoggedIn from "@/views/LoggedIn";
import EventService from "@/services/EventService";
import Introduction from "@/components/Introduction";

export default {
  components: {
    LoggedIn,
    Introduction,
  },
  data() {
    return {
      name: "",
      userInfo: {},
      loginUrl: process.env.VUE_APP_ROOT_SERVER + "/api/login",
    };
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo;
    EventService.getUserInfo()
      .then((response) => {
        console.log(response.data);
        this.userInfo = response.data.userInfo;
        this.setUserInfo();
      })
      .catch((error) => {
        console.log("There was an error at Home: " + error.response);
      });
  },
  created() {
    console.log(this.$route.params.code);
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    setUserInfo() {
      this.$store.commit("setUserInfo", this.userInfo);
    },
  },
};
</script>

<style scoped>
.login-btn {
  background-color: rgb(255, 134, 156);
  width: 10rem;
  height: 3rem;
  border-radius: 3rem;
}

.btn-wrapper {
  margin-bottom: 2rem;
}
</style>
