<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-top">
      <div class="title-main">
        <Title title="用水趋势图" />
      </div>
      <!-- <div class="unit">单位：m<sup>3</sup></div> -->
    </div>
    <div class="warp-container">
      <div class="charts" id="chart_effluent"></div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getEffluentFlow } from "../../../axios";
export default {
  name: "Effluent",
  mixins: [comMinxins],
  data() {
    return {
      effluentFlow: [[], []],
      xAxisData: [],
    };
  },

  components: {
    Title,
  },

  mounted() {
    this.drawLine();
    this.getData();
  },

  methods: {
    updateData() {
      this.getData();
    },
    async getData() {
      let [err,res] = await getEffluentFlow();
      if(err) return;
      let data = res.data;
      let arr = [[], []];
      let xAxisData = [];
      data.forEach((item) => {
        xAxisData.push(item.abscissaName);
        arr[0].push(item.endUser);
        arr[1].push(item.instantaneousFlow);
      });
      this.$set(this.effluentFlow, 0, arr[0]);
      this.$set(this.effluentFlow, 1, arr[1]);
      this.$set(this.xAxisData, xAxisData);
      this.option.xAxis[0].data = xAxisData;
      let arr1 = ["末端用户用水量", "泵站瞬时流量"];
      let seriesArr = [];
      arr1.forEach((item, index) => {
        seriesArr.push(this.getSerierData(item, this.effluentFlow[index]));
      });
      this.option.series = seriesArr;
      this.myChart.setOption(this.option);
    },
    getSerierData(item, value) {
      return {
        smooth: true,
        name: item,
        type: "line",
        symbolSize: 0,
        areaStyle: {
          opacity: 0.2,
        },
        lineStyle: {},
        data: value,
      };
    },
    drawLine() {
      this.option = {
        color: ["#FD0000", "#5AD8A6"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: true,
          icon: "rect",
          top: "21%",
          right: "15%",
          itemWidth: 10,
          itemHeight: 8,
          itemGap: 14,
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "40%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1F2C4A",
              },
            },
            axisTick: {
              show: false,
            },
            //坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            data: this.xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: "单位：m³",
            nameLocation: "start",
            nameTextStyle: {
              padding: [0, 0, 0, 0],
              color: "#fff",
            },
            splitLine: {
              show: true,
              lineStyle: {
                //  type: 'dashed',
                color: "#1F2C4A",
              },
            },
            axisTick: {
              show: false,
            },
            //坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          {
            type: "value",
            name: "单位：m³",
            nameTextStyle: {
              padding: [0, 50, 0, 0],
              color: "#fff",
            },
            axisLine: {
              //y轴
              show: false,
            },
          },
        ],
        series: [],
      };
      // 基于准备好的dom，初始化this.$echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chart_effluent"));
      // 绘制图表
      this.myChart.setOption(this.option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
  position: relative;
  width: 603px;
  height: 166px;
  margin-top: 15px;
}
.panel-top {
  // height: 70px;
  height: 40px;
  padding-top: 25px;
  padding-right: 44px;

  .title-main {
    padding-left: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .unit {
    text-align: right;
    margin-top: 8px;
    font-size: 10px;
    sup {
      font-size: 10px;
    }
  }
}

.warp-container {
  margin-top: -40px;
  .charts {
    // left: 48px;
    // height: 210px;
    height: 166px;
    // height: 290px;
    width: 603px;
    // background: pink;
  }
}
</style>
