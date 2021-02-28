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
            let [err,res] = await getPonding();
            if( err ) return;
            let data = JSON.parse(res.message);
            let {lineY,cityList,isAutoAudio} = this.getSeriesData(data);
            this.option.yAxis.data = cityList;
            this.option.series[0].data = lineY;
            this.myChart.setOption(this.option);
            if( isAutoAudio && Number(this.alarm.waterIsAlarm) ) {
                this.$store.commit('setAutoUrlNum');
            }
        },
        drawLine() {
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
            return {lineY,cityList,isAutoAudio}
        }
    },
    computed:{
        ...mapState({
            alarm: state => state.flood.alarm
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
