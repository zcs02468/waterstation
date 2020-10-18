<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="积水" />
            <div class="unit">(mm)</div>
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_Hydrops"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getPonding} from "../../../axios/index"
import {mapState} from "vuex"
export default {
    name: "Hydrops",
    mixins:[comMinxins],
    data() {
        return {
            myChart: null
        };
    },

    components: {
        Title,
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
            let [res] = await getPonding();
            // let res = {"result":"true","message":"{\"pondingStandard\":\"5\",\"pondingList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315894612102656000\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"空港六路迎宾三路路口\",\"waterAccumulatingVolume\":63200,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315894444808646656\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"迎宾二路空港一路口\",\"waterAccumulatingVolume\":72600,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315894240592179200\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"迎宾六路油库门口\",\"waterAccumulatingVolume\":34100,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315894044911120384\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"空港三路北段\",\"waterAccumulatingVolume\":37800,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315893878527275008\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"申达五路/申达六路\",\"waterAccumulatingVolume\":32600,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1315893474901012480\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"place\":\"申达一路\",\"waterAccumulatingVolume\":6500,\"remark\":\"\",\"status_in\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"id_in\":null}]}"};
            let data = JSON.parse(res.message);
            let {lineY,cityList,isAutoAudio} = this.getSeriesData(data);
            this.option.yAxis.data = cityList;
            this.option.series[0].data = lineY;
            this.myChart.setOption(this.option);
            if( isAutoAudio && this.waterIsAlarm ) {
                this.$store.commit('setAutoUrlNum');
            }
        },
        drawLine() {
            // let {lineY,yAxis} = this.getSeriesData()
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
                    data: [],
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
                        data: [],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(document.getElementById("chart_Hydrops"));
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
        getSeriesData({pondingStandard, pondingList}) {
            let standColor1 = ['rgba(133, 187, 255, 0.85)', "rgba(251, 222, 49, 0.85)"];
            let standColor2 = ['rgba(67, 129, 255, 0.85)', "rgba(246, 186, 22, 0.85)"];
            let cityList = [], cityData = [];
            let lineY = [];
            let isAutoAudio = false;
            pondingList.forEach(item => {
                cityList.push( item.place );
                cityData.push( item.waterAccumulatingVolume );
                let index;
                if( item.waterAccumulatingVolume > pondingStandard ) {
                    index = 1;
                    isAutoAudio = true;
                }else {
                    index = 0;
                }
                var data = {
                    name: item.place,
                    //   color: color[x] + ')',
                    value: item.waterAccumulatingVolume,
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
                                        color: standColor1[index],
                                    },
                                    {
                                        offset: 1,
                                        color: standColor2[index],
                                    },
                                ],
                                false
                            ),
                        },
                    },
                };
                lineY.push(data);
            });
            // var charts = {
            //     // 按顺序排列从大到小
            //     cityList: cityList,
            //     cityData: cityData,
            //     cityList: ["空港六路\n迎宾三路路口", "迎宾二路\n空港一路口", "迎宾六路油库门口", "空港三路北段", "申达五路/申达六路", "申达一路"],
            //     cityData: [200, 400, 100, 110, 450, 300],
            // };
            // let standColor1 = ['rgba(133, 187, 255, 0.85)', "rgba(251, 222, 49, 0.85)"];
            // let standColor2 = ['rgba(67, 129, 255, 0.85)', "rgba(246, 186, 22, 0.85)"];
            // let yAxis = charts.cityList;
            // var top10CityData = charts.cityData;
            // var color1 = ["rgba(251, 222, 49, 0.85)", "rgba(255, 151, 112, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)", "rgba(133, 187, 255, 0.85)"];
            // var color2 = ["rgba(246, 186, 22, 0.85)", "rgba(255, 94, 61, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)", "rgba(67, 129, 255, 0.85)"];
            // let lineY = [];
            // for (var i = 0; i < charts.cityList.length; i++) {
            //     var x = i;
            //     if (x > color1.length - 1) {
            //         x = color1.length - 1;
            //     }
            //     var data = {
            //         name: charts.cityList[i],
            //         //   color: color[x] + ')',
            //         value: top10CityData[i],
            //         itemStyle: {
            //             normal: {
            //                 show: true,
            //                 color: new this.$echarts.graphic.LinearGradient(
            //                     0,
            //                     0,
            //                     1,
            //                     0,
            //                     [
            //                         {
            //                             offset: 0,
            //                             color: color1[x],
            //                         },
            //                         {
            //                             offset: 1,
            //                             color: color2[x],
            //                         },
            //                     ],
            //                     false
            //                 ),
            //             },
            //         },
            //     };
            //     lineY.push(data);
            // }
            return {lineY,cityList,isAutoAudio}
        }
    },
    computed:{
        ...mapState({
            waterIsAlarm: state => state.flood.alarm.waterIsAlarm
        })
    }
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
    display: flex;
    align-items: center;
    .unit {
        color: #fff;
        margin-left: 10px;
    }
}
.charts {
    width: 540px;
    height: 280px;
}
</style>
