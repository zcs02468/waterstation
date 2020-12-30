<template>
  <div class="qrcode-dialog">
    <div class="img-box">
      <img :src="imgData" alt="">
    </div>
  </div>
</template>

<script>
import { getQrCode, getToken } from "@/axios/index"
export default {
    name: "qrCodeDialog",
    data() {
        return {
          imgData:'',
          key: '1343854013443919872'
        };
    },

    async created() {
      // await this.getQrCode();
      await this.getToken();
    },

    methods: {
      async getQrCode() {
        let [err,res] = await getQrCode();
        if( err ) return;
        this.imgData = res.data;
        this.key = res.message;
      },
      async getToken() {
        let [err,res] = await getToken({
          key: this.key
        });
        if( err ) return;
        if( res.message ) {
          this.$store.state.isShowLogin = false
        }else {
          this.getQrCode();
        }
      }
    },
}
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
  img {
    width: 100%;
  }
}
</style>