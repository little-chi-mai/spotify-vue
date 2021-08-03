<template>
  <div>
    <div class="noti">
        <p>{message}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["message"]
    
  }
</script>

<style scoped>
.noti {
  position: absolute;
  top: 5rem;
  left: 5rem;
  background-color: rgba(192, 103, 155, 0.664);
}
</style>