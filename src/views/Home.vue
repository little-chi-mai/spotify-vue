<template>
  <div class="container">
    <div class="home">
      <h1>Discover your Spotify</h1>
      <p>Your interface for music discovery, powered by Spotify.</p>
      <div v-show="isLoggedIn" class="welcome">
        <h2>Welcome back, {{ userInfo.display_name }}!</h2>
        <router-link class="btn-wrapper" to="/discovery">
          <div class="btn btn-discovery">Let's discover</div>
        </router-link>
      </div>

      <Introduction />
      <div v-if="!isLoggedIn" class="btn-wrapper">
        <a :href="loginUrl">
          <button class="login-btn">Log in with Spotify</button>
        </a>
      </div>

      <video autoplay loop controls width="60%" ref="videoRef" muted="muted">
        <source
          src="https://res.cloudinary.com/mai-boo/video/upload/v1628063243/Screen_Recording_2021-08-04_at_5.41.16_pm_yap88a.mov#t=3"
        />
      </video>
    </div>

  </div>
</template>

<script>
import Introduction from "@/components/Introduction";

export default {
  components: {
    Introduction,
  },
  data() {
    return {
      name: "",
      loginUrl: "/api/login",
    };
  },
  mounted() {
    this.$store.commit("setUserInfo");
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    setUserInfo() {
      this.$store.commit("setUserInfo");
    },
  },
};
</script>

<style scoped>

video {
  border: solid rgba(255, 201, 195, 0.267) 5px;
  border-radius: 1.5rem;
  margin: 1.5rem;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-btn {
  background-color: rgb(255, 134, 156);
  width: 10rem;
  height: 3rem;
  border-radius: 3rem;
  margin-top: 0.5rem;
}

.btn-wrapper {
  margin-bottom: 1rem;
  text-decoration: none;
}

.btn-discovery {
  padding: 0.8rem;
  margin-bottom: 1rem;
  text-decoration: none;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome > h2 {
  color: rgb(255, 233, 109);
}
</style>
