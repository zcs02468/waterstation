<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-header">
      <Title title="河道及水池水位" />
    </div>
    <div class="panel-bodyer" v-if="waterList.length > 0">
      <div class="panel-top body-content">
        <div class="content-header">
          <span class="iconfont iconbolangn3 default"></span
          ><span class="title default">东区南</span>
          <span
            class="select-item"
            v-for="(item, index) in categoryArr"
            :key="item"
          >
            <span class="round" :class="`${colorArr[index]}-border`"></span>
            <span class="text" :class="`${colorArr[index]}`">{{ item }}</span>
          </span>
        </div>
        <div class="content-body">
          <rule :standardList="standardList" />
          <div class="water-box-content">
            <div class="water-box">
              <Box
                :textType="waterList[0].isOverproof"
                :num="waterList[0].value"
              />
              <!-- <div class="title">南水塔</div> -->
              <div class="title">{{ waterList[0].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[1].isOverproof"
                :num="waterList[1].value"
              />
              <!-- <div class="title">迎宾三路</div> -->
              <div class="title">{{ waterList[1].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[2].isOverproof"
                :num="waterList[2].value"
              />
              <!-- <div class="title">南调东侧</div> -->
              <div class="title">{{ waterList[2].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[3].isOverproof"
                :num="waterList[3].value"
              />
              <!-- <div class="title">南调西侧</div> -->
              <div class="title">{{ waterList[3].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[4].isOverproof"
                :num="waterList[4].value"
              />
              <!-- <div class="title">南北横泾</div> -->
              <div class="title">{{ waterList[4].name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-top body-content">
        <div class="content-header">
          <span class="iconfont iconbolangn2 default"></span
          ><span class="title default">东区北</span>
          <span
            class="select-item"
            v-for="(item, index) in categoryArr"
            :key="item"
          >
            <span class="round" :class="`${colorArr[index]}-border`"></span>
            <span class="text" :class="`${colorArr[index]}`">{{ item }}</span>
          </span>
        </div>
        <div class="content-body">
          <rule :standardList="standardList" />
          <div class="water-box-content">
            <div class="water-box">
              <Box
                :textType="waterList[5].isOverproof"
                :num="waterList[5].value"
              />
              <!-- <div class="title">东泵站</div> -->
              <div class="title">{{ waterList[5].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[6].isOverproof"
                :num="waterList[6].value"
              />
              <!-- <div class="title">北水塔</div> -->
              <div class="title">{{ waterList[6].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[7].isOverproof"
                :num="waterList[7].value"
              />
              <!-- <div class="title">北调东侧</div> -->
              <div class="title">{{ waterList[7].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[8].isOverproof"
                :num="waterList[8].value"
              />
              <!-- <div class="title">北调西侧</div> -->
              <div class="title">{{ waterList[8].name }}</div>
            </div>
            <div class="water-box">
              <Box
                :textType="waterList[9].isOverproof"
                :num="waterList[9].value"
              />
              <!-- <div class="title">张正浦</div> -->
              <div class="title">{{ waterList[9].name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-top body-content">
        <div class="content-header">
          <span class="iconfont iconbolangn1 default"></span
          ><span class="title default">东区核心区</span>
          <span
            class="select-item"
            v-for="(item, index) in categoryArr1"
            :key="item"
          >
            <span class="round" :class="`${colorArr[index]}-border`"></span>
            <span class="text" :class="`${colorArr[index]}`">{{ item }}</span>
          </span>
        </div>
        <div class="content-body">
          <rule :standardList="standardList" />
          <div class="water-box-content" style="justify-content: flex-start;">
            <div class="water-box">
              <Box
                :textType="waterList[10].isOverproof"
                :num="waterList[10].value"
                boxType="111111"
              />
              <div class="title">{{ waterList[10].name }}</div>
              <!-- <div class="title">友乐路泵站</div> -->
            </div>
            <div class="water-box end-water-content-box">
              <Box
                :textType="waterList[11].isOverproof"
                :num="waterList[11].value"
                boxType="111111"
              />
              <div class="title">{{ waterList[11].name }}</div>
              <!-- <div class="title">
                外环西河
              </div> -->
            </div>
            <div class="water-box end-water-content-box">
              <Box
                :textType="waterList[12].isOverproof"
                :num="waterList[12].value"
                boxType="111111"
              />
              <div class="title">{{ waterList[12].name }}</div>
            </div>
            <div class="water-box end-water-content-box">
              <Box
                :textType="waterList[13].isOverproof"
                :num="waterList[13].value"
                boxType="111111"
              />
              <div class="title">{{ waterList[13].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import rule from "./rule";
import Box from "./Box";
import comMinxins from "../../common/comMinxins";
import { getFloodControlAndWaterLevel } from "../../../axios/index";
import { mapState } from "vuex";

export default {
  name: "WaterLevel",
  mixins: [comMinxins],
  data() {
    return {
      categoryArr: ["排水通畅", "排水放缓", "排水困难"],
      categoryArr1: ["安全水位", "可控水位", "警戒水位"],
      colorArr: ["default", "yellow", "orange"],
      waterList: [],
      standardList: [2, 3],
    };
  },

  components: {
    Title,
    rule,
    Box,
  },

  created() {
    this.getData();
  },

  methods: {
    updateData() {
      this.getData();
    },
    async getData() {
      let [err, res] = await getFloodControlAndWaterLevel();
      if (err || res.result != "true") return;
      const data = res.data;
      let flag = false;
      data.forEach((item) => {
        if (Number(item.isOverproof) > 1) flag = true;
      });
      if (flag) this.$store.commit("setAutoUrlNum");
      this.waterList = data;
      this.waterList.splice();
    },
  },

  computed: {
    ...mapState({
      // weichangIsAlarm: state => state.flood.alarm.weichangIsAlarm,	//围场河水位声音报警	String	1：报警；0：不报警
      // waiweiIsAlarm: state => state.flood.alarm.waiweiIsAlarm,	//外围河道水位声音报警	String	1：报警；0：不报警
      // balancingIsAlarm: state => state.flood.alarm.balancingIsAlarm,	//调节水池水位声音报警	String	1：报警；0：不报警
      alarm: (state) => state.flood.alarm,
    }),
  },
};
</script>
<style lang="scss" scoped>
.divider {
  border-top: 1px solid #d8d8d8;
}
.default {
  color: #7bc7ff;
}
.yellow {
  color: #f6ba16;
}
.orange {
  color: #ff5e3d;
}
.panel {
  width: 540px;
  height: 607px;
  position: relative;
  margin-top: 23px;
}
.panel-header {
  padding: 21px 0 0 22.5px;
}
// .body-content {
//     display: flex;
// }
.body-content {
  height: 185px;
  padding-top: 10px;
}
.content-header {
  display: flex;
  align-items: center;
  padding-left: 22.5px;
  .iconfont {
    font-size: 20px;
    vertical-align: middle;
  }
  .title {
    margin-left: 2px;
    font-size: 16px;
    vertical-align: middle;
  }
}
.select-item {
  font-size: 12px;
  margin-left: 18px;
  .default-border {
    border: 1px solid #7bc7ff;
  }
  .yellow-border {
    border: 1px solid #f6ba16;
  }
  .orange-border {
    border: 1px solid #ff5e3d;
  }
  .round {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: transparent;
    margin-right: 5px;
  }
}
.content-body {
  height: 95px;
  padding: 0 15px 0 35px;
  position: relative;
  // outline: 1px solid red;
  margin-top: 22px;
  .title {
    font-size: 15px;
    text-align: center;
    margin-top: 2px;
  }
}
.water-box-content {
  position: absolute;
  top: 0;
  left: 53px;
  width: 460px;
  display: flex;
  justify-content: space-between;
}
.text-center {
  text-align: left;
  display: flex;
  span {
    flex: 1;
    text-align: center;
  }
}
.end-water-content-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}
</style>
