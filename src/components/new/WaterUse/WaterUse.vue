<!--  -->
<template>
  <div class="panel detection-rate left-container-angle">
    <div class="panel-header">
      <Title title="西区泵站运行数据" />
    </div>
    <div class="warp-container">
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in indicator" :key="item.name">
            <div class="img-box">
              <img :src="getImg(index)" alt="" />
            </div>
            <div class="tab-content" :style="{ color: item.color }">
              <p>{{ item.name }}</p>
              <p>{{ dataList[index] }}&nbsp;{{ item.unit }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="charts-box">
        <div class="charts" id="charts_waterUse"></div>
        <div class="title">水质综合指数</div>
        <div class="waterQualityNum">
          <div>
            <p class="num">{{ waterQualityNum }}</p>
            <p>（WQI）</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/Title";
import comMinxins from "@/components/common/comMinxins";
import { getWaterUsage, getWaterQualityNum } from "@/axios/index";
export default {
  name: "WaterUse",
  mixins: [comMinxins],
  components: {
    Title,
  },
  data() {
    return {
      imgList: [
        "water.png",
        "traffic.png",
        "pressure.png",
        "turbidity.png",
        "chlorine.png",
      ],
      dataList: [250, 180, 480, 410, 110],
      indicator: [
        {
          name: "今日出水",
          color: "#F3F78A",
          unit: "m³",
        },
        {
          name: "平均余氯",
          color: "#478DF7",
          unit: "mg/L",
        },
        {
          name: "平均浊度",
          color: "#0CA7A1",
          unit: "NTU",
        },
        {
          name: "平均压力",
          color: "#4BDCFF",
          unit: "Kpa",
        },
        {
          name: "瞬时流量",
          color: "#00A4E6",
          unit: "m³/h",
        },
      ],
      //（1=浊度，2=余氯，3=细菌总数，4=大肠杆菌，5=高锰酸盐）
      nameList: ["", "浊度", "余氯", "细菌总数", "大肠杆菌", "高锰酸盐"],
      colorList: ["", "#F3F78A", "#478DF7", "#0CA7A1", "#4BDCFF", "#00A4E6"],
      radarIndicator: [],
      targetArr: [],
      nowArr: [],
      directionStyle: ``,
      isShowDirection: false,
      waterQualityNum: 0,
    };
  },

  async created() {},

  mounted() {
    this.drawLine();
    this.getData();
  },

  methods: {
    updateData() {
      this.getData();
    },
    async getData() {
      this.getList();
      this.getWaterQualityNum();
    },
    async getList() {
      // ljll1	累计用水
      // ssll1	瞬时流量
      // p5	出水压力
      // zd	浊度
      // yl	余氯

      let [err, res] = await getWaterUsage();
      if (err) return;
      // let res = {
      //   result: "true",
      //   data: {
      //     ljll1: 51561,
      //     ssll1: 1.3,
      //     p5: 4.658,
      //     zd: 0.185,
      //     yl: 0.0509,
      //   },
      //   message: "请求成功",
      // };
      let data = res.data;
      this.dataList = [data.ljll1, data.yl, data.zd, data.p5, data.ssll1];
      this.dataList.splice();
    },
    async getWaterQualityNum() {
      let [err, res] = await getWaterQualityNum();
      if (err) return;
      if (!res) return;
      this.waterQualityNum = res.data;
    },
    drawLine() {
      this.option = {
        color: ["#385CA5", "RGBA(189, 26, 26, 1)"],
        legend: {
          orient: "vertical",
          selectedMode: false,
          right: 0,
          top: 0,
          itemWidth: 10,
          itemHeight: 10,
          // itemGap: 24,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        grid: {
          top: "2%",
          left: "2%",
          right: "2%",
          bottom: "3%",
        },
        radar: {
          name: {
            textStyle: {
              color: "#01C1DF",
              fontSize: 12,
            },
          },
          // shape: "polygon",
          center: ["50%", "50%"],
          radius: "70%",
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
          splitArea: {
            areaStyle: {
              color: ["transparent"],
            },
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#04598F", //
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#04598F", //
            },
          },
          indicator: [
            {
              name: "浊度",
              max: 100,
              color: "#F3F78A",
            },
            {
              name: "余氯",
              max: 100,
              color: "#478DF7",
            },
            {
              name: "细菌总数",
              max: 100,
              color: "#0CA7A1",
            },
            {
              name: "大肠杆菌",
              max: 100,
              color: "#4BDCFF",
            },
            {
              name: "高锰酸盐",
              max: 100,
              color: "#00A4E6",
            }
          ],
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: "rgb(12,183,253)",
                opacity: 0.8,
              },
            },
            lineStyle: {
              width: 0,
            },
            data: [
              {
                value: [100, 100, 100, 100, 100],
                itemStyle: {
                  normal: {
                    borderColor: "#5B8FF9",
                    borderWidth: 1,
                  },
                },
                lineStyle: {
                  normal: {
                    color: "#5B8FF9",
                    width: 2,
                  },
                },
                areaStyle: {
                  normal: {
                    color: "RGBA(91, 143, 249, .5)",
                  },
                },
              },
            ],
          },
        ],
      };
      // 基于准备好的dom，初始化this.$echarts实例
      this.myChart = this.$echarts.init(
        document.getElementById("charts_waterUse")
      );
      // 绘制图表
      this.myChart.setOption(this.option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    getImg(index) {
      return require(`../../../assets/image/WaterUse/${this.imgList[index]}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.detection-rate {
  position: relative;
  width: 600px;
  height: 329px;
  margin-top: 15px;
}

.panel-header {
  padding: 20px 0 0 23px;
}

.warp-container {
  margin-top: 10px;
  display: flex;
  padding-left: 25px;
  .tab-box {
    width: 140px;
    // height: 44px;
    height: 100%;
    li {
      width: 140px;
      height: 44px;
      display: flex;
    }
  }
  .charts-box {
    height: 280px;
    width: 340px;
    position: relative;
    .charts {
      margin-left: 50px;
      left: 30px;
      width: 100%;
      height: 100%;
    }
  }
  .waterQualityNum {
    position: absolute;
    margin-left: 50px;
    // left: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    p:nth-child(1) {
      font-size: 35px;
      color: #ffffff;
      line-height: 50px;
    }
    p:nth-child(2) {
      font-size: 16px;
      color: #ffffff;
      line-height: 21px;
    }
  }
  .title {
    position: absolute;
    top: -27px;
    left: 50%;
    font-size: 18px;
    color: #478df7;
    line-height: 25px;
  }
}
li {
  margin-bottom: 6.5px;
  .img-box {
    width: 49px;
    height: 43.5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tab-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 13px;
  }
}
</style>
