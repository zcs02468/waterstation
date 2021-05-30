<template>
  <div class="panel left-container-angle">
    <div class="panel-header">
      <Title title="河道水质" />
      <span class="grade grade-one"
        >1#：<span class="red-text select">{{ gradeName1 }}级</span></span
      >
      <span class="grade"
        >2#：<span class="red-text select">{{ gradeName2 }}级</span></span
      >
    </div>
    <div class="panel-bodyer">
      <div class="content">
        <div class="block" v-for="item in list" :key="item.type">
          <div class="left">{{ item.type }}<br />{{ item.unit }}</div>
          <div class="right" :class="[item.standardValue ? '' : 'center']">
            <div class="line">
              标准：{{ item.standardJudge }}{{ item.standardValue }}
            </div>
            <div
              class="line"
              :class="{ select: isSelect(item, 'isQualified1') }"
            >
              1#：{{ item.isQualified1 }}
            </div>
            <div
              class="line"
              :class="{ select: isSelect(item, 'isQualified2') }"
            >
              2#：{{ item.isQualified2 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getRiverWaterQuality } from "../../../axios/index";
export default {
  name: "WaterQuality",
  mixins: [comMinxins],
  data() {
    return {
      gradeName1: "",
      gradeName2: "",
      list: [],
    };
  },

  components: {
    Title,
  },
  created() {
    this.getData();
  },
  methods: {
    updateData() {
      this.getData();
    },
    async getData() {
      let [err, res] = await getRiverWaterQuality();
      if (err) return;
      const data = res.data;
      this.gradeName1 = data.gradeName1;
      this.gradeName2 = data.gradeName2;
      this.list = data.riverWaterQualitys;
      this.list.splice();
      // let data = JSON.parse( res.message ).riverWaterQuality;
      // let arr = [];
      // let isSelect = false;
      // data.forEach(item => {
      //     if( item.standardJudge == '＜=' || item.standardJudge == '<=') {
      //         item.currentValue > item.standardValue && (isSelect = true);
      //     }
      //     if(  item.standardJudge == '<' ) {
      //         item.currentValue >= item.standardValue && (isSelect = true);
      //     }
      //     if( item.standardJudge == '>' ) {
      //         item.currentValue <= item.standardValue && (isSelect = true);
      //     }
      //     if( item.standardJudge == '>=' ) {
      //         item.currentValue < item.standardValue && (isSelect = true);
      //     }
      //     if( item.standardJudge == '' ) {
      //         let arr1 = item.standardValue.split('~');
      //         if( item.currentValue < arr1[0] || item.currentValue > arr1[1] ) {
      //             isSelect = true
      //         }
      //     })
      // });
      // this.list = arr;
      // this.list.splice();
    },
    isSelect(item, key) {
      const value = item[key];
      let flag = false;
      if (item.standardJudge == "＜=" || item.standardJudge == "<=") {
        value > item.standardValue && (flag = true);
      }
      if (item.standardJudge == "<") {
        value >= item.standardValue && (flag = true);
      }
      if (item.standardJudge == ">") {
        value <= item.standardValue && (flag = true);
      }
      if (item.standardJudge == ">=") {
        value < item.standardValue && (flag = true);
      }
      if (item.standardJudge == "") {
        let arr1 = item.standardValue.split("~");
        if (value < arr1[0] || value > arr1[1]) {
          flag = true;
        }
      }
      return flag;
    },
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
  width: 540px;
  // height: 667.5px;
  height: 505px;
  margin-top: 20px;
  position: relative;
}
.panel-header {
  margin: 21.5px 0 0 22.5px;
  display: flex;
  align-items: center;
  .grade {
    font-size: 15px;
  }
  .grade-one {
    margin: 0 20px;
  }
}
.panel-bodyer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.select {
  color: #f54336;
}
.content {
  width: 493px;
  // height: 580px;
  height: 410px;
  display: flex;
  flex-wrap: wrap;
  .block {
    display: flex;
    border-top: 1px solid rgba(87, 189, 255, 0.56);
    border-left: 1px solid rgba(87, 189, 255, 0.56);
    border-bottom: 1px solid rgba(87, 189, 255, 0.56);
    // height: 145px;
    // height: 102.5px;
    font-size: 16px;
    text-align: center;
    .left {
      width: 105px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(101, 149, 242, 0.12);
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      width: 140px;
      height: 100%;
      border: 1px solid rgba(87, 189, 255, 0.56);
      border-top: none;
      border-bottom: none;
      background: rgba(101, 149, 242, 0.24);
      .line {
        height: 46px;
        line-height: 46px;
      }
      //   .target {
      //     border-bottom: 1px solid rgba(87, 189, 255, 0.56);
      //     // height: 72.5px;
      //     // line-height: 72.5px;
      //     height: 51.25px;
      //     line-height: 51.25px;
      //   }
      //   .now {
      //     // height: 72.5px;
      //     // line-height: 72.5px;
      //     height: 51.25px;
      //     line-height: 51.25px;
      //   }
    }
    .line:nth-child(1),
    .line:nth-child(2) {
      border-bottom: 1px solid rgba(87, 189, 255, 0.56);
    }
  }
}
</style>
