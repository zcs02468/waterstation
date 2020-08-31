<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import {mapMutations} from "vuex"
export default {
  name: "App",
  created() {
    this.setTime();
  },
  methods:{
    // ...mapMutations([
    //   "SET_TIME"
    // ]),
    // setTime() {
    //   this.SET_TIME();
    // }
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
