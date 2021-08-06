<template>
  <div class="page">
    <h1>🥁 Vue Spotify 🎸</h1>
    <div class="user-info">
      <img v-if="userInfo.images" :src="userInfo.images[0].url" alt="" />
      <div class="user-info__account">
        <h2>{{ userInfo.display_name }}</h2>
        <p>{{ userInfo.email }}</p>
      </div>
    </div>
    <div
      v-show="isSafari"
      class="safari"
      @mouseover="onMouseOver"
      @mouseleave="videoShown = false"
    >
      <div class="reduce-icon">
        <img
          class="reduce-icon-1"
          @click="
            () => {
              reduce = !reduce;
              videoShown = false;
            }
          "
          v-show="reduce"
          src="../assets/reduce1.png"
          alt=""
        />
        <img
          class="reduce-icon-2"
          @click="
            () => {
              reduce = !reduce;
              videoShown = false;
            }
          "
          v-show="!reduce"
          src="../assets/expand1.png"
          alt=""
        />
      </div>
      <p class="safari-note" v-show="reduce">
        Safari is your current browser. Please enable
        <strong>"Auto-Play: Allow All Auto-Play"</strong> in your browser
        settings to have listen to music in the app.
      </p>
      <p v-show="reduce">Hover over this box to see how.</p>

      <video
        v-if="videoShown"
        autoplay
        loop
        controls
        ref="videoRef"
        muted="muted"
      >
        <source
          src="https://res.cloudinary.com/mai-boo/video/upload/v1628211157/Screen_Recording_2021-08-06_at_10.48.30_am_cdaxjv.mov"
        />
      </video>
    </div>
    <!-- <iframe class="player" src="https://open.spotify.com/embed/track/2BzDh1kitD9Zliv03YtKtL" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->
    <SavedTracks />
    <RecentPlayedTracks />
  </div>
</template>

<script>
import RecentPlayedTracks from "@/components/RecentPlayedTracks.vue";
import SavedTracks from "@/components/SavedTracks.vue";
import { detect } from "detect-browser";

export default {
  data() {
    return {
      isSafari: false,
      videoShown: false,
      reduce: true,
    };
  },
  components: {
    RecentPlayedTracks,
    SavedTracks,
  },
  computed: {
    // numberOfSavedTracks() {
    //   return JSON.parse(localStorage.getItem("savedTracks")).length;
    // },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.$store.commit("setUserInfo");
    this.detectBrowser();
  },
  methods: {
    detectBrowser() {
      const browser = detect();
      console.log(browser);
      console.log(browser.name);
      if (browser.name === "chrome") this.isSafari = true;
      return browser;
    },
    showVideo() {
      this.videoShown = true;
    },
    onMouseOver() {
      if (this.reduce) {
        this.videoShown = true;
      }
    },
  },
};
</script>

<style scoped>
/* .player {
  display: none;
} */

.page {
  position: relative;
  transition: all 0.2s ease-in-out;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-info > * {
  margin: 0;
}
.user-info__account > p,
.user-info__account > h2 {
  margin: 0;
  text-align: left;
}

.user-info > img {
  height: 60px;
  margin-right: 2rem;
}

.safari {
  position: absolute;
  top: 0;
  right: 2rem;
  border: double rgba(250, 128, 114, 0.445) 3px;
  border-radius: 1rem;
  padding: 0.8rem;
  max-width: 32vw;
  transition: all 0.2s ease-in-out;
  z-index: 20;
  background-color: rgba(63, 63, 63, 0.733);

  /* display: flex;
  flex-direction: column;
  align-items: center; */
}

.safari > p {
  font-size: 14px;
}

.safari > div {
  padding: 0;
  margin: 0;
}

video {
  width: 30vw;
}

.reduce-icon {
  position: relative;
}

.reduce-icon-1, .reduce-icon-2 {
  height: 1.5rem;
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
}

.safari-note {
  padding-top: 0.5rem;
}
</style>
