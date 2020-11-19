<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations(["SET_RANDOM_NUM"]),
    setAllTime() {
      clearTimeout( window.allTime );
      window.allTime = setTimeout(() => {
        this.SET_RANDOM_NUM();
        this.setAllTime();
      // }, 10000);
      }, 60000);
    }
  },
  mounted() {
    this.setAllTime();
  },
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
