<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-top">
            <div class="title-main">
                <Title title="出水瞬时流量" />
            </div>
            <!-- <div class="unit">单位：m<sup>3</sup></div> -->
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
        this.drawLine();
        this.getData();
        // 基于准备好的dom，初始化this.$echarts实例
        // this.myChart = this.$echarts.init(
        //     document.getElementById("chart_effluent")
        // );
    },

    methods: {
        async getData() {
            const [res] = await getEffluentFlow();
            let data = JSON.parse(res.message).effluentFlow;
            let arr = [[],[],[],[]];
            let xAxisData = [];
            data.forEach(item => {
                let time = item.time.split(' ')[1].split(':');
                xAxisData.push( `${time[0]}:${time[1]}` );
                arr[0].push(item.ssll5);
                arr[1].push(item.ssll4);
                arr[2].push(item.ssll3);
                arr[3].push(item.ssll2);
            });
            console.log( 'arr', arr, xAxisData);
            this.$set(this.effluentFlow,0,arr[0]);
            this.$set(this.effluentFlow,1,arr[1]);
            this.$set(this.effluentFlow,2,arr[2]);
            this.$set(this.effluentFlow,3,arr[3]);
            this.$set(this.xAxisData,xAxisData);
            
            // this.option.series[0].data = this.effluentFlow[0];
            // this.option.series[1].data = this.effluentFlow[1];
            // this.option.series[2].data = this.effluentFlow[2];
            // this.option.series[3].data = this.effluentFlow[3];
            this.option.xAxis[0].data = xAxisData;
            let arr1 = ['出水1#瞬时流量--机坪','出水1#瞬时流量--生活','出水2#瞬时流量--生活','出水2#瞬时流量--机坪'];
            let seriesArr = [];
            arr1.forEach((item,index) => {
                seriesArr.push( this.getSerierData(item, this.effluentFlow[index]) )
            });
            this.option.series = seriesArr;
            this.myChart.setOption(this.option);
            setTimeout(()=> {
                this.getData()
            },60000)
        },
        getSerierData(item, value) {
            return {
                smooth: true,
                name: item,
                type: "line",
                symbolSize: 6,
                areaStyle: {
                    opacity: 0.2
                },
                lineStyle: {},
                data:value,
            }
        },
        drawLine() {
            this.option = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    show: true,
                    icon: "rect",
                    top: "0%",
                    left: 0,
                    itemWidth: 10,
                    itemHeight: 8,
                    itemGap: 14,
                    textStyle: {
                        color: "#fff",
                    },
                    // data: ['进水线', '出水线']
                },
                grid: {
                    left: "0%",
                    right: "2%",
                    bottom: "0%",
                    top: "22%",
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
                    {
                        type: "value",
                        name: "单位：m³",
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
                series: [],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(document.getElementById("chart_effluent"));
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });

            // // 绘制图表
            // this.myChart.setOption(this.option);
            // window.addEventListener("resize", () => {
            //     this.myChart.resize();
            // });
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
    // height: 70px;
    height: 40px;
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
        // height: 210px;
        height: 250px;
        // height: 290px;
        width: 520px;
        // background: pink;
    }
}
</style>
