<!--  -->
<template>
  <div class="panel left-container-angle rainfall-box">
    <div class="panel-header rainfall-box_header">
      <div class="header-box">
        <Title class="title" title="雨量" />
        <div class="select-box">
          <ul>
            <li @click="liClick('CumulativeRainfallDay')">
              <span>日累计雨量</span>
              <b
                :class="selectType == 'CumulativeRainfallDay' ? 'select' : ''"
              ></b>
            </li>
            <li @click="liClick('RainIntensityPerHour')">
              <span>小时雨强</span>
              <b
                :class="selectType == 'RainIntensityPerHour' ? 'select' : ''"
              ></b>
            </li>
            <li @click="liClick('RainfallPerHour')">
              <span>小时雨量</span>
              <b :class="selectType == 'RainfallPerHour' ? 'select' : ''"></b>
            </li>
          </ul>
        </div>
      </div>
      <ul class="tooltip" v-if="selectType == 'RainfallPerHour'">
        <li v-for="(item, index) in tooltipArr" :key="`Rainfall${index}`">
          <span
            class="iconfont iconquxian"
            :style="{ color: `${color[index]}` }"
          ></span>
          <span class="name">{{ item }}</span>
        </li>
      </ul>
      <div class="markline-box" v-if="selectType == 'RainfallPerHour'">
        <div class="markline-item">
          <div class="line-box">
            <span class="round"></span>
            <span class="line"></span>
            <span class="round"></span>
          </div>
          <div class="name">一年一遇</div>
        </div>
        <div class="markline-item">
          <div class="line-box">
            <span class="round"></span>
            <span class="line"></span>
            <span class="round"></span>
          </div>
          <div class="name">三年一遇</div>
        </div>
        <div class="markline-item">
          <div class="line-box">
            <span class="round"></span>
            <span class="line"></span>
            <span class="round"></span>
          </div>
          <div class="name">五年一遇</div>
        </div>
      </div>
    </div>
    <div class="warp-container">
      <!-- <div class="back"></div> -->
      <div
        class="charts"
        :class="`${selectType}_charts`"
        id="chart_Rainfall"
      ></div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getRainfall } from "../../../axios";
import { mapState } from "vuex";
const color = [
  "#5C87ED",
  "#6FCCE6",
  "#F6BA16",
  "#E8764A",
  "#9270CA",
  "#DA4545",
  "#B2E76A",
];
const color2 = [
  {
    line: "rgba(91, 143, 249, 1)",
    bg: "rgba(91, 143, 249, .42)",
  },
  {
    line: "rgba(90, 216, 166, 1)",
    bg: "rgba(90, 216, 166, .42)",
  },
  {
    line: "rgba(114, 136, 175, 1)",
    bg: "rgba(114, 136, 175, .42)",
  },
  {
    line: "rgba(246, 189, 22, 1)",
    bg: "rgba(246, 189, 22, .42)",
  },
  {
    line: "rgba(232, 104, 74, 1)",
    bg: "rgba(232, 104, 74, .42)",
  },
  {
    line: "rgba(109, 200, 236, 1)",
    bg: "rgba(109, 200, 236, .42)",
  },
];
export default {
  name: "Rainfall",
  mixins: [comMinxins],
  data() {
    return {
      color: color,
      color2: color2,
      tooltipArr: [
        "北调节泵站雨量",
        "南调节泵站雨量",
        "北雨污水泵站雨量",
        "南雨污水泵站雨量",
        "北水塔河道雨量",
        "南水塔河道雨量",
      ],
      myChart: null,
      allData: {
        //小时雨量
        rainfallPerHour: { x: [], y: [], series: [] },
        //当日累计雨量，5分钟一条，一天
        cumulativeRainfallDay: { x: [], y: [], series: [] },
        //每小时雨强,5分钟一条，总共两个小时
        rainIntensityPerHour: { x: [], y: [], series: [] },
        heavyRainOnceInOneYears: 0, //示例：36（一年一遇）
        heavyRainOnceInThreeYears: 0, //示例：49（三年一遇）
        heavyRainOnceInFiveYears: 0, //示例：56（五年一遇）
      },
      selectType: "CumulativeRainfallDay",
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
    liClick(type) {
      this.selectType = type;
      this[`show${type}`]();
      this.updateH();
      // let h = this.selectType == "RainfallPerHour" ? 380 : 450;
      // this.updateH();
      // this.myChart.getDom().style.height = h + "px";
      // this.myChart.resize();
    },
    updateData() {
      this.getData();
    },
    updateH() {
      setTimeout(() => {
        let h =
          document.querySelector(".rainfall-box").offsetHeight -
          document.querySelector(".rainfall-box_header").offsetHeight;
        this.myChart.getDom().style.height = h + "px";
        this.myChart.resize();
      }, 500);
    },
    async getData() {
      let [err, res] = await getRainfall();
      if (err) return;
      const {
        rainfallPerHour,
        cumulativeRainfallDay,
        rainIntensityPerHour,
        heavyRainOnceInThreeYears,
        heavyRainOnceInFiveYears,
        heavyRainOnceInOneYears,
      } = res.data;
      this.setRainfallPerHour(
        rainfallPerHour,
        heavyRainOnceInThreeYears,
        heavyRainOnceInFiveYears,
        heavyRainOnceInOneYears
      );
      this.setCumulativeRainfallDay(cumulativeRainfallDay);
      this.setRainIntensityPerHour(rainIntensityPerHour);

      this[`show${this.selectType}`]();
      // let h = this.selectType == "RainfallPerHour" ? 380 : 450;
      this.updateH();
      // this.myChart.getDom().style.height = h + "px";
      // this.myChart.resize();
    },
    //每小时雨强
    //当日累计雨量
    //小时雨量

    //计算初始 小时雨量
    setRainfallPerHour(
      rainfallPerHour,
      heavyRainOnceInThreeYears,
      heavyRainOnceInFiveYears,
      heavyRainOnceInOneYears
    ) {
      let xAxisData = [];
      let yAxisData = [[], [], [], [], [], []];
      let standardArr = [];
      rainfallPerHour.forEach((item) => {
        xAxisData.push(`${item.hour}:00`);
        // xAxisData.push(item.hour);
        yAxisData[0].push(item.northLevel);
        yAxisData[1].push(item.southLevel);
        yAxisData[2].push(item.northSewageLevel);
        yAxisData[3].push(item.southSewageLevel);
        yAxisData[4].push(item.southSewageLevel);
        yAxisData[5].push(item.southSewageLevel);
        standardArr.push(
          item.northLevel,
          item.southLevel,
          item.northSewageLevel,
          item.southSewageLevel
        );
      });
      const seriesData = [
        this.getLineData({ arr: yAxisData[0], index: 0 }),
        this.getLineData({ arr: yAxisData[1], index: 1 }),
        this.getLineData({ arr: yAxisData[2], index: 2 }),
        this.getLineData({ arr: yAxisData[3], index: 3 }),
        this.getLineData({ arr: yAxisData[4], index: 4 }),
        this.getLineData({ arr: yAxisData[5], index: 5 }),
        this.getSeriesMarkLine([
          this.getMarkLine(Number(heavyRainOnceInOneYears), "一年一遇", 0),
          this.getMarkLine(Number(heavyRainOnceInThreeYears), "三年一遇", 1),
          this.getMarkLine(Number(heavyRainOnceInFiveYears), "五年一遇", 2),
        ]),
      ];
      //警戒值判断
      let maxNum = Math.max(...standardArr);
      if (standardArr.length > 0 && maxNum > heavyRainOnceInOneYears) {
        if (Number(this.alarm.rainfallIsAlarm)) {
          this.$store.commit("setAutoUrlNum");
        }
      }

      this.allData.rainfallPerHour.x = xAxisData;
      this.allData.rainfallPerHour.series = seriesData;
    },

    //计算初始 当日累计雨量
    setCumulativeRainfallDay(cumulativeRainfallDay) {
      let xAxisData = [];
      let yAxisData = [[], [], [], [], [], []];
      cumulativeRainfallDay.forEach((item) => {
        xAxisData.push(item.time);
        yAxisData[0].push(item.btjyl);
        yAxisData[1].push(item.ntjyl);
        yAxisData[2].push(item.bywyl);
        yAxisData[3].push(item.nywyl);
        yAxisData[4].push(item.bsthd);
        yAxisData[5].push(item.nsthd);
      });
      const seriesData = [
        this.getLineData({ arr: yAxisData[0], type: 2, index: 0 }),
        this.getLineData({ arr: yAxisData[1], type: 2, index: 1 }),
        this.getLineData({ arr: yAxisData[2], type: 2, index: 2 }),
        this.getLineData({ arr: yAxisData[3], type: 2, index: 3 }),
        this.getLineData({ arr: yAxisData[4], type: 2, index: 4 }),
        this.getLineData({ arr: yAxisData[5], type: 2, index: 5 }),
      ];

      this.allData.cumulativeRainfallDay.x = xAxisData;
      this.allData.cumulativeRainfallDay.series = seriesData;
    },

    //计算初始 每小时雨强
    setRainIntensityPerHour(rainIntensityPerHour) {
      let xAxisData = [];
      let yAxisData = [[], [], [], [], [], []];
      rainIntensityPerHour.forEach((item) => {
        xAxisData.push(item.time);
        yAxisData[0].push(item.btjyl);
        yAxisData[1].push(item.ntjyl);
        yAxisData[2].push(item.bywyl);
        yAxisData[3].push(item.nywyl);
        yAxisData[4].push(item.bsthd);
        yAxisData[5].push(item.nsthd);
      });
      const seriesData = [
        this.getLineData({ arr: yAxisData[0], type: 2, index: 0 }),
        this.getLineData({ arr: yAxisData[1], type: 2, index: 1 }),
        this.getLineData({ arr: yAxisData[2], type: 2, index: 2 }),
        this.getLineData({ arr: yAxisData[3], type: 2, index: 3 }),
        this.getLineData({ arr: yAxisData[4], type: 2, index: 4 }),
        this.getLineData({ arr: yAxisData[5], type: 2, index: 5 }),
      ];

      this.allData.rainIntensityPerHour.x = xAxisData;
      this.allData.rainIntensityPerHour.series = seriesData;
    },

    showRainfallPerHour() {
      this.option.series = this.allData.rainfallPerHour.series;
      this.option.xAxis.data = this.allData.rainfallPerHour.x;
      this.option.yAxis.min = 70;
      this.option.grid = {
        left: "5%",
        right: "7%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
      };
      this.option.dataZoom[0].show = false;
      this.option.legend && (this.option.legend.show = false);
      this.myChart.setOption(this.option);
    },
    showCumulativeRainfallDay() {
      this.option.series = this.allData.cumulativeRainfallDay.series;
      this.option.xAxis.data = this.allData.cumulativeRainfallDay.x;
      this.option.yAxis.min = 0;
      this.option.grid = {
        left: "5%",
        right: "7%",
        bottom: "13%",
        top: "25%",
        containLabel: true,
      };
      this.option.legend = {
        show: true,
        x: "30",
        y: "35",
        icon: "stack",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255, 255, 255, 1)",
        },
        data: this.tooltipArr,
      };
      this.option.dataZoom[0].show = true;
      this.myChart.setOption(this.option);
    },
    showRainIntensityPerHour() {
      this.option.series = this.allData.rainIntensityPerHour.series;
      this.option.xAxis.data = this.allData.rainIntensityPerHour.x;
      this.option.yAxis.min = 0;
      this.option.grid = {
        left: "5%",
        right: "7%",
        bottom: "13%",
        top: "25%",
        containLabel: true,
      };
      this.option.legend = {
        show: true,
        x: "30",
        y: "35",
        icon: "stack",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255, 255, 255, 1)",
        },
        data: this.tooltipArr,
      };
      this.option.dataZoom[0].show = false;
      this.myChart.setOption(this.option);
    },
    getMarkLine(value, name, index) {
      let colorArr = ["rgba(0,244,255,1)", "#F6BA16", "red", "red", "red"];
      return {
        yAxis: value,
        lineStyle: {
          width: 1.6,
          color: colorArr[index],
        },
        name: name,
      };
    },
    getLineData({ arr, type = 1, index }) {
      if (type == 1) {
        return {
          name: this.tooltipArr[index],
          data: arr,
          type: "line",
          smooth: true,
          symbolSize: 1,
        };
      } else {
        return {
          name: this.tooltipArr[index],
          data: arr,
          type: "line",
          smooth: true,
          symbolSize: 1,
          areaStyle: {
            color: this.color2[index].bg,
          },
        };
      }
    },
    getSeriesMarkLine(arr) {
      return {
        name: "最大库存",
        type: "line",
        markLine: {
          symbol: "none",
          silent: true,
          lineStyle: {
            normal: {
              type: "solid",
            },
          },
          data: arr,
        },
      };
    },
    getLegendData() {
      return {
        show: true,
        x: "30",
        y: "35",
        icon: "stack",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#1bb4f6",
        },
        data: this.tooltipArr,
      };
    },
    drawLine() {
      this.option = {
        color: this.color,
        tooltip: {
          trigger: "axis",
        },
        grid: {},
        xAxis: {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //   splitLine: {
          //     show: true,
          //     lineStyle: {
          //       color: "rgba(245, 245, 245, 0.33)",
          //     },
          //   },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          data: [],
        },
        yAxis: {
          type: "value",
          min: 70,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(245, 245, 245, 0.2)",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [],
        dataZoom: [
          {
            //   type: "slider",
            show: false,
            //   xAxisIndex: [0],
            //   left: "9%",
            bottom: 20,
            start: 0,
            end: 100, //初始化滚动条
          },
        ],
      };
      // 基于准备好的dom，初始化this.$echarts实例
      this.myChart = this.$echarts.init(
        document.getElementById("chart_Rainfall")
      );
      // 绘制图表
      this.myChart.setOption(this.option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },

  computed: {
    ...mapState({
      alarm: (state) => state.flood.alarm,
    }),
  },
};
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
}
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.panel {
  position: relative;
  width: 540px;
  height: 503px;
  margin-top: 20px;
}

.RainfallPerHour_charts {
  height: 380px;
}
.CumulativeRainfallDay_charts {
  height: 450px;
}
.RainIntensityPerHour_charts {
  height: 450px;
}
.charts {
  width: 540px;
  overflow: hidden;
  //   height: 420px;
  //   height: 460px;
}
.panel-header {
  padding: 20px 22.5px 0 22.5px;
}
.tooltip {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  li {
    width: 150px;
    height: 16.5px;
    margin-right: 18px;
    margin-bottom: 6.5px;
    .name {
      font-size: 12px;
    }
  }
}

.markline-box {
  display: flex;
  height: 16px;
  line-height: 16px;
  .markline-item {
    display: flex;
    margin-right: 20px;
    .name {
      font-size: 10px;
      margin-left: 8px;
    }
    .line-box {
      display: flex;
      align-items: center;
    }
    .line {
      width: 20px;
      height: 1px;
    }
    .round {
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
    &:nth-child(1) {
      .line {
        background: #148fff;
      }
      .round {
        border: 1px solid #148fff;
      }
    }
    &:nth-child(2) {
      .line {
        background: #fcb428;
      }
      .round {
        border: 1px solid #fcb428;
      }
    }
    &:nth-child(3) {
      .line {
        background: #c13535;
      }
      .round {
        border: 1px solid #c13535;
      }
    }
  }
}

.select-box {
  height: 28px;
  width: 300px;
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
