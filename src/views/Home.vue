<template>
  <div class="home">
    <a
      href="https://accounts.spotify.com/authorize?client_id=24bee78ac1814d0889acd52600b8eedb&response_type=code&redirect_uri=http://localhost:8080&scope=user-read-private%20user-read-email&state=34fFs29kd09"
      >Log in
    </a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      redirectURI: "http://localhost:8080/about"
    };
  },
};
</script>
