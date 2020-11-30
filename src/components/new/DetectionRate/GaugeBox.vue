<template>
    <div class="gauge-box" :class="`gauge-box${num}`">
        <div class="gauge_echarts" :id="`gauge-box${num}`"></div>
        <div class="line" :style="{background: lineColor }"></div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
export default {
    props: {
        title:{
          type:String,
          default:''
        },
        num: {
            type: [Number, String],
            default: 1,
        },
        value: {
            type: [Number, String],
            default: 40,
        },
    },
    data() {
      return {
        lineColor: "#fff"
      }
    },
    mounted() {
        this.drawLine(40);
        this.updateData(this.value);
    },
    methods: {
        updateData(value) {
          let color = "#03F47B"
          value <= 85 && (color = "#007DFE");
          value < 80 && (color = "red");
          this.lineColor = color;
          this.option.series[0].data[0].value = value;
          this.option.series[0].detail.textStyle.color = color;
          this.myChart.setOption(this.option);
        },
        drawLine(value) {
            this.option = {
                series: [
                    {
                        name: "速度",
                        type: "gauge",
                        z: 3,
                        min: 0,
                        max: 100,
                        splitNumber: 5,
                        radius: "90%",
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                width: 0,
                                color: [
                                    [0.8, "red"],
                                    [0.85, "#007DFE"],
                                    [1, "#03F47B"],
                                ],
                            },
                        },
                        axisTick: {
                            // 坐标轴小标记
                            length: 4, // 属性length控制线长
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: "auto",
                                width: 1,
                            },
                        },
                        axisLabel: {
                            show: true,
                            distance: -20,
                            fontSize: 8,
                            color: "#fff",
                        },
                        splitLine: {
                            // 分隔线
                            length: 8, // 属性length控制线长
                            lineStyle: {
                                // 属性lineStyle（详见lineStyle）控制线条样式
                                color: "auto",
                                width: 2,
                            },
                        },
                        pointer: {
                            show: false,
                        },
                        detail: {
                            offsetCenter: [0, "20%"],
                            textStyle: {
                                fontSize: 12,
                                color: "#fff",
                            },
                        },
                        data: [{ value: value }],
                    },
                ],
            };

            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById(`gauge-box${this.num}`)
            );
            // 绘制图表
            this.myChart.setOption(this.option, true);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    },
    watch: {
        value(value) {
            this.updateData(value);
        },
    },
};
</script>

<style lang="scss" scoped>
.gauge-box {
    width: 146px;
    height: 149px;
    padding-top: 5px;
    position: relative;
}
.gauge_echarts {
    width: 146px;
    height: 114px;
}
.gauge-box2 {
    margin: 0 50px;
}
.line {
  position: absolute;
  width: 24px;
  height: 3px;
  left: 60px;
  bottom: 65px;
  z-index: 9999;
  border-radius: 3px;
}
.title {
  text-align: center;
  margin-top: 5px;
  font-size: 12px;
  color: #478DF7;
}
</style>
