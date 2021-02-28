<template>
  <div class="qrcode-dialog">
    <div class="img-box">
      <img :src="imgData" alt="" />
      <div class="refresh" v-show="isShowRefresh" @click="refresh">
        <i class="el-icon-refresh" :class="[ loading ? 'loading' : '' ]"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrCode, getToken } from "@/axios/index";
export default {
  name: "qrCodeDialog",
  data() {
    return {
      imgData: "",
      key: "1343854013443919872",
      isShowRefresh: false,
      nowTime: 0,
      loading: false
    };
  },

  async created() {
    this.nowTime = new Date().getTime();
    await this.getQrCode();
    await this.getToken();
  },

  methods: {
    //刷新
    refresh() {
      this.loading = true;
      this.getQrCode()
    },
    async getQrCode() {
      let [err, res] = await getQrCode();
      if (err || !res.data || !res.message) {
        this.pollingQrCode();
        return;
      }
      this.imgData = res.data;
      this.key = res.message;
      this.loading = true;
      this.isShowRefresh = false;
    },
    pollingQrCode() {
      clearTimeout(window.pollingTime);
      window.pollingTime = setTimeout(() => {
        this.getQrCode();
      }, 1000);
    },
    async getToken() {
      let [err, res] = await getToken({
        key: this.key,
      });
      if (err) return;
      if (res.message) {
        this.$store.state.isShowLogin = false
      } else {
        this.pollingLoginType();
      }
    },
    pollingLoginType() {
      let time = new Date().getTime();
      if (time - this.nowTime > 3 * 60 * 1000) {
        this.isShowRefresh = true;
        return;
      }
      clearTimeout(window.pollingLoginType);
      window.pollingLoginType = setTimeout(() => {
        this.getToken();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.qrcode-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background: #000;
  z-index: 9999999;
}
.img-box {
  width: 30%;
  margin: auto;
  position: relative;
  img {
    width: 100%;
  }
  .refresh {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    font-size: 40px;
    justify-content: center;
    align-items: center;
    min-width: 576px;
    min-height: 576px;
    cursor: pointer;
  }
  .loading {
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
