<template>
  <div class="dialog-box">
    <div class="team-info">
      <div class="info-background">
        <div class="back"></div>
      </div>
      <div class="info-back"></div>
      <div class="dialog-content">
        <p>瞬时流量已超出，请及时处理！</p>
        <button @click="closeAlarm">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { closeAlarm } from "@/axios/index";
export default {
  methods: {
    async closeAlarm() {
      let [err, res] = await closeAlarm();
      if (err || !res.result || res.result != "true") return;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-box {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
.info-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../../assets/image/maintain1.png");
  background-size: 100% 100%;
}
.team-info {
  position: absolute;
  width: 397.5px;
  // height: 187px;
  // width: 507px;
  height: 216px;
  z-index: 12;
  .info-background {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    z-index: -1;
    .back {
      // background: rgba(9,32,80,.7);
      // background: rgba(101, 149, 242, 0.4);
      background: RGBA(17, 53, 73, 1);
      // background: red;
      width: 100%;
      height: 100%;
    }
  }
}
.dialog-content {
  position: absolute;
  width: 100%;
  height: 100%;
}
.dialog-content {
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 22px;
    color: red;
    position: absolute;
    top: 70px;
  }
  button {
    width: 128px;
    height: 34px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid red;
    background: transparent;
    color: red;
    font-size: 16px;
    position: absolute;
    bottom: 40px;
    cursor: pointer;
  }
}
</style>
