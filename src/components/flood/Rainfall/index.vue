<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title class="title" title="雨量" />
            <ul>
                <li v-for="(item, index) in color" :key="`Rainfall${index}`">
                    <span class="iconfont iconquxian" :style="{ color: `${item}` }"></span>
                    <span>点位{{ index + 1 }}雨量</span>
                </li>
            </ul>
        </div>
        <div class="warp-container">
            <!-- <div class="back"></div> -->
            <div class="charts" id="chart_Rainfall"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
export default {
    name: "Rainfall",
    data() {
        return {
            color: ["#5C87ED", "#6FCCE6", "#F6BA16", "#E8764A", "#9270CA", "#DA4545", "#B2E76A"],
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.drawLine();
    },

    methods: {
        drawLine() {
            var rainData = [
                [47, 45, 43, 38, 35, 38, 45, 50, 50, 50, 50, 49],
                [39, 39, 34, 35, 39, 34, 34, 36, 36, 39, 39, 36],
                [70, 63, 76, 66, 79, 63, 67, 65, 69, 76, 79, 68],
                [34, 40, 33, 29, 35, 37, 33, 38, 31, 34, 34, 39],
                [98, 95, 101, 99, 92, 98, 94, 101, 93, 98, 93, 94],
                [88, 72, 89, 84, 72, 73, 82, 80, 72, 73, 85, 70],
                [62, 56, 59, 51, 61, 59, 52, 53, 64, 53, 53, 53],
            ];

            this.option = {
                color: this.color,
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    left: "5%",
                    right: "7%",
                    bottom: "2%",
                    top: "5%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(245, 245, 245, 0.33)",
                        },
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    data: ["00:00", "00:01", "00:02", "00:03", "00:04", "00:05", "00:06", "00:07", "00:08", "00:09", "00:10", "00:11"],
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(245, 245, 245, 0.33)",
                        },
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
                        data: rainData[0],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[1],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[2],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[3],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[4],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[5],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: rainData[6],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart_Rainfall"));
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
.iconfont {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
}
.panel {
    position: relative;
    width: 540px;
    height: 337.5px;
    margin-top: 20px;
}
.charts {
    width: 540px;
    height: 258px;
}
.panel-header {
    // display: flex;
    padding: 21.5px 0 0 22.5px;
    .title {
        float: left;
    }
}
ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 35px;
    li {
        width: 83.5px;
        height: 16.5px;
        margin-right: 18px;
        margin-bottom: 6.5px;
        &:nth-child(5) {
            margin-left: 101.5px;
        }
    }
}

// .warp-container {
//     width: 540px;
//     height: 258px;
//     position: relative;
//     .back {
//         position: absolute;
//         width: 82.5%;
//         height: 86%;
//         top: 5%;
//         right: 7%;
//         background: pink;
//     }
// }
</style>
