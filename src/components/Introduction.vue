<template>
  <div>
    <h3>Put your headphones or speakers on.</h3>
    <p>This website plays (lots of) music.</p>
    <div class="intro">
      <div class="hover">
        <img src="@/assets/cursor.png" alt="">
        <h4>Hover</h4>
        <p>to listen</p>
      </div> 

      <div class="click">
        <img src="@/assets/pointer.png" alt="">
        <h4>Click</h4>
        <p>to dig deeper</p>
      </div> 

      <div class="save">
        <img src="@/assets/plus.png" alt="">
        <h4>Save</h4>
        <p>to build your collection</p>
      </div> 
    </div>

    <h4>Then follow your ears to find new music you love.</h4>
    

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
img {
  height: 4rem
}

.intro {
  display: flex;

  justify-content: center;
}

.intro > div {
  min-width: 15rem;
}

</style>