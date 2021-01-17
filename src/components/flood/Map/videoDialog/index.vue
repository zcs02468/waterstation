<!--  -->
<template>
    <div class="map-mark">
        <div class="dialog-box">
           <video :id="videoId"
              class="video-js vjs-default-skin vjs-big-play-centered"
              preload="auto"
              autoplay
              style="width: 100%;height: 100%;"
              data-setup='{"html5" : { "nativeTextTracks" : false }}'>
              <source :src="videoUrl" type="rtmp/flv">
            </video>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
videojs.options.flash.swf = SWF_URL
export default {
    name: "Dialog",

    props:{
      videoId:{
          type:String,
          default:'playWind',
      },
      videoUrl: {
        type: String,
        default:"rtmp://58.200.131.2:1935/livetv/hunantv"
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
        this.videoPlayer = videojs(this.videoId);// 关联video标签的id
        this.videoPlayer.src({
            src: this.videoUrl,
            type: 'rtmp/flv'
        });
        this.videoPlayer.play();
        this.videoPlayer.pause();
      },
      stop() {
        if(this.videoPlayer){
            this.videoPlayer.dispose()
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
video {
  width: 100%;
  height: 100%;
}
</style>
