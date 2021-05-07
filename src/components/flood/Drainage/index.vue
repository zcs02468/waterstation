<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-header">
      <Title title="排水泵站运行情况" />
    </div>
    <div class="panel-body">
      <ul>
        <span></span>
        <span></span>
        <span></span>
        <li>
          <div></div>
          <div>应开启数量</div>
          <div>开启数量/总数</div>
          <div>5分钟排水量/排水</div>
        </li>
        <li v-for="(item, index) in list" :key="index">
          <div>{{ item.name }}</div>
          <div>{{ item.quantityToBeOpened }}</div>
          <div>{{ item.openedQuantity }}</div>
          <div>{{ item.waterDischarge }}</div>
        </li>
        <!-- <li>
                    <div>南调东侧</div>
                    <div>{{list.south_east_open}}</div>
                    <div>{{list.south_east_displacement}}</div>
                </li>
                <li>
                    <div>南调西侧</div>
                    <div>{{list.south_west_open}}</div>
                    <div>{{list.south_west_displacement}}</div>
                </li>
                <li>
                    <div>北调东侧</div>
                    <div>{{list.north_east_open}}</div>
                    <div>{{list.north_east_displacement}}</div>
                </li>
                <li>
                    <div>北调西侧</div>
                    <div>{{list.north_west_open}}</div>
                    <div>{{list.north_west_displacement}}</div>
                </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getDrainagePumpingPlant } from "../../../axios";
export default {
  name: "Drainage",
  mixins: [comMinxins],
  data() {
    return {
      list: [],
      nameArr: ["南调东侧", "南调西侧", "北调东侧", "北调西侧"],
      // list: {
      //     north_east_displacement: 0,
      //     north_east_open: 0,
      //     north_west_displacement: 0,
      //     north_west_open: 0,
      //     south_east_displacement: 0,
      //     south_east_open: 0,
      //     south_west_displacement: 0,
      //     south_west_open: 0,
      // },
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
      // let [err, res] = await getDrainagePumpingPlant();
      // if (err || res.result != "true") return;
      const res = {
        data:[
          {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
          {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
          {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
          {quantityToBeOpened: 5, openedQuantity: "1/5", waterDischarge:"3500/4500"},
        ]
      }
      const data = res.data;
      data.forEach((item, i) => {
        item.name = this.nameArr[i];
      });
      this.list = data;
      this.list.splice();
      // let data = JSON.parse(res.message);
      // Object.assign(this.list, data)
    },
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
  width: 540px;
  height: 310px;
  position: relative;
  margin-top: 20px;
}
.panel-header {
  padding: 21.5px 0 0 22.5px;
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
ul {
  width: 498px;
  position: relative;
  margin-top: 15px;
  &::before {
    @extend %ul-line;
    left: 50%;
  }
  &::after {
    @extend %ul-line;
    right: 25%;
  }
  span:nth-child(1) {
    @extend %ul-line;
    display: inline-block;
    left: 25%;
    height: 100%;
  }
  li {
    width: 100%;
    height: 34px;
    display: flex;
    // align-items: center;
    margin-bottom: 15px;
    border: 1px solid #57bdff;
    flex-direction: row;
    div {
      // width: 166px;
      // width: 118.5px;
      flex: 1;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      text-align: center;
    }
  }
}
</style>
