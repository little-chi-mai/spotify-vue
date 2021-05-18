<template>
  <div class="home">
    <h1>Home page</h1>
    <a href="http://localhost:3030/api/login">Log in </a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {

  data() {
    return {
      name: "",
    };
  },
  created() {
    console.log(this.$route.params.code);
  },
};
</script>
