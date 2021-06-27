<template>
  <div class="container">
    <div class="home" v-if="!isLoggedIn">
      <h1>Discover your Spotify</h1>
      <p>Your interface for music discovery, powered by Spotify.</p>
      <Introduction />
      <div class="btn-wrapper">
        <a href="http://localhost:3030/api/login">
          <button class="login-btn">Log in with Spotify</button>
        </a>
      </div>

      <video autoplay loop controls width="90%">
        <source
          src="https://discoverquickly.com/static/media/dq-promo.8d999945.m4v"
        />
      </video>
    </div>

    <LoggedIn v-if="isLoggedIn" :userPlaylists="userPlaylists" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoggedIn from "@/components/LoggedIn";
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
      // isLoggedIn: false,
      userInfo: {},
      userPlaylists: {},
    };
  },
  mounted() {
    console.log("this.$store.state.userInfo", this.$store.state.userInfo);
    console.log("userInfo", this.userInfo);
    this.userInfo = this.$store.state.userInfo;
    this.isLoggedIn = this.$store.state.isLoggedIn;
    EventService.getUserInfo()
      .then((response) => {
        // this.events = response.data;
        console.log(response.data);
        this.userInfo = response.data.userInfo;
        this.userPlaylists = response.data.userPlaylists;
        console.log("TRYING TO setuserinfo");
        this.setUserInfo();
        // this.$store.state.commit("userInfo", response.data.userInfo);
        console.log("TRYING TO COMMIT");
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
  created() {
    console.log(this.$route.params.code);
  },
  computed: {
    isLoggedIn: function () {
      return Object.keys(this.userInfo).length !== 0;
    },
  },
  watch: {
    // userInfo(newInfo) {
    //   console.log("userInfo has changed");
    //   this.userInfo = newInfo;
    //   this.isLoggedIn = true;
    //   console.log("this.$store.state.userInfo", this.$store.state.userInfo);
    // },
  },
  methods: {
    setUserInfo() {
      this.$store.commit("setUserInfo", this.userInfo);
      console.log("this.$store.state.userInfo", this.$store.state.userInfo);
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
