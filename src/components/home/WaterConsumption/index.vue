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
            其他用户用水量计量：{{expLevel}}m&sup3;
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import {getWaterConsumption} from "../../../axios";
export default {
    name: "WaterConsumption",
    data() {
        return {
            expLevel:0,
            levelList:[],
            option: null,
            color: ["#64AB28", "#336FCF", "#4FA0F7", "#7053D9", "#05B1AB", "#0052D2", "#7C3735", "#0E9355", "#B3B810", "#349DC8"],
        };
    },

    components: {
        Title,
    },

    mounted() {
        this.getData()
        this.drawLine();
    },

    methods: {
        async getData() {
            try {
                let [res] = await getWaterConsumption();
                let data = JSON.parse(res.message);
                let arr =[];
                data.levelList.forEach(item => {
                    arr.push({
                        value: item.total,
                        name: item.devicename
                    })
                });
                this.expLevel = data.expLevel;
                this.levelList = arr;
                this.option.series[0].data = this.levelList;
                this.myChart.setOption(this.option);
            } catch (error) {
                console.log('error', error);
            }
            setTimeout(()=> {
                this.getData()
            },60000)
        },
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
                        minAngle: 20,
                        avoidLabelOverlap: true,
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
                                        lineHeight: 18,
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
                        data: this.levelList,
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
        getAjaxData() {
            return {"result":"true","message":"{\"levelList\":[{\"pageNo\":null,\"pageSize\":null,\"id\":\"能源中心水表2#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"能源中心水表2\",\"total\":284900,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":120891300,\"enddata\":121176200,\"day\":\"20200804\",\"deviceno\":\"1138\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"水表\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"东航城北区西侧生活S-1#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"东航城北区西侧生活S-1\",\"total\":60700,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":61063000,\"enddata\":61123700,\"day\":\"20200804\",\"deviceno\":\"1097\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"水表\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"T2航站楼（合用）S-12#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"T2航站楼（合用）S-12\",\"total\":28800,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":14927300,\"enddata\":14956100,\"day\":\"20200804\",\"deviceno\":\"1087\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD200\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"T2航站楼（合用）S-9#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"T2航站楼（合用）S-9\",\"total\":25300,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":12136000,\"enddata\":12161300,\"day\":\"20200804\",\"deviceno\":\"1093\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD200\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"T2航站楼（合用）S-8#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"T2航站楼（合用）S-8\",\"total\":24700,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":15506400,\"enddata\":15531100,\"day\":\"20200804\",\"deviceno\":\"1091\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD200\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"东航城南区西侧生活S-1#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"东航城南区西侧生活S-1\",\"total\":23900,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":16712300,\"enddata\":16736200,\"day\":\"20200804\",\"deviceno\":\"1098\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"水表\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"国航泊悦酒店(合用)S-1#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"国航泊悦酒店(合用)S-1\",\"total\":23700,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":22700800,\"enddata\":22724500,\"day\":\"20200804\",\"deviceno\":\"1044\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD200\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"西区吉祥航空S-1#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"西区吉祥航空S-1\",\"total\":19200,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":17964900,\"enddata\":17984080,\"day\":\"20200804\",\"deviceno\":\"1028\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD100\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"西区东航机库S-1#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"西区东航机库S-1\",\"total\":17000,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":10516130,\"enddata\":10533080,\"day\":\"20200804\",\"deviceno\":\"1020\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WSD80\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"T2航站楼（合用）S-7#20200804\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"devicename\":\"T2航站楼（合用）S-7\",\"total\":16300,\"regionname\":\"西区\",\"lastUpdateTime\":null,\"lastUpdateAcc\":null,\"startdata\":6381900,\"enddata\":6398200,\"day\":\"20200804\",\"deviceno\":\"1092\",\"typename\":\"累计流量\",\"channelno\":\"331\",\"metername\":\"WPD200\",\"remark\":null,\"createDate_lte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"id_in\":null}],\"expLevel\":46000}"}
        }
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
    min-width: 200px;
    height: 25px;
    line-height: 25px;
    padding-left: 8px;
    padding-right: 8px;
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
