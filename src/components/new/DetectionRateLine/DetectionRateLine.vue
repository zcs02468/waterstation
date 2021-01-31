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
import { getWaterTendency } from "@/axios/index";
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
            
            let [err,res] = await getWaterTendency();
            console.log( 'res', res );
            if( err ) return;
            let western = res.data.western;
            // let southeast = res.data.southeast;
            let northeast = res.data.northeast;
            let westernData = this.filterData(western);
            let xAxis = westernData.xAxis;
            let westernY = westernData.yArr;
            // let southeastY = this.filterData(southeast).yArr;
            let northeastY = this.filterData(northeast).yArr;
            let series = [
                // this.getSeriesData({data:southeastY, name:"东区南", colorIndex:'one'}),
                this.getSeriesData({data:northeastY, name:"东区北", colorIndex:'two'}),
                this.getSeriesData({data:westernY, name:"西区", colorIndex:'three'}),
            ]
            this.option.xAxis[0].data = xAxis;
            this.option.series = series;
            this.myChart.setOption(this.option);
        },
        filterData(data) {
            let xAxis = [], yArr = [];
            data.forEach(item => {
                let a = String(item.percentage)
                if( a.indexOf("%") >= 0){
                    item.percentage = item.percentage.substring(0,item.percentage.length-1)
                }
                xAxis.push(item.waterDate);
                yArr.push(item.percentage);
            })
            xAxis.reverse();
            yArr.reverse();
            return {
                xAxis,
                yArr
            }
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
                        width: 2,
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
                    // formatter: '{c} %'
                },
                legend: {
                    show: true,
                    icon: "rect",
                    top: "4%",
                    right: '4%',
                    itemWidth: 26,
                    itemHeight: 15,
                    itemGap: 24,
                    textStyle: {
                        color: "#fff",
                    },
                },
                grid: {
                    top:"20%",
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
                        name: '单位：%',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 12,
                            lineHeight: 20
                        },
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
