<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="用水情况" />
        </div>
        <div class="warp-container">
            <div class="tab-box">
                <ul>
                    <li v-for="(item,index) in indicator" :key="item.name">
                        <div class="img-box">
                            <img :src="getImg(index)" alt="" />
                        </div>
                        <div class="tab-content" :style="{ color: item.color }">
                            <p>{{item.name}}</p>
                            <p>{{dataList[index]}}&nbsp;{{item.unit}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="charts" id="charts_waterUse"></div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import comMinxins from "@/components/common/comMinxins";
import { getWaterUsage } from "@/axios/index";
export default {
    name: "WaterUse",
    mixins: [comMinxins],
    components: {
        Title,
    },
    data() {
        return {
            imgList: ['water.png','traffic.png','pressure.png','turbidity.png','chlorine.png'],
            dataList: [250, 180, 480, 410, 110],
            indicator: [
                {
                    name: "累计进水",
                    color: "#F3F78A",
                    unit:'m³'
                },
                {
                    name: "平均余氯",
                    color: "#478DF7",
                    unit:'m³/h'
                },
                {
                    name: "平均浊度",
                    color: "#0CA7A1",
                    unit:'Kpa'
                },
                {
                    name: "平均压力",
                    color: "#4BDCFF",
                    unit:'NTU'
                },
                {
                    name: "瞬时流量",
                    color: "#00A4E6",
                    unit:'mg/L'
                },
            ],
        };
    },

    async created() {},

    mounted() {
        this.drawLine();
        this.getData();
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            // ljll1	累计用水 
            // ssll1	瞬时流量
            // p5	出水压力
            // zd	浊度
            // yl	余氯

            // let [res] = await getWaterUsage();
            let res = {
                "result":"true",
                "data":{
                    "ljll1":51561,
                    "ssll1":1.3,
                    "p5":4.658,
                    "zd":0.185,
                    "yl":0.0509
                },
                "message":"请求成功"
            }
            let data = res.data;
            this.dataList = [data.ljll1,data.yl,data.zd,data.p5,data.ssll1];
            this.dataList.splice();
            this.option.series[0].data[0].value = this.dataList;
            this.myChart.setOption(this.option);
        },
        drawLine() {
            this.option = {
                grid: {
                    top: "20%",
                    left: "2%",
                    right: "2%",
                    bottom: "3%",
                },
                radar: {
                    name: {
                        textStyle: {
                            color: "#01C1DF",
                            fontSize: 12,
                        },
                    },
                    shape: "polygon",
                    center: ["50%", "50%"],
                    radius: "80%",
                    scale: true,
                    indicator: [
                        {
                            name: "累计进水",
                            max: 500,
                            color: "#F3F78A",
                        },
                        {
                            name: "平均余氯",
                            max: 500,
                            color: "#478DF7",
                        },
                        {
                            name: "平均浊度",
                            max: 500,
                            color: "#0CA7A1",
                        },
                        {
                            name: "平均压力",
                            max: 500,
                            color: "#4BDCFF",
                        },
                        {
                            name: "瞬时流量",
                            max: 500,
                            color: "#00A4E6",
                        },
                    ],
                    splitArea: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgb(16,186,253)",
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: "rgb(16,186,253)",
                        },
                    },
                },
                polar: {},
                angleAxis: {
                    min: 0,
                    max: 100,
                    interval: 100,
                    clockwise: false,
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
                radiusAxis: {
                    min: 0,
                    max: 500,
                    interval: 100,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: "rgb(16,186,253)",
                    },
                },
                series: [
                    {
                        type: "radar",
                        symbolSize: 0,
                        areaStyle: {
                            normal: {
                                color: "rgb(12,183,253)",
                                opacity: 0.8,
                            },
                        },
                        lineStyle: {
                            width: 0,
                        },
                        data: [
                            {
                                value: [250, 180, 480, 410, 110],
                            },
                        ],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("charts_waterUse")
            );
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
        getImg(index) {
            return require(`../../../assets/image/WaterUse/${this.imgList[index]}`)
        },
    },
};
</script>
<style lang="scss" scoped>
.detection-rate {
    position: relative;
    width: 600px;
    height: 329px;
    margin-top: 15px;
}

.panel-header {
    padding: 20px 0 0 23px;
}

.warp-container {
    margin-top: 10px;
    display: flex;
    padding-left: 25px;
    .tab-box {
        width: 140px;
        // height: 44px;
        height: 100%;
        li {
            width: 140px;
            height: 44px;
            display: flex;
        }
    }
    .charts {
        left: 30px;
        height: 280px;
        width: 340px;
        margin-left: 50px;
    }
}
li {
    margin-bottom: 6.5px;
    .img-box {
        width: 49px;
        height: 43.5px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .tab-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
    }
}
</style>
