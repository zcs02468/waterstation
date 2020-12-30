<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-top">
            <div class="title-main">
                <Title title="泵站供水量" />
                <div class="select-box">
                    <span :class="selectIndex == 0 ? 'select' : ''" @click="selectClick(0)">日</span>
                    <span :class="selectIndex == 1 ? 'select' : ''" @click="selectClick(1)">周</span>
                    <span :class="selectIndex == 2 ? 'select' : ''" @click="selectClick(2)">月</span>
                </div>
            </div>
            <div class="unit">供水总量：{{waterVolumeData[selectIndex]}} m<sup>3</sup></div>
        </div>
        <div class="warp-container">
            <div class="charts" id="chart_water_supply"></div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getWaterVolume} from "../../../axios/index"
import {mapMutations} from "vuex"
export default {
    name: "WaterSupply",
    mixins:[comMinxins],
    data() {
        return {
            option: null,
            selectIndex: 0,
            xAxisData: [
                [],
                [],
                [],
            ],
            waterData: [
                [],
                [],
                [],
            ],
            waterVolumeData: [
                0,
                0,
                0
            ],
            // xAxisData: [
            //     ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"],
            //     ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            //     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            // ],
            // waterData: [
            //     [480, 220, 270, 330, 370, 290, 150, 220, 360, 70, 290],
            //     [480, 220, 270, 330, 370, 290, 150],
            //     [480, 220, 270, 330, 370, 290, 150, 220, 360, 70, 290, 300],
            // ],
            monthArr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        };
    },

    components: {
        Title,
    },
    
    

    mounted() {
        this.getData()
        // 基于准备好的dom，初始化this.$echarts实例
        this.myChart = this.$echarts.init(document.getElementById("chart_water_supply"));
        this.drawLine();
    },

    methods: {
        ...mapMutations(["SET_CONSUMPTION_TYPE"]),
        updateData() {
            this.getData();
        },
        async getData() {
            let [err,res] = await getWaterVolume();
            let data = JSON.parse(res.message);
            let hourX = [],
                houtY = [],
                dayX = [],
                dayY = [],
                monthX = [],
                monthY = [];
            let hourSum = 0;
            let daySum = 0;
            let monthSum = 0;
            data.hourList.reverse();
            data.hourList.forEach(item => {
                hourSum += Number(item.waterVolume);
                hourX.push( `${item.hour}:00` );
                houtY.push( item.waterVolume );
            });
            data.dayList.reverse();
            data.dayList.forEach(item => {
                daySum += Number(item.waterVolume);
                let time = item.gatherDay.split(' ')[0].split('-')[2];
                dayX.push( time );
                dayY.push( item.waterVolume );
            });
            data.monthList.reverse();
            data.monthList.forEach(item => {
                monthSum += Number(item.waterVolume);
                let month = Number(item.month);
                monthX.push( this.monthArr[month] );
                monthY.push( item.waterVolume );
            });
            this.xAxisData[0]= hourX;
            this.xAxisData[1]= dayX;
            this.xAxisData[2]= monthX;
            
            this.waterData[0]= houtY;
            this.waterData[1]= dayY;
            this.waterData[2]= monthY;

            this.$set(this.waterVolumeData, 0, hourSum)
            // this.waterVolumeData[0] = hourSum;
            this.waterVolumeData[1] = daySum;
            this.waterVolumeData[2] = monthSum;
            this.selectClick(this.selectIndex);
            // setTimeout(()=> {
            //     this.getData()
            // },60000)
        },
        selectClick(index) {
            this.selectIndex = index;
            this.option.xAxis.data = this.xAxisData[index];
            this.option.series[0].data = this.waterData[index];
            this.myChart.setOption(this.option);
            this.SET_CONSUMPTION_TYPE(index);
        },
        getdefaultData() {
            let fontSize = document.querySelector("html").style.fontSize;
            fontSize = fontSize.substring(0, fontSize.length - 2);
            let sum = Math.round((Number(fontSize) / 80) * 100) / 100;

            this.defaultData = {
                width: 18 * sum, //柱宽
                zWidth: 8 * sum, //阴影折角宽
                zHeight: 6 * sum, //阴影折角高
                radius: 9 * sum, //柱半径
            };
        },
        drawLine() {
            this.getdefaultData();
            // let fontSize = document.querySelector("html").style.fontSize;
            // fontSize = fontSize.substring(0, fontSize.length - 2);
            // let sum = Math.round((Number(fontSize) / 80) * 100) / 100;
            let defaultData = this.defaultData;
            //     width: 18 * sum, //柱宽
            //     zWidth: 8 * sum, //阴影折角宽
            //     zHeight: 6 * sum, //阴影折角高
            //     radius: 9 * sum, //柱半径
            // };

            const MyCubeRect = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                    // width: 18, //柱宽
                    // zWidth: 8, //阴影折角宽
                    // zHeight: 6, //阴影折角高
                },
                buildPath: function(ctx, shape) {
                    const api = shape.api;
                    const xAxisPoint = api.coord([shape.xValue, 0]);
                    const p0 = [shape.x, shape.y];
                    // const p1 = [shape.x - 9, shape.y];
                    // const p4 = [shape.x + 9, shape.y];
                    // const p2 = [xAxisPoint[0] - 9, xAxisPoint[1]];
                    // const p3 = [xAxisPoint[0] + 9, xAxisPoint[1]];
                    const p1 = [shape.x - defaultData.radius, shape.y];
                    const p4 = [shape.x + defaultData.radius, shape.y];
                    const p2 = [xAxisPoint[0] - defaultData.radius, xAxisPoint[1]];
                    const p3 = [xAxisPoint[0] + defaultData.radius, xAxisPoint[1]];
                    ctx.moveTo(p0[0], p0[1]); //0
                    ctx.lineTo(p1[0], p1[1]); //1
                    ctx.lineTo(p2[0], p2[1]); //2
                    ctx.lineTo(p3[0], p3[1]); //3
                    ctx.lineTo(p4[0], p4[1]); //4
                    ctx.lineTo(p0[0], p0[1]); //0
                    ctx.closePath();
                },
            });
            const MyCubeShadow = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                    // width: 18,
                    // zWidth: 8,
                    // zHeight: 6,
                },
                buildPath: function(ctx, shape) {
                    const api = shape.api;
                    const xAxisPoint = api.coord([shape.xValue, 0]);
                    // const p0 = [shape.x, shape.y];
                    // const p1 = [shape.x - 9, shape.y];
                    const p4 = [shape.x + defaultData.radius, shape.y];
                    const p6 = [shape.x + defaultData.radius + defaultData.zWidth, shape.y - defaultData.zHeight];
                    // const p7 = [shape.x - 9 + 8, shape.y - 6];
                    const p3 = [xAxisPoint[0] + defaultData.radius, xAxisPoint[1]];
                    const p5 = [xAxisPoint[0] + defaultData.radius + defaultData.zWidth, xAxisPoint[1] - defaultData.zHeight];
                    ctx.moveTo(p4[0], p4[1]); //4
                    ctx.lineTo(p3[0], p3[1]); //3
                    ctx.lineTo(p5[0], p5[1]); //5
                    ctx.lineTo(p6[0], p6[1]); //6
                    ctx.lineTo(p4[0], p4[1]); //4
                    ctx.closePath();
                },
            });
            const MyCubTop = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0,
                    // width: 18,
                    // zWidth: 8,
                    // zHeight: 6,
                },
                buildPath: function(ctx, shape) {
                    // const api = shape.api;
                    // const xAxisPoint = api.coord([shape.xValue, 0]);
                    // const p0 = [shape.x, shape.y];
                    const p1 = [shape.x - defaultData.radius, shape.y];
                    const p4 = [shape.x + defaultData.radius, shape.y];
                    const p6 = [shape.x + defaultData.radius + defaultData.zWidth, shape.y - defaultData.zHeight];
                    const p7 = [shape.x - defaultData.radius + defaultData.zWidth, shape.y - defaultData.zHeight];
                    ctx.moveTo(p4[0], p4[1]); //4
                    ctx.lineTo(p6[0], p6[1]); //6
                    ctx.lineTo(p7[0], p7[1]); //7
                    ctx.lineTo(p1[0], p1[1]); //1
                    ctx.lineTo(p4[0], p4[1]); //4
                    ctx.closePath();
                },
            });
            this.$echarts.graphic.registerShape("MyCubeRect", MyCubeRect);
            this.$echarts.graphic.registerShape("MyCubeShadow", MyCubeShadow);
            this.$echarts.graphic.registerShape("MyCubTop", MyCubTop);
            this.option = {
                textStyle: {
                    color: "#fff",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: "0%",
                    right: "0%",
                    bottom: "0%",
                    top: "3%",
                    containLabel: true,
                    show: true,
                    backgroundColor: "#0B2248",
                    borderWidth: 0,
                    borderColor: "transparent",
                },
                xAxis: {
                    type: "category",
                    data: this.xAxisData[this.selectIndex],
                    axisTick: {
                        alignWithLabel: true,
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
                yAxis: {
                    type: "value",
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#526795"],
                            width: 1,
                            type: "solid",
                        },
                    },
                    axisTick: {
                        //y轴刻度线
                        show: false,
                    },
                    axisLine: {
                        //y轴
                        show: false,
                    },
                },
                series: [
                    {
                        type: "custom",
                        renderItem: function(params, api) {
                            let location = api.coord([api.value(0), api.value(1)]);
                            return {
                                type: "group",
                                children: [
                                    {
                                        type: "MyCubeRect",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                        },
                                        style: {
                                            fill: "#3D79E7",
                                        },
                                    },
                                    {
                                        type: "MyCubeShadow",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                        },
                                        style: {
                                            fill: "#174DAF",
                                        },
                                    },
                                    {
                                        type: "MyCubTop",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                        },
                                        style: {
                                            fill: "#66ADFF",
                                        },
                                    },
                                ],
                            };
                        },
                        data: this.waterData[this.selectIndex],
                    },
                ],
            };
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
.panel {
    position: relative;
    width: 600px;
    // height: 312px;
    // margin-top: 20px;
    height: 307px;
    margin-top: 15px;
}
.panel-top {
    height: 70px;
    padding-top: 25px;
    padding-right: 40px;
    .title-main {
        padding-left: 22px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}

.unit {
    text-align: right;
    margin-top: 5px;
    font-size: 10px;
    sup {
        font-size: 10px;
    }
}
.select-box {
    display: inline-block;
    color: #fff;
    vertical-align: top;
    right: 54px;
    span:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        transform: skewX(-22deg);
        border: 1px solid #434cd3;
        z-index: -1;
        background: transparent;
    }
    .select {
        &:before {
            border: 1px solid #52d2dc;
            background: #21607c;
        }
    }
    span {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 14px;
        z-index: 0;
        margin: 0 1px;
        text-align: center;
        font-size: 10px;
        line-height: 14px;
        cursor: pointer;
    }
}

.warp-container {
    .charts {
        left: 55px;
        height: 227px;
        width: 500px;
    }
}
</style>
