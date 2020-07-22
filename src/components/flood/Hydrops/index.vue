<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="积水" />
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_Hydrops"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
export default {
    name: "Hydrops",
    data() {
        return {};
    },

    components: {
        Title,
    },

    mounted() {
        this.drawLine();
    },

    methods: {
        drawLine() {
            var charts = {
                // 按顺序排列从大到小
                cityList: ["空港六路\n迎宾三路路口", "迎宾二路\n空港一路口", "迎宾六路油库门口", "空港三路北段", "申达五路/申达六路", "申达一路"],
                cityData: [63200, 72600, 34100, 37800, 32600, 6500],
            };
            var top10CityList = charts.cityList;
            var top10CityData = charts.cityData;
            var color1 = ["rgba(251, 222, 49, 0.85)", "rgba(255, 151, 112, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)"];
            var color2 = ["rgba(246, 186, 22, 0.85)", "rgba(255, 94, 61, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)"];
            let lineY = [];
            for (var i = 0; i < charts.cityList.length; i++) {
                var x = i;
                if (x > color1.length - 1) {
                    x = color1.length - 1;
                }
                var data = {
                    name: charts.cityList[i],
                    //   color: color[x] + ')',
                    value: top10CityData[i],
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new this.$echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: color1[x],
                                    },
                                    {
                                        offset: 1,
                                        color: color2[x],
                                    },
                                ],
                                false
                            ),
                        },
                    },
                };
                lineY.push(data);
            }

            this.option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    left: "5%",
                    right: "10%",
                    bottom: "11%",
                    top:"5%",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(149, 217, 249, 0.85)",
                        },
                    },
                },
                yAxis: {
                    type: "category",
                    data: top10CityList,
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        },
                    },
                },
                series: [
                    {
                        type: "bar",
                        label: {
                            show: true,
                            position: "right",
                            textStyle: {
                                color: "#fff",
                            },
                        },
                        barWidth: "20",
                        // data: [63200, 72600, 34100, 37800, 32600, 6500]
                        data: lineY,
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart_Hydrops"));
            // 绘制图表
            myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 540px;
    height: 310px;
    margin-top: 20px;
}
.panel-header {
    padding: 21px 0 0 22.5px;
}
.charts {
    width: 540px;
    height: 280px;
}
</style>
