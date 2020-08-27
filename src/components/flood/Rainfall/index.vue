<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title class="title" title="雨量" />
            <ul>
                <li v-for="(item, index) in tooltipArr" :key="`Rainfall${index}`">
                    <span class="iconfont iconquxian" :style="{ color: `${color[index]}` }"></span>
                    <span>{{item}}</span>
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
import {getRainfall} from "../../../axios"
export default {
    name: "Rainfall",
    data() {
        return {
            color: ["#5C87ED", "#6FCCE6", "#F6BA16", "#E8764A", "#9270CA", "#DA4545", "#B2E76A"],
            xAxisData: [],
            yAxisData: [],
            tooltipArr:['北调节泵站雨量','南调节泵站雨量','北雨污水泵站雨量','南雨污水泵站雨量'],
            myChart: null
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.drawLine();
        this.getData()
    },

    methods: {
        async getData() {
            // northLevel	北调节泵站雨量
            // southLevel	南调节泵站雨量
            // northSewageLevel	北雨污水泵站雨量
            // southSewageLevel	南雨污水泵站雨量
            let [res] = await getRainfall()
            // console.log( 'res', JSON.parse(res.message));
            let data = JSON.parse(res.message);
            let rainfallList = data.rainfallList;
            // let rainfallList = [{"pageNo":null,"pageSize":null,"id":"1293105993393008641","isNewRecord":false,"orderBy":null,"createByName":null,"updateByName":null,"updateBy":null,"lastUpdateDateTime":null,"status":null,"createDate":null,"updateDate":null,"remarks":null,"createBy":null,"gatherDate":"2020-08-12 00:00:00","hour":17,"northLevel":234.21,"southLevel":433.32,"northSewageLevel":543.23,"southSewageLevel":231.23,"updateDate_between":null,"updateDate_gte":null,"createDate_between":null,"createDate_gte":null,"createDate_lte":null,"status_in":null,"updateDate_lte":null,"id_in":null},{"pageNo":null,"pageSize":null,"id":"1293105993393008640","isNewRecord":false,"orderBy":null,"createByName":null,"updateByName":null,"updateBy":null,"lastUpdateDateTime":null,"status":null,"createDate":null,"updateDate":null,"remarks":null,"createBy":null,"gatherDate":"2020-08-12 00:00:00","hour":16,"northLevel":232.23,"southLevel":344.34,"northSewageLevel":774.76,"southSewageLevel":983.35,"updateDate_between":null,"updateDate_gte":null,"createDate_between":null,"createDate_gte":null,"createDate_lte":null,"status_in":null,"updateDate_lte":null,"id_in":null}]
            
            let standardList = data.standardList;
            let markLineArr = [];
            standardList.forEach((item,index) => {
                markLineArr.push(this.getMarkLine(item,index))
            });
            this.option.series[4].markLine.data = markLineArr;
            let xAxisData = [];
            let yAxisData =[[],[],[],[]];
            let standardArr = [];
            rainfallList.forEach((item) => {
                xAxisData.push( `${item.hour}:00` );
                yAxisData[0].push(item.northLevel)
                yAxisData[1].push(item.southLevel)
                yAxisData[2].push(item.northSewageLevel)
                yAxisData[3].push(item.southSewageLevel)
                standardArr.push( item.northLevel, item.southLevel, item.northSewageLevel, item.southSewageLevel );
            });
            //警戒值判断
            let maxNum = Math.max(...standardArr)
            if( standardArr.length > 0  &&  (maxNum > standardList[0].dictValue) )  {
                this.$store.commit('setAutoUrlNum')
            }
            this.xAxisData = xAxisData;
            this.yAxisData = yAxisData;
            this.option.series[0].data = this.yAxisData[0];
            this.option.series[1].data = this.yAxisData[1];
            this.option.series[2].data = this.yAxisData[2];
            this.option.series[3].data = this.yAxisData[3];
            this.option.xAxis.data =this.xAxisData;
            this.myChart.setOption(this.option);
            setTimeout(()=> {
                this.getData()
            },60000)
        },
        getMarkLine(data,index) {
            let colorArr = ['rgba(0,244,255,1)','#F6BA16','red','red','red']
            return {
                    yAxis: data.dictValue,
                    lineStyle: {
                        width: 1.6,
                        color: colorArr[index]
                    },
                    label: {
                        show: true,
                        position: "middle",
                        formatter: "{b}"
                    },
                    name:data.dictLabel
                }
        },
        drawLine() {

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
                    data: this.xAxisData,
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
                        data: this.yAxisData[0],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: this.yAxisData[1],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: this.yAxisData[2],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    {
                        data: this.yAxisData[3],
                        type: "line",
                        smooth: true,
                        symbolSize: 1,
                    },
                    // {
                    //     data: rainData[4],
                    //     type: "line",
                    //     smooth: true,
                    //     symbolSize: 1,
                    // },
                    // {
                    //     data: rainData[5],
                    //     type: "line",
                    //     smooth: true,
                    //     symbolSize: 1,
                    // },
                    // {
                    //     data: rainData[6],
                    //     type: "line",
                    //     smooth: true,
                    //     symbolSize: 1,
                    // },
                    {
                        name: "最大库存",
                        type: "line",
                        markLine: {
                            symbol: "none",
                            silent: true,
                            lineStyle: {
                                normal: {
                                    type: "solid"
                                }
                            },
                            label: {
                                position: "start"
                            },
                            data: [{
                                yAxis: 300,
                                lineStyle: {
                                    width: 1.6,
                                    color: "rgba(0,244,255,1)"
                                },
                                label: {
                                    show: true,
                                    position: "middle",
                                    formatter: "{b}"
                                },
                                name:"11111"
                            },
                            {
                                yAxis: 500,
                                lineStyle: {
                                    width: 1.6,
                                    color: "#F6BA16"
                                },
                                label: {
                                    show: true,
                                    position: "middle",
                                    formatter: "{b}"
                                },
                                name:"2222"
                            },{
                                yAxis: 600,
                                lineStyle: {
                                    width: 1.6,
                                    color: "red"
                                },
                                label: {
                                    show: true,
                                    position: "middle",
                                    formatter: "{b}"
                                },
                                name:"3333"
                            }
                            ]
                        }
                    },
                    // {
                    //     name: "安全库存",
                    //     type: "line",
                    //     markLine: {
                    //         symbol: "none",
                    //         silent: true,
                    //         lineStyle: {
                    //             normal: {
                    //                 type: "solid"
                    //             }
                    //         },
                    //         label: {
                    //             position: "start"
                    //         },
                    //         data: [{
                    //             yAxis: 500,
                    //             lineStyle: {
                    //                 width: 1.6560000000000001,
                    //                 color: "rgba(0,244,255,1)"
                    //             },
                    //             label: {
                    //                 show: true,
                    //                 position: '',
                    //             }
                    //         }]
                    //     }
                    // },
                    // {
                    //     name: "安全库存",
                    //     type: "line",
                    //     markLine: {
                    //         symbol: "none",
                    //         silent: true,
                    //         lineStyle: {
                    //             normal: {
                    //                 type: "solid"
                    //             }
                    //         },
                    //         label: {
                    //             position: "start"
                    //         },
                    //         data: [{
                    //             yAxis: 600,
                    //             lineStyle: {
                    //                 width: 1.6560000000000001,
                    //                 // color: "rgba(0,244,255,1)"
                    //             },
                    //             label: {
                    //                 show: true,
                    //                 position: '',
                    //             }
                    //         }]
                    //     }
                    // },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(document.getElementById("chart_Rainfall"));
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
    // padding-left: 35px;
    padding-left: 115px;
    li {
        // width: 83.5px;
        width: 150px;
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
