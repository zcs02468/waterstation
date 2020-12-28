<!--  -->
<template>
  <div class="panel detection-rate left-container-angle">
    <div class="panel-header">
      <Title title="用水情况" />
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
        <div class="waterQualityNum">
          <span class="num">{{waterQualityNum}}</span>
        </div>
        <div class="direction-box" :style="`${directionStyle}`" v-show="isShowDirection">
          <div class="direction-left">
            <div style="opacity:0">111</div>
            <div v-for="(item) in radarIndicator" :key="item.name">{{item.name}}</div>
          </div>
          <div class="direction-center">
            <div>指标值</div>
            <div v-for="(item,index) in targetArr" :key="`${index}_${item}_quota`">{{item}}</div>
          </div>
          <div class="direction-right">
            <div>实际值</div>
            <div v-for="(item,index) in nowArr" :key="`${index}_${item}fact`">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/Title";
import comMinxins from "@/components/common/comMinxins";
import { getWaterUsage, getWaterQuality, getWaterQualityNum } from "@/axios/index";
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
          name: "累计进水",
          color: "#F3F78A",
          unit: "m³",
        },
        {
          name: "平均余氯",
          color: "#478DF7",
          unit: "m³/h",
        },
        {
          name: "平均浊度",
          color: "#0CA7A1",
          unit: "Kpa",
        },
        {
          name: "平均压力",
          color: "#4BDCFF",
          unit: "NTU",
        },
        {
          name: "瞬时流量",
          color: "#00A4E6",
          unit: "mg/L",
        },
      ],
      //（1=浊度，2=余氯，3=细菌总数，4=大肠杆菌，5=高锰酸盐）
      nameList:['','浊度','余氯','细菌总数','大肠杆菌','高锰酸盐'],
      colorList:['','#F3F78A','#478DF7','#0CA7A1','#4BDCFF','#00A4E6'],
      radarIndicator:[],
      targetArr:[],
      nowArr:[],
      directionStyle:``,
      isShowDirection: false,
      waterQualityNum: 0
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
      this.getRadarData();
      this.getWaterQualityNum();
    },
    async getList() {
      // ljll1	累计用水
      // ssll1	瞬时流量
      // p5	出水压力
      // zd	浊度
      // yl	余氯

      let [res] = await getWaterUsage();
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
    async getRadarData() {
      let [res] = await getWaterQuality();
      // let res = {
      //   result: "true",
      //   data: [
      //     {
      //       waterQualityNum: 100,
      //       waterQualityType: "1",
      //       waterQualityActualNum: 200,
      //     },
      //     {
      //       waterQualityNum: 100,
      //       waterQualityType: "2",
      //       waterQualityActualNum: 200,
      //     },
      //     {
      //       waterQualityNum: 100,
      //       waterQualityType: "3",
      //       waterQualityActualNum: 200,
      //     },
      //     {
      //       waterQualityNum: 100,
      //       waterQualityType: "4",
      //       waterQualityActualNum: 200,
      //     },
      //     {
      //       waterQualityNum: 100,
      //       waterQualityType: "5",
      //       waterQualityActualNum: 0,
      //     },
      //   ],
      //   message: "请求成功",
      // };
      let data = res.data;
      let {targetChartsData,nowChartsData,targetArr,nowArr,radarIndicator} = this.getRadarChartsData(data);

        
      //新增
      //获取数组最大值
      let maxNum = Math.max(...nowChartsData);
      if( maxNum < 100 ) {
          maxNum = 100;
      }
      radarIndicator.forEach(item => {
          item.max = maxNum + 20
      })

      this.targetArr = targetArr;
      this.nowArr = nowArr;
      this.radarIndicator = radarIndicator;
      this.radarIndicator.splice();
      this.option.series[0].data[0].value = targetChartsData;
      this.option.series[0].data[1].value = nowChartsData;
      this.option.radar.indicator = radarIndicator;
      this.myChart.setOption(this.option);
    },
    async getWaterQualityNum() {
      let [res] = await getWaterQualityNum();
      if( !res ) return;
      this.waterQualityNum = res.data;
    },
    getRadarChartsData(data) {
        let targetChartsData = [];//echarts指标值
        let nowChartsData = [];//echarts实际值
        let radarIndicator = [];
        let targetArr = [];
        let nowArr = [];
        data.forEach(item => {
            radarIndicator.push({
                name: this.nameList[item.waterQualityType],
                color: this.colorList[item.waterQualityType],
                min: 0,
            })
            targetArr.push(item.waterQualityNum);
            nowArr.push(item.waterQualityActualNum);
            let num;
            if( item.waterQualityNum == 0 ) {
              num = item.waterQualityActualNum + 100;
            }else {
              if( item.waterQualityActualNum < 0 ) {
                let a = (Math.round((Math.abs(item.waterQualityActualNum)/Math.abs(item.waterQualityNum)) * 1000) / 1000) * 100;
                if( a > 100 ) {
                  num = 0;
                }else {
                  num = 100 -a;
                }
              }else {
                if(item.waterQualityNum < 0 ) {
                  let a = Math.abs(item.waterQualityActualNum)
                  let b = Math.abs(item.waterQualityNum)
                  num = (Math.round(((a + b)/b) * 1000) / 1000) * 100;
                }else {
                  num = (Math.round((item.waterQualityActualNum/item.waterQualityNum) * 1000) / 1000) * 100;
                }
              }
            }
            targetChartsData.push(100);
            nowChartsData.push(num);
        });
        return {targetChartsData,nowChartsData,targetArr,nowArr,radarIndicator};
    },
    drawLine() {
      this.option = {
        color: ["#385CA5", "RGBA(189, 26, 26, 1)"],
        legend: {
            data: ["指标值", "实际值"],
            orient: "vertical",
            selectedMode:false,
            // icon: "circle",
            // left: "10%",
            // top: "6%",
            right:0,
            top:0,
            itemWidth: 10,
            itemHeight: 10,
            // itemGap: 24,
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            // show:false
        },
        grid: {
          top: "20%",
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
          shape: "polygon",
          center: ["50%", "50%"],
          radius: "80%",
          // scale: true,
          indicator: [
            {
              name: "累计进水",
              // max: 500,
              color: "#F3F78A",
            },
            {
              name: "平均余氯",
              // max: 500,
              color: "#478DF7",
            },
            {
              name: "平均浊度",
              // max: 500,
              color: "#0CA7A1",
            },
            {
              name: "平均压力",
              // max: 500,
              color: "#4BDCFF",
            },
            {
              name: "瞬时流量",
              // max: 500,
              color: "#00A4E6",
            },
          ],
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgb(16,186,253)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgb(16,186,253)",
            },
          },
        },
        // polar: {},
        // angleAxis: {
        //   min: 0,
        //   max: 100,
        //   interval: 100,
        //   clockwise: false,
        //   axisTick: {
        //     show: false,
        //   },
        //   axisLabel: {
        //     show: false,
        //   },
        //   axisLine: {
        //     show: false,
        //   },
        //   splitLine: {
        //     show: false,
        //   },
        // },
        // radiusAxis: {
        //   // min: 0,
        //   // max: 500,
        //   interval: 100,
        //   splitLine: {
        //     show: false,
        //   },
        //   axisLabel: {
        //     color: "rgb(16,186,253)",
        //   },
        // },
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
              // {
              //   value: [250, 180, 480, 410, 110],
              // },
              
                            {
                                value: [100, 90, 84],
                                name: "指标值",
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
                            {
                                value: [56, 70, 100],
                                name: "实际值",
                                itemStyle: {
                                    normal: {
                                        borderColor: "#5AD2A5",
                                        borderWidth: 1,
                                    },
                                },
                                lineStyle: {
                                    normal: {
                                        color: "RGBA(189, 26, 26, 1)",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: "RGBA(205, 33, 33, .5)",
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
      this.myChart.on('mouseover', (params)=> {
          this.isShowDirection = true;
          let event = params.event;
          let offsetX = event.offsetX;
          let offsetY = event.offsetY;
          this.directionStyle = `left:${offsetX + 20 + 30 }px;top:${offsetY + 20}px;`
      });
      this.myChart.on('mousemove', (params)=> {
          this.isShowDirection = true;
          let event = params.event;
          let offsetX = event.offsetX;
          let offsetY = event.offsetY;
          this.directionStyle = `left:${offsetX + 20 + 30 }px;top:${offsetY + 20}px;`
      });
      this.myChart.on('mouseout', ()=> {
          this.isShowDirection = false;
      });
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
  .direction-box {
    position: absolute;
    border-style: solid;
    white-space: nowrap;
    z-index: 9999999;
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: rgba(50, 50, 50, 0.7);
    border-width: 0px;
    border-color: rgb(51, 51, 51);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font: 14px / 21px "Microsoft YaHei";
    padding: 5px;
    pointer-events: none;
    display: flex;
    .direction-center{
      margin: 0 10px;
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
  }
  .charts {
    // left: 30px;
    // height: 280px;
    // width: 340px;
    // margin-left: 50px;
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
