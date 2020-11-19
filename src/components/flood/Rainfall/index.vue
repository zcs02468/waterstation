<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title class="title" title="雨量" />
            <ul>
                <li v-for="(item, index) in tooltipArr" :key="`Rainfall${index}`">
                    <span class="iconfont iconquxian" :style="{ color: `${color[index]}` }"></span>
                    <span class="name">{{item}}</span>
                </li>
            </ul>
            <div class="markline-box">
                <div class="markline-item">
                    <div class="line-box">
                        <span class="round"></span>
                        <span class="line"></span>
                        <span class="round"></span>
                    </div>
                    <div class="name">一年一遇</div>
                </div>
                <div class="markline-item">
                    <div class="line-box">
                        <span class="round"></span>
                        <span class="line"></span>
                        <span class="round"></span>
                    </div>
                    <div class="name">三年一遇</div>
                </div>
                <div class="markline-item">
                    <div class="line-box">
                        <span class="round"></span>
                        <span class="line"></span>
                        <span class="round"></span>
                    </div>
                    <div class="name">五年一遇</div>
                </div>
            </div>
        </div>
        <div class="warp-container">
            <!-- <div class="back"></div> -->
            <div class="charts" id="chart_Rainfall"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getRainfall} from "../../../axios"
import {mapState} from "vuex"
export default {
    name: "Rainfall",
    mixins:[comMinxins],
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
        updateData() {
            this.getData();
        },
        async getData() {
            // northLevel	北调节泵站雨量
            // southLevel	南调节泵站雨量
            // northSewageLevel	北雨污水泵站雨量
            // southSewageLevel	南雨污水泵站雨量
            let [res] = await getRainfall()
            let data = JSON.parse(res.message);
            let rainfallList = data.rainfallList;
//             let res = {
//     "result": "true",
//     "message": "{\"standardList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1291184377701670912\",\"status\":\"0\",\"remarks\":\"\",\"createByName\":null,\"createDate\":\"2020-08-06 09:28\",\"updateDate\":\"2020-08-06 09:28\",\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"createBy\":\"system\",\"updateByName\":null,\"childList\":null,\"treeSort\":30,\"treeSorts\":\"0000000030,\",\"treeNames\":\"一年一遇暴雨\",\"treeLeaf\":\"1\",\"parentCodes\":\"0,\",\"treeLevel\":0,\"isQueryChildren\":null,\"cssStyle\":\"\",\"dictCode\":\"1291184377701670912\",\"extend\":{\"extendI4\":null,\"extendS1\":\"\",\"extendF2\":null,\"extendD2\":null,\"extendD4\":null,\"extendS2\":\"\",\"extendF1\":null,\"extendS7\":\"\",\"extendS8\":\"\",\"extendI2\":null,\"extendF4\":null,\"extendS3\":\"\",\"extendD1\":null,\"extendF3\":null,\"extendS4\":\"\",\"extendI1\":null,\"extendD3\":null,\"extendS5\":\"\",\"extendS6\":\"\",\"extendI3\":null},\"dictType\":\"rainfall_level_standard\",\"description\":\"单位：mm/h\",\"isSys\":\"1\",\"cssClass\":\"\",\"dictValue\":\"36\",\"dictLabelOrig\":\"一年一遇暴雨\",\"dictLabel\":\"一年一遇暴雨\",\"parentCode\":\"0\",\"isTreeLeaf\":true,\"isRoot\":true,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1291184524019965952\",\"status\":\"0\",\"remarks\":\"\",\"createByName\":null,\"createDate\":\"2020-08-06 09:29\",\"updateDate\":\"2020-08-06 09:29\",\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"createBy\":\"system\",\"updateByName\":null,\"childList\":null,\"treeSort\":60,\"treeSorts\":\"0000000060,\",\"treeNames\":\"三年一遇暴雨\",\"treeLeaf\":\"1\",\"parentCodes\":\"0,\",\"treeLevel\":0,\"isQueryChildren\":null,\"cssStyle\":\"\",\"dictCode\":\"1291184524019965952\",\"extend\":{\"extendI4\":null,\"extendS1\":\"\",\"extendF2\":null,\"extendD2\":null,\"extendD4\":null,\"extendS2\":\"\",\"extendF1\":null,\"extendS7\":\"\",\"extendS8\":\"\",\"extendI2\":null,\"extendF4\":null,\"extendS3\":\"\",\"extendD1\":null,\"extendF3\":null,\"extendS4\":\"\",\"extendI1\":null,\"extendD3\":null,\"extendS5\":\"\",\"extendS6\":\"\",\"extendI3\":null},\"dictType\":\"rainfall_level_standard\",\"description\":\"单位：mm/h\",\"isSys\":\"1\",\"cssClass\":\"\",\"dictValue\":\"49\",\"dictLabelOrig\":\"三年一遇暴雨\",\"dictLabel\":\"三年一遇暴雨\",\"parentCode\":\"0\",\"isTreeLeaf\":true,\"isRoot\":true,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1291184653141614592\",\"status\":\"0\",\"remarks\":\"\",\"createByName\":null,\"createDate\":\"2020-08-06 09:29\",\"updateDate\":\"2020-08-06 09:29\",\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"createBy\":\"system\",\"updateByName\":null,\"childList\":null,\"treeSort\":90,\"treeSorts\":\"0000000090,\",\"treeNames\":\"五年一遇暴雨\",\"treeLeaf\":\"1\",\"parentCodes\":\"0,\",\"treeLevel\":0,\"isQueryChildren\":null,\"cssStyle\":\"\",\"dictCode\":\"1291184653141614592\",\"extend\":{\"extendI4\":null,\"extendS1\":\"\",\"extendF2\":null,\"extendD2\":null,\"extendD4\":null,\"extendS2\":\"\",\"extendF1\":null,\"extendS7\":\"\",\"extendS8\":\"\",\"extendI2\":null,\"extendF4\":null,\"extendS3\":\"\",\"extendD1\":null,\"extendF3\":null,\"extendS4\":\"\",\"extendI1\":null,\"extendD3\":null,\"extendS5\":\"\",\"extendS6\":\"\",\"extendI3\":null},\"dictType\":\"rainfall_level_standard\",\"description\":\"单位：mm/h\",\"isSys\":\"1\",\"cssClass\":\"\",\"dictValue\":\"56\",\"dictLabelOrig\":\"五年一遇暴雨\",\"dictLabel\":\"五年一遇暴雨\",\"parentCode\":\"0\",\"isTreeLeaf\":true,\"isRoot\":true,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null}],\"rainfallList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303272364931461120\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":18,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303257265600638976\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":17,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303242166150737920\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":16,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303227066883989504\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":15,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303211967271825408\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":14,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303196867517665280\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":13,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303181768002293760\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":12,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303166668608557056\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":11,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1303151569432412160\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"gatherDate\":\"2020-09-08 00:00:00\",\"hour\":10,\"northLevel\":0.0,\"southLevel\":0.0,\"northSewageLevel\":0.0,\"southSewageLevel\":0.0,\"createDate_gte\":null,\"status_in\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null}]}"
// }
            
//             let data = JSON.parse(res.message);
//             let rainfallList = data.rainfallList;


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
                if( Number(this.alarm.rainfallIsAlarm) ) {
                    this.$store.commit('setAutoUrlNum')
                }
            }
            this.xAxisData = xAxisData;
            this.yAxisData = yAxisData;
            this.option.series[0].data = this.yAxisData[0];
            this.option.series[1].data = this.yAxisData[1];
            this.option.series[2].data = this.yAxisData[2];
            this.option.series[3].data = this.yAxisData[3];
            this.option.xAxis.data =this.xAxisData;
            this.myChart.setOption(this.option);
            // setTimeout(()=> {
            //     this.getData()
            // },60000)
        },
        getMarkLine(data,index) {
            let colorArr = ['rgba(0,244,255,1)','#F6BA16','red','red','red']
            return {
                    yAxis: data.dictValue,
                    lineStyle: {
                        width: 1.6,
                        color: colorArr[index]
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
                    top: "8%",
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
                    min: 70,
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
                            // label: {
                            //     position: "start"
                            // },
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

    computed: {
        ...mapState({
            // rainfallIsAlarm: state => state.flood.alarm.rainfallIsAlarm
            alarm: state => state.flood.alarm
        })
    },
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
        .name {
            font-size: 12px;
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


.markline-box {
  display: flex;
  height: 16px;
  line-height: 16px;
    .markline-item {
          display: flex;
          margin-right: 20px;
          .name {
            font-size: 10px;
            margin-left: 8px;
          }
        .line-box {
          display: flex;
          align-items: center;
        }
        .line {
          width: 20px;
          height: 1px;
        }
        .round {
            width: 8px;
            height: 8px;
            border-radius: 100%;
        }
        &:nth-child(1) {
          .line {
            background: #148FFF;
          }
          .round {
              border: 1px solid #148FFF;
          }
        }
        &:nth-child(2) {
          .line {
            background: #FCB428;
          }
          .round {
              border: 1px solid #FCB428;
          }
        }
        &:nth-child(3) {
          .line {
            background: #C13535;
          }
          .round {
              border: 1px solid #C13535;
          }
        }
    }
}
</style>
