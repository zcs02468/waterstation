<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="back"></div>
        <div class="panel-header">
            <Title title="供水检测率趋势" />
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_DetectionRateLine"></div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
// import Container from "./Container";
import comMinxins from "@/components/common/comMinxins";
import { getWaterPressure } from "@/axios/index";
export default {
    name: "DetectionRateLine",
    mixins: [comMinxins],
    data() {
        return {
            water_detectionRate_east: "90%",
            water_detectionRate_west: "90%",
        };
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
            // const [res] = await getWaterPressure();
            // let data = JSON.parse(res.message).waterPressure;

            // let xAxisData = [],
            //     enterWaterData = [],
            //     outWaterData = [];
            // data.forEach((ele) => {
            //     let timeArr = ele.time.split(" ")[1].split(":");
            //     xAxisData.push(`${timeArr[0]}:${timeArr[1]}`);
            //     enterWaterData.push(ele.p1)
            //     outWaterData.push(ele.p5)
            // });
            // this.xAxisData = xAxisData;
            // this.enterWaterData = enterWaterData;
            // this.outWaterData = outWaterData;
            // this.option.xAxis[0].data = this.xAxisData;
            // this.option.series[0].data = this.enterWaterData;
            // this.option.series[1].data = this.outWaterData;
            // this.myChart.setOption(this.option);
            let xAxis = []
            let y1 = [], y2 = [], y3 = [];
            let arr = [1,2,3,4,5,6,7,8,9,10]
            arr.forEach(item => {
                xAxis.push(`10.0${item*2}`)
                let a = Math.floor(Math.random()*10)
                y1.push(a*100)
                y2.push(a*200)
                y3.push(a*300)
            });
            let series = [
                this.getSeriesData({data:y1, name:"东区南", colorIndex:'one'}),
                this.getSeriesData({data:y2, name:"东区北", colorIndex:'two'}),
                this.getSeriesData({data:y3, name:"西区", colorIndex:'three'}),
            ]
            console.log( 'xAxis:',xAxis,"series:",series );
            this.option.xAxis[0].data = xAxis;
            this.option.series = series;
            this.myChart.setOption(this.option);
        },
        getSeriesData({data,name,colorIndex}) {
            let colorObj = {
                one: {
                    areaStyle:'1, 46, 140',
                    lineStyleColor: '#4E92F7',
                },
                two: {
                    areaStyle:'15, 108, 83',
                    lineStyleColor: '#53B999',
                },
                three: {
                    areaStyle:'0,162,228',
                    lineStyleColor: '#00A4E7',
                }
            }
            return {
                smooth: true,
                name: name,
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
                                    color: `rgba(${colorObj[colorIndex].areaStyle}, .9)`,
                                },
                                {
                                    offset: 1,
                                    color: `rgba(${colorObj[colorIndex].areaStyle}, 0)`,
                                },
                            ],
                            false
                        ),
                    },
                },
                lineStyle: {
                    normal: {
                        width: 1,
                        color: {
                            type: "linear",

                            colorStops: [
                                {
                                    offset: 0,
                                    color: colorObj[colorIndex].lineStyleColor, // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: colorObj[colorIndex].lineStyleColor, // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        },
                    },
                },
                data: data,
            }
        },
        drawLine() {
            this.option = {
                color: ["#4E92F7", "#53B999", "#00A4E7"],
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    show: true,
                    icon: "rect",
                    top: "4%",
                    left: "56%",
                    itemWidth: 26,
                    itemHeight: 15,
                    itemGap: 24,
                    textStyle: {
                        color: "#fff",
                    },
                },
                grid: {
                    top:"16%",
                    left: "4%",
                    right: "4%",
                    bottom: "0%",
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
                                color: "#478DF7",
                            },
                        },
                        data:this.xAxisData,
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
                                color: "#478DF7",
                            },
                        },
                    }
                ],
                series: [],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("chart_DetectionRateLine")
            );
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    },

    components: {
        Title,
    },
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 646px;
    height: 460px;
    margin-top: 15px;
}
.back {
    position: absolute;
    left: 0;
    top: 6px;
    height: 100%;
    width: 100%;
    background: url(/water/img/RoadworkInfoBack.dc634503.jpg);
    background-size: 100% 100%;
}
.panel-header {
    padding: 16px 0 0 23px;
}
.warp-container {
    .charts {
        height: 387px;
        width: 607px;
        left: 18.5px;
    }
}
</style>
