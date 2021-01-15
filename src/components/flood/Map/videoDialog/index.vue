<!--  -->
<template>
    <div class="map-mark">
        <div class="dialog-box">
          <div id="playWind"></div>
        </div>
    </div>
</template>

<script>
import EZUIKit from '../../../../assets/js/ezuikit.js'
export default {
    name: "Dialog",

    props:{
      accessToken: {
        type: String,
        default: ''
      },
      videoUrl: {
        type: String,
        default:""
      }
    },

    data() {
      return {
        playerInstance: null
      };
    },
    
    mounted() {
      this.$nextTick(()=> {
        this.initPlayer()
      })
    },

    methods: {
      closeDailog() {
        this.stop()
          this.$emit("closeDailog");
      },
      initPlayer() {
        let that = this;
        this.playerInstance = new EZUIKit.EZUIPlayer({
          id: 'playWind',
          autoplay: true,
          url: that.videoUrl,
          accessToken: that.accessToken,
          decoderPath: './static',
          width: 754,
          height: 668,
          splitBasis: 2, // 1*1 2*2 3*3 4*4
        });
      },
      stop() {
        var url = this.videoUrl;
        var urlList = [];
        if(url.length >0){
          urlList = url.split(',');
        }
        for(var i = 0; i<urlList.length; i++){
          if(urlList[i] && urlList[i].length>0){
            this.playerInstance.stop(i);
          }
        }
      }
    }
};
</script>
<style lang="scss" scoped>
.map-mark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 7, 7, 0.43);
  z-index: 999;
  .dialog-box {
    width: 757px;
    height: 669.5px;
    border: 1px solid #57bdff;
    position: absolute;
    background: rgba(1, 24, 63, 0.8);
    left: 0;
    top: 0;
  }
}
#playWind {
  width: 757px;
  height: 669.5px;
}
</style>
