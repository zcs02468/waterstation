<template>
  <div class="gauge-box" :class="`gauge-box${num}`">
    <div class="gauge_echarts" :id="`gauge-box${num}`"></div>
    <div class="line" :style="{ background: lineColor }"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "11",
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
      lineColor: "#fff",
    };
  },
  mounted() {
    this.drawLine(40);
    this.updateData(this.value);
  },
  methods: {
    updateData(value) {
      let color = "red";
      value <= 85 && (color = "orange");
      value < 80 && (color = "#4181B3");
      this.lineColor = color;
      this.option.series[2].data = [
        {
          value: value,
          name: this.title,
        },
      ];
      this.myChart.setOption(this.option);
    },
    drawLine() {
      this.option = {
        grid: {
          top: "50%",
          left: "20%",
          right: "40%",
          bottom: "20%",
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "70%"],
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1,
            splitNumber: 8,
            radius: "50%",
            axisLine: {
              lineStyle: {
                color: [[1, "#3189F8"]],
                width: 10,
                shadowColor: "#3189F8", //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: -1,
                shadowBlur: 20,
                opacity: 1,
              },
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [],
          },
          //外围环
          {
            type: "gauge",
            center: ["50%", "70%"],
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: "100%",
            axisLine: {
              lineStyle: {
                width: 2,
                color: [[1, "#316AD1"]],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
              fontSize: 12,
              distance: -50,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [],
          },
          //数值
          {
            type: "gauge",
            center: ["50%", "70%"],
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 100,
            radius: "70%",
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 0,
                color: [
                  [0.8, "#4181B3"],
                  [0.85, "orange"],
                  [1, "red"],
                ],
              },
            },
            pointer: {
              width: 1,
              offsetCenter: [0, "-20%"],
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#fff",
              borderWidth: 2,
            },
            axisTick: {
              length: -6,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              // length: 30,
              length: -15,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            title: {
              offsetCenter: [0, "75%"],
              fontSize: 12,
              color: "#478DF7",
            },
            detail: {
              fontSize: 14,
              offsetCenter: [0, "30%"],
              valueAnimation: true,
              color: "auto",
            },
            data: [
              {
                value: 90,
                name: "西南合建泵站",
              },
            ],
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
  width: 227px;
  height: 149px;
  padding-top: 5px;
  position: relative;
}
.gauge_echarts {
  width: 227px;
  height: 150px;
  margin-top: -15px;
}
.line {
  position: absolute;
  width: 24px;
  height: 3px;
  left: 50%;
  transform: translateX(-55%);
  bottom: 28px;
  z-index: 9999;
  border-radius: 3px;
}
</style>
