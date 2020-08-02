<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-top">
            <div class="title-main">
                <Title title="出水瞬时流量" />
            </div>
            <div class="unit">单位：m<sup>3</sup></div>
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_effluent"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import { getEffluentFlow } from "../../../axios";
export default {
    name: "Effluent",
    data() {
        return {
            effluentFlow:[[],[],[],[]],
            xAxisData:[]
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.getData();
        this.drawLine();
    },

    methods: {
        async getData() {
            const [res] = await getEffluentFlow();
            let data = JSON.parse(res.message).effluentFlow;
            data.forEach(item => {
                let time = item.time.split(' ')[1].split(':');
                this.xAxisData.push( `${time[0]}:${time[1]}` );
                this.effluentFlow[0].push(item.ssll5);
                this.effluentFlow[1].push(item.ssll4);
                this.effluentFlow[2].push(item.ssll3);
                this.effluentFlow[3].push(item.ssll2);
            });
            this.myChart.setOption(this.option);
            setTimeout(()=> {
                this.getData()
            },60000)
        },
        drawLine() {
            this.option = {
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    left: "0%",
                    right: "2%",
                    bottom: "0%",
                    top: "9%",
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
                ],
                series: [
                    {
                        name: "出水1#瞬时流量--机坪",
                        smooth: true,
                        // showSymbol: false,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 1,
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 0,
                        },
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "#6DFFEB",
                            },
                        },
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
                                            color: "rgba(24, 73, 94, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(2, 43, 74, .7)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: "linear",

                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#0681F7", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#E3EA32", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.effluentFlow[0],
                    },
                    {
                        name: "出水1#瞬时流量--生活",
                        smooth: true,
                        // showSymbol: false,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 1,
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 0,
                        },
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "#6DFFEB",
                            },
                        },
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
                                            color: "rgba(24, 73, 94, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(2, 43, 74, .7)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: "linear",

                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#0681F7", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#E3EA32", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.effluentFlow[1],
                    },
                    {
                        name: "出水2#瞬时流量--生活",
                        smooth: true,
                        // showSymbol: false,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 1,
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 0,
                        },
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "#6DFFEB",
                            },
                        },
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
                                            color: "rgba(24, 73, 94, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(2, 43, 74, .7)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: "linear",

                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#0681F7", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#E3EA32", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.effluentFlow[2],
                    },
                    {
                        name: "出水2#瞬时流量--机坪",
                        smooth: true,
                        // showSymbol: false,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 1,
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 0,
                        },
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "#6DFFEB",
                            },
                        },
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
                                            color: "rgba(24, 73, 94, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(2, 43, 74, .7)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: "linear",

                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#0681F7", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#E3EA32", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data: this.effluentFlow[3],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("chart_effluent")
            );
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
    width: 600px;
    height: 311px;
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
        left: 48px;
        height: 210px;
        width: 520px;
        // background: pink;
    }
}
</style>
