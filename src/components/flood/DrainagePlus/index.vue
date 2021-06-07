<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-header header-box">
      <Title title="排水泵站运行情况" />
      <div class="select-box">
        <ul>
          <li @click="liClick('default')">
            <span>南北泵站</span>
            <b :class="selectType == 'default' ? 'select' : ''"></b>
          </li>
          <li @click="liClick('west')">
            <span>西区泵站</span>
            <b :class="selectType == 'west' ? 'select' : ''"></b>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-body" :class="`${selectType}-drainage`">
      <ul>
        <span></span>
        <span></span>
        <span></span>
        <li>
          <div></div>
          <div v-if="selectType == 'default'">应开启数量</div>
          <div>开启数量/总数</div>
          <div>5分钟排水量/排水能力（m³）</div>
        </li>
        <li v-for="(item, index) in list" :key="index">
          <div>{{ item.name }}</div>
          <div v-if="selectType == 'default'">
            {{ item.quantityToBeOpened }}
          </div>
          <div>{{ item.openedQuantity }}</div>
          <div>{{ item.waterDischarge }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getFloodControlAndDrainage, getWestPumpingStation } from "../../../axios";
export default {
  name: "Drainage",
  mixins: [comMinxins],
  data() {
    return {
      nameArr: ["南调东侧", "南调西侧", "北调东侧", "北调西侧"],
      selectType: "default",
      westData: [],
      defaultData: [],
    };
  },

  components: {
    Title,
  },
  computed: {
    list() {
      if (this.selectType == "default") {
        return this.defaultData;
      } else {
        return this.westData;
      }
    },
  },

  created() {
    this.getData();
    this.getWestData();
  },

  methods: {
    liClick(type) {
      this.selectType = type;
    },
    updateData() {
      this.getData();
      this.getWestData();
    },
    async getWestData() {
      let [err, res] = await getWestPumpingStation();
      if (err || res.result != "true") return;
      // const res = {
      //   result: "true",
      //   data: [
      //     {
      //       openedQuantity: "0/4",
      //       waterDischarge: "0.0/711",
      //       drainPumpName: "南泵站",
      //     },
      //     {
      //       openedQuantity: "0/4",
      //       waterDischarge: "0.0/900",
      //       drainPumpName: "北泵站",
      //     },
      //   ],
      //   message: "请求成功",
      // };
      const data = res.data;
      data.forEach((item) => {
        item.name = item.drainPumpName;
      });
      this.westData = data;
      this.westData.splice();
    },
    async getData() {
      let [err, res] = await getFloodControlAndDrainage();
      if (err || res.result != "true") return;
        // const res = {
        //   data:[
        //     {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
        //     {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
        //     {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
        //     {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
        //   ]
        // }
      const data = res.data;
      data.forEach((item, i) => {
        item.name = this.nameArr[i];
      });
      this.defaultData = data;
      this.defaultData.splice();
    },
  },
};
</script>
<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.panel {
  width: 540px;
  height: 310px;
  position: relative;
  margin-top: 20px;
}
.panel-header {
  padding: 21.5px 22.5px 0 22.5px;
}
%ul-line {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  background: #5075a6;
  top: 0;
}
.panel-body {
  padding-left: 21px;
}

.default-drainage {
  ul {
    width: 498px;
    position: relative;
    margin-top: 15px;
    &::before {
      @extend %ul-line;
      left: 15%;
    }
    &::after {
      @extend %ul-line;
      left: 35%;
    }
    span:nth-child(1) {
      @extend %ul-line;
      display: inline-block;
      left: 57%;
      height: 100%;
    }
    li {
      width: 100%;
      height: 34px;
      display: flex;
      margin-bottom: 15px;
      border: 1px solid #57bdff;
      flex-direction: row;
      div {
        height: 34px;
        font-size: 14px;
        line-height: 34px;
        text-align: center;
      }
      div:nth-child(1) {
        width: 15%;
      }
      div:nth-child(2) {
        width: 20%;
      }
      div:nth-child(3) {
        width: 22%;
      }
      div:nth-child(4) {
        flex: 1;
      }
    }
  }
}
%ul-line {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  background: #5075a6;
  top: 0;
}
.west-drainage {
  ul {
    width: 498px;
    position: relative;
    margin-top: 15px;
    &::before {
      @extend %ul-line;
      left: 20%;
    }
    &::after {
      @extend %ul-line;
      left: 45%;
    }
    li {
      width: 100%;
      height: 34px;
      display: flex;
      margin-bottom: 15px;
      border: 1px solid #57bdff;
      flex-direction: row;
      div {
        height: 34px;
        font-size: 14px;
        line-height: 34px;
        text-align: center;
      }
      div:nth-child(1) {
        width: 20%;
      }
      div:nth-child(2) {
        width: 25%;
      }
      div:nth-child(3) {
        flex: 1;
      }
    }
  }
}
.select-box {
  height: 28px;
  width: 200px;
  ul {
    width: 100%;
    display: flex;
    height: 28px;
    li {
      flex: 1;
      height: 100%;
      font-size: 14px;
      text-align: center;
      height: 28px;
      line-height: 28px;
      position: relative;
      width: 100px;
      span {
        display: inline-block;
        position: relative;
        width: 80px;
        color: #fff;
        cursor: pointer;
      }
      &:nth-child(1) b {
        // border-right: none;
      }
      &:nth-child(2) b {
        // border-left: none;
      }
      .select {
        background: #1847ba;
      }
      b {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid #1847ba;
        left: 0;
        top: 0;
        z-index: -1;
        transform: skewX(-10deg);
      }
    }
  }
}
</style>
