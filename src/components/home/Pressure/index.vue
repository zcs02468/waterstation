<!--  -->
<template>
    <div class="panel right-container-angle">
        <div class="panel-top">
            <div class="title-main">
                <Title title="进水/出水压力趋势" />
            </div>
            <!-- <div class="unit">单位：m<sup>3</sup></div> -->
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_pressure"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import { getWaterPressure } from "../../../axios";
export default {
    name: "Pressure",
    data() {
        return {
            option: null,
            xAxisData: [],
            enterWaterData: [],
            outWaterData: [],
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const [res] = await getWaterPressure();
            let data = JSON.parse(res.message).waterPressure;

            let xAxisData = [],
                enterWaterData = [],
                outWaterData = [];
            data.forEach((ele) => {
                let timeArr = ele.time.split(" ")[1].split(":");
                xAxisData.push(`${timeArr[0]}:${timeArr[1]}`);
                enterWaterData.push(ele.p1)
                outWaterData.push(ele.p5)
            });
            this.xAxisData = xAxisData;
            this.enterWaterData = enterWaterData;
            this.outWaterData = outWaterData;
        this.drawLine();

            console.log(
                "@@@@@@@",
                data.waterPressure,
                data.waterPressure[0].time.split(" ")[1].split(":")
            );
        },
        drawLine() {
            this.option = {
                color: ["#375FB0", "#368A7E"],
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    show: true,
                    icon: "rect",
                    top: "0%",
                    left: 0,
                    itemWidth: 12,
                    itemHeight: 8,
                    itemGap: 24,
                    textStyle: {
                        color: "#fff",
                    },
                    // data: ['进水线', '出水线']
                },
                grid: {
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
                        data:this.xAxisData,
                        // data: [
                        //     "1:00",
                        //     "2:00",
                        //     "3:00",
                        //     "4:00",
                        //     "5:00",
                        //     "6:00",
                        //     "7:00",
                        //     "8:00",
                        //     "9:00",
                        //     "10:00",
                        // ],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show: true,
                            lineStyle: {
                                //  type: 'dashed',
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
                        name: "单位：Pa",
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
                        name: "进水线",
                        type: "line",
                        symbolSize: 6,
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
                                            color: "rgba(15, 108, 83, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(15, 108, 83, .0)",
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
                                            color: "#74D9BA", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#39A87C", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        // data: [180, 250, 210, 170, 80, 300, 210, 60, 80, 170],
                        data:this.enterWaterData,
                    },
                    {
                        smooth: true,
                        name: "出水线",
                        type: "line",
                        symbolSize: 6,
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
                                            color: "rgba(1, 46, 140, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(1, 46, 140, 0)",
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
                                            color: "#93D3FC", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#1861F3", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data:this.outWaterData,
                        // data: [
                        //     280,
                        //     350,
                        //     390,
                        //     370,
                        //     350,
                        //     400,
                        //     310,
                        //     160,
                        //     180,
                        //     270,
                        // ],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("chart_pressure")
            );
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
    width: 600px;
    height: 500px;
    margin-top: 20px;
}
.panel-top {
    height: 70px;
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
        height: 407px;
        width: 540px;
    }
}
</style>
