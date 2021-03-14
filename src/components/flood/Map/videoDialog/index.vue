<!--  -->
<template>
    <div class="map-mark">
      <video
        id="myPlayer"
        poster=""
        controls
        playsInline
        webkit-playsinline
        autoplay
      >
          <source :src="videoUrl" type="application/x-mpegURL" />
      </video>
    </div>
</template>

<script>

import EZuikit from "@/assets/js/ezuikit"

export default {
    name: "Dialog",

    props:{
      videoId:{
          type:String,
          default:'playWind',
      },
      videoUrl: {
        type: String,
        default:""
      }
    },

    data() {
      return {
        videoPlayer: null
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
        this.videoPlayer = new EZuikit.EZUIPlayer('myPlayer');
      },
      stop() {
        if(this.videoPlayer){
          this.videoPlayer.stop();
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
  background: rgba(7, 7, 7, 1);
  z-index: 999;
  .dialog-box {
    width: 757px;
    height: 669.5px;
    border: 1px solid #57bdff;
    position: absolute;
    background: rgba(1, 24, 63, 1);
    left: 0;
    top: 0;
  }
}
#myPlayer {
  width: 100%;
  height: 100%;
    // width: 757px;
    // height: 669.5px;
}
</style>
