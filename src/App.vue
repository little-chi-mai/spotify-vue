<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-if="$store.state.isLoggedIn"> | </span>
      <router-link v-if="$store.state.isLoggedIn" to="/discovery">Discovery</router-link>
      <span v-if="$store.state.isLoggedIn"> | </span>
      <router-link v-if="$store.state.isLoggedIn" to="/playlists">Your Playlists</router-link>
      <span v-if="$store.state.isLoggedIn"> | </span>
      <!-- <router-link to="/uploadimage">Upload your image</router-link>  -->
      <!-- <span v-if="$store.state.isLoggedIn"> | </span> -->
      <router-link v-if="$store.state.isLoggedIn" to="/logout">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<script></script>

<style>
@import "./css/main.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: azure;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
  color: azure;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
