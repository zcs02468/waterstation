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
            
            const [res] = await getWaterTendency();
//             let res = {
// "result": "true",
// "data": {
// "western": [
// {
// "regionname": "西区",
// "percentage": "4639.68%",
// "waterDate": "12.22"
// },
// {
// "regionname": "西区",
// "percentage": "1885708.72%",
// "waterDate": "12.21"
// },
// {
// "regionname": "西区",
// "percentage": "-126279.79%",
// "waterDate": "12.20"
// },
// {
// "regionname": "西区",
// "percentage": "1617281.90%",
// "waterDate": "12.19"
// },
// {
// "regionname": "西区",
// "percentage": "1464827.98%",
// "waterDate": "12.18"
// },
// {
// "regionname": "西区",
// "percentage": "4143.36%",
// "waterDate": "12.17"
// },
// {
// "regionname": "西区",
// "percentage": "1643680.23%",
// "waterDate": "12.15"
// },
// {
// "regionname": "西区",
// "percentage": "1915677.04%",
// "waterDate": "12.14"
// },
// {
// "regionname": "西区",
// "percentage": "4597.22%",
// "waterDate": "12.13"
// },
// {
// "regionname": "西区",
// "percentage": "4089.35%",
// "waterDate": "12.12"
// },
// {
// "regionname": "西区",
// "percentage": "5112.42%",
// "waterDate": "12.11"
// },
// {
// "regionname": "西区",
// "percentage": "4755.13%",
// "waterDate": "12.10"
// },
// {
// "regionname": "西区",
// "percentage": "59880000.00%",
// "waterDate": "12.08"
// },
// {
// "regionname": "西区",
// "percentage": "21700000.00%",
// "waterDate": "12.07"
// },
// {
// "regionname": "西区",
// "percentage": "16780000.00%",
// "waterDate": "12.06"
// },
// {
// "regionname": "西区",
// "percentage": "17470000.00%",
// "waterDate": "12.05"
// },
// {
// "regionname": "西区",
// "percentage": "7298370000.00%",
// "waterDate": "12.04"
// },
// {
// "regionname": "西区",
// "percentage": "24290000.00%",
// "waterDate": "12.03"
// },
// {
// "regionname": "西区",
// "percentage": "4353.43%",
// "waterDate": "12.01"
// },
// {
// "regionname": "西区",
// "percentage": "4615.38%",
// "waterDate": "11.30"
// },
// {
// "regionname": "西区",
// "percentage": "3559.45%",
// "waterDate": "11.29"
// },
// {
// "regionname": "西区",
// "percentage": "4215.93%",
// "waterDate": "11.28"
// },
// {
// "regionname": "西区",
// "percentage": "4557.88%",
// "waterDate": "11.27"
// },
// {
// "regionname": "西区",
// "percentage": "1818553.78%",
// "waterDate": "11.26"
// },
// {
// "regionname": "西区",
// "percentage": "5197.10%",
// "waterDate": "11.24"
// },
// {
// "regionname": "西区",
// "percentage": "5169.84%",
// "waterDate": "11.23"
// }
// ],
// "southeast": [],
// "northeast": []
// },
// "message": "请求成功"
// }
            let western = res.data.western;
            let southeast = res.data.southeast;
            let northeast = res.data.northeast;
            let westernData = this.filterData(western);
            let xAxis = westernData.xAxis;
            let westernY = westernData.yArr;
            let southeastY = this.filterData(southeast).yArr;
            let northeastY = this.filterData(northeast).yArr;


            // console.log( 'data', western);
            // let xAxis = []
            // let y1 = [], y2 = [], y3 = [];
            // let arr = [1,2,3,4,5,6,7,8,9,10]
            // arr.forEach(item => {
            //     xAxis.push(`10.0${item*2}`)
            //     let a = Math.floor(Math.random()*10)
            //     y1.push(a*100)
            //     y2.push(a*200)
            //     y3.push(a*300)
            // });
            let series = [
                this.getSeriesData({data:southeastY, name:"东区南", colorIndex:'one'}),
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
                item.percentage = item.percentage.substring(0,item.percentage.length-1)
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
                    // formatter: '{c} %'
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
