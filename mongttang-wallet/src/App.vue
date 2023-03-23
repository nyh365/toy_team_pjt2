<template>
  <router-view/>
</template>

<script>


export default{
  created(){
    const URLSearch = new URLSearchParams(location.search);
    const privateKey = URLSearch.get(`key`);
    console.log(privateKey);
    this.$store.commit("SET_PRIVATEKEY", privateKey);
    console.log("asegaswehgashash"+this.$store.state.privateKey);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>