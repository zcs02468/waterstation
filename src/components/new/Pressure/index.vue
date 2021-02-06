<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-top">
      <div class="title-main">
        <Title title="夜间最小流量趋势" />
      </div>
    </div>
    <div class="warp-container">
      <div class="charts" id="chart_pressure"></div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getWaterPressure } from "../../../axios";
export default {
  name: "Pressure",
  mixins: [comMinxins],
  data() {
    return {
      option: null,
      xAxisData: [],
      enterWaterData: [],
      outWaterData: [],
      allData: [],
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
      let [err, res] = await getWaterPressure();
      if (err) return;
      let data = res.data.reverse();
      // data = res.data.reverse();
      let arr = [];
      let arr0 = [],
        arr1 = [],
        arr2 = [];
      let xAxisData = [];
      data.forEach((item) => {
        arr.push(item);
        //用户最小流量  userMinimumFlow
        arr0.push(item.userMinimumFlow);
        //泵站最小流量  effluentMinimumFlow
        arr1.push(item.effluentMinimumFlow);
        //流量差值  difference
        arr2.push(item.difference);
        xAxisData.push(item.abscissaName);
      });
      this.allData = arr;
      this.allData.splice();
      console.log("alldata", this.allData);

      this.option.xAxis[0].data = xAxisData;
      this.option.series[0].data = arr0;
      this.option.series[1].data = arr1;
      this.option.series[2].data = arr2;
      this.myChart.setOption(this.option);
    },
    drawLine() {
      let _this = this;
      this.option = {
        color: ["#5B8FF9", "#FD0000", "#5AD8A6"],
        tooltip: {
          trigger: "axis",
          padding: 6,
          formatter: function(param) {
            let name = param[0].name;
            let str = `<div>${name}</div>`;
            for (let i = 0; i < param.length; i++) {
              let seriesName = param[i].seriesName;
              let time = "";
              i == 0 && (time = _this.allData[i].userDate);
              i == 1 && (time = _this.allData[i].effluentDate);
              str += ` 
                <div>
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param[i].color};"></span>
                    <span style="display:inline-block;min-width:0.6rem;margin-right:5px;">${seriesName}</span>
                    <span style="display:inline-block;min-width:0.6rem;margin-right:5px;">${param[i].value}</span>
                    <span style="display:inline-block;min-width:0.6rem;margin-right:5px;">${time}</span>
                </div>`;
            }
            return str;
          },
        },
        legend: {
          show: true,
          icon: "rect",
          top: "0%",
          right: "15%",
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 24,
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          top: "15%",
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "#3A4B6D",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //y轴
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
            name: "单位：m³/h",
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
        series: [
          {
            smooth: true,
            name: "用户",
            type: "line",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(91, 143, 249, 0.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(91, 143, 249, .0)",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#92D2FC", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#1760F2", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            data: this.enterWaterData,
          },
          {
            smooth: true,
            name: "泵站",
            type: "line",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(253, 0, 0, 0.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(253, 0, 0, 0)",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#FF0D23", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FF8A8A", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            data: this.outWaterData,
          },
          {
            smooth: true,
            name: "差值",
            type: "line",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(90, 216, 166, 0.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(90, 216, 166, 0)",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#6FD9B6", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#3AA97D", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            data: this.outWaterData,
          },
        ],
      };
      // 基于准备好的dom，初始化this.$echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chart_pressure"));
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
  height: 281px;
  margin-top: 15px;
}
.panel-top {
  height: 45px;
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
  margin-top: 10px;
  .charts {
    left: 30px;
    height: 204px;
    width: 536px;
  }
}
</style>
