<!--  -->
<template>
  <div
    class="map-mark"
    :style="{ width: zoomStyle.width, height: zoomStyle.height }"
  >
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
    <div class="videoZoom" @mousedown="zommDown"></div>
  </div>
</template>

<script>
import EZuikit from "@/assets/js/ezuikit";

export default {
  name: "Dialog",

  props: {
    videoId: {
      type: String,
      default: "playWind",
    },
    videoUrl: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      videoPlayer: null,
      zoom: {
        width: 0,
        height: 0,
        maxWidth: 200,
        maxHeight: 200,
        initL: 0,
        initT: 0,
      },
      zoomStyle: {
        width: "50%",
        height: "50%",
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initPlayer();
    });
  },

  methods: {
    closeDailog() {
      this.stop();
      this.$emit("closeDailog");
    },
    initPlayer() {
      this.videoPlayer = new EZuikit.EZUIPlayer("myPlayer");
    },
    stop() {
      if (this.videoPlayer) {
        this.videoPlayer.stop();
      }
    },
    zommDown(event) {
      this.zoom.width = document.querySelector(".map-mark").offsetWidth;
      this.zoom.height = document.querySelector(".map-mark").offsetHeight;
      this.zoom.initT = event.pageY;
      this.zoom.initL = event.pageX;
      document.onmousemove = this.zoomMove;
      document.onmouseup = this.zoomStop;
    },
    zoomMove(e) {
      let pageX = e.pageX,
        pageY = e.pageY;

      let differenceX = this.zoom.initL - pageX;
      let newWidth = this.zoom.width + differenceX;
      newWidth <= this.zoom.maxWidth && (newWidth = this.zoom.maxWidth);

      let differenceY = pageY - this.zoom.initT;
      let newHeight = this.zoom.height + differenceY;
      newHeight <= this.zoom.maxHeight && (newHeight = this.zoom.maxHeight);

      this.zoomStyle.width = `${newWidth}px`;
      this.zoomStyle.height = `${newHeight}px`;
    },
    zoomStop() {
      document.onmousemove = null;
      document.onmouseup = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.map-mark {
  position: absolute;
  right: 0;
  top: 0;
  // width: 50%;
  // height: 50%;
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
.videoZoom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-bottom: -5px;
  cursor: ne-resize;
}
</style>
