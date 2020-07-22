<!--  -->
<template>
    <div class="panel right-container-angle">
        <div class="angle-box"></div>
        <div class="panel-top">
            <div class="title-main">
                <Title title="用户累计用水量" />
            </div>
        </div>
        <div class="warp-container">
            <div class="panel-content">
                <div class="make"></div>
                <div class="chart-box">
                    <div class="charts" id="chart_home_cake"></div>
                </div>
            </div>
        </div>
        <div class="tip">
            其他用户用水量计量：600m&sup3;
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
export default {
    name: "WaterConsumption",
    data() {
        return {
            option: null,
            color: ["#64AB28", "#336FCF", "#4FA0F7", "#7053D9", "#05B1AB", "#0052D2", "#7C3735", "#0E9355", "#B3B810", "#349DC8"],
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.drawLine();
    },

    methods: {
        drawLine() {
            this.option = {
                color: ["#64AB28", "#336FCF", "#4FA0F7", "#7053D9", "#05B1AB", "#0052D2", "#7C3735", "#0E9355", "#B3B810", "#349DC8"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}m³ ({d}%)",
                },
                series: [
                    {
                        name: "用水量",
                        type: "pie",
                        // radius: [77, 109],
                        // radius: [50, 109],
                        radius: ["20%", "70%"],
                        roseType: "radius",
                        label: {
                            // show: false,
                            normal: {
                                formatter: "{a|{b}} {a|{d}%}\n{b|▅▅} {a|{c}m³}",
                                backgroundColor: "#011445",
                                rich: {
                                    a:{
                                        color:"#fff",
                                        fontSize: 12,
                                        lineHeight: 12,
                                        align:"left",
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 20,
                                        align:"left",
                                    },
                                },
                            },
                        },
                        labelLine:{
                            normal:{
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        data: [
                            { value: 200, name: "用户3" },
                            { value: 100, name: "用户2" },
                            { value: 200, name: "用户1" },
                            { value: 300, name: "用户10" },
                            { value: 160, name: "用户9" },
                            { value: 180, name: "用户8" },
                            { value: 140, name: "用户7" },
                            { value: 120, name: "用户6" },
                            { value: 170, name: "用户5" },
                            { value: 140, name: "用户4" },
                        ],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            let myChart = this.$echarts.init(document.getElementById("chart_home_cake"));
            // 绘制图表
            myChart.setOption(this.option);

            window.addEventListener("resize", () => {
                myChart.resize();
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
    height: 480px;
    margin-top: 4px;
}
.panel-top {
    // height: 70px;
    padding-top: 25px;
    padding-right: 44px;

    .title-main {
        padding-left: 22px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}
.warp-container {
    display: flex;
    justify-content: center;
    .panel-content {
        position: relative;
        height: 400px;
        width: 500px;
        margin-top: 5px;
    }
    .make {
        width: 370px;
        height: 370px;
        border-radius: 100%;
        border: 2px dashed #82C4D9;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .chart-box {
        width: 500px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .charts {
        width: 500px;
        height: 400px;
    }
}
.tip {
    position: absolute;
    left: 24px;
    bottom: 17px;
    width: 200px;
    height: 25px;
    line-height: 25px;
    padding-left: 8px;
    font-size: 14px;
    color: #327BB9;
    border: 1px solid #327BB9;
    background: #142E60;
}
.angle-box {
    position: absolute;
    width: 41px;
    height: 22px;
    background: rgb(1,20,60);
    left: -18px;
    top: -2px;
    border-bottom: 2px solid #224c72;
    transform: rotate(-54deg);
}
</style>
