<template>
  <div>
    <div v-show="notiShown" class="noti">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notiShown: false,
    };
  },
  props: ["message"],
  methods: {
    showNoti(time) {
      this.notiShown = true;
      setTimeout(() => {
        this.notiShown = false;
      }, time)
    },
  },
};
</script>

<style scoped>
.noti {
  position: fixed;
  top: 85vh;
  left: 65vw;
  background-color: rgba(77, 134, 72, 0.877);
  padding: 1rem;
  z-index: 10;
  width: 20rem;
}
</style>
