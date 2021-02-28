<template>
  <div id="app">
    <router-view :key="key" v-if="!isShowLogin"/>
    <qrCodeDialog v-if="isShowLogin"/>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import qrCodeDialog from "./components/common/qrCodeDialog"
export default {
  name: "App",
  components:{
    qrCodeDialog
  },
  methods: {
    ...mapMutations(["SET_RANDOM_NUM"]),
    setAllTime() {
      clearTimeout( window.allTime );
      window.allTime = setTimeout(() => {
        this.SET_RANDOM_NUM();
        this.setAllTime();
      }, 60000);
    }
  },
  mounted() {
    this.setAllTime();
  },
  computed: {
    ...mapState({
      isShowLogin: state => state.isShowLogin
    }),
    key() {
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
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
