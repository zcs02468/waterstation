<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="气象信息" />
            <div class="unit">
                <span>当前平均温度：</span
                >{{ parsingNumber(weatherData.temperature.value) }}&#8451;
            </div>
        </div>
        <div class="panel-bodyer">
            <div class="block">
                <span class="iconfont iconwendu2x"></span>
                <span class="text"
                    >{{ parsingNumber(weatherData.temperature.value)
                    }}{{ weatherData.temperature.unit }}</span
                >
            </div>
            <div class="block center">
                <span class="iconfont iconshidu"></span>
                <span class="text"
                    >{{ parsingNumber(weatherData.humidity.value)
                    }}{{ weatherData.humidity.unit }}</span
                >
            </div>
            <div class="block">
                <span class="iconfont iconapp_icons--1"></span>
                <span class="text">{{ parsingNumber(weatherData.pm10.value)
                    }}{{ weatherData.pm10.unit }}</span>
            </div>
            <div class="block">
                <span class="iconfont iconapp_icons--"></span>
                <span class="text">{{ parsingNumber(weatherData.pm25.value)
                    }}{{ weatherData.pm25.unit }}</span>
            </div>
            <div class="block center">
                <span class="iconfont iconfengsu1"></span>
                <span class="text"
                    >{{ parsingNumber(weatherData.windspeed.value)
                    }}{{ weatherData.windspeed.unit }}</span
                >
            </div>
            <div class="block center">
                <span class="iconfont iconfengxiang"></span>
                <span class="text"
                    >{{ weatherData.winddirection.value
                    }}{{ weatherData.winddirection.unit }}</span
                >
            </div>
            <!-- <div class="block">
                <span class="iconfont iconkongqizhiliang1"></span>
                <span class="text">{{weatherData.aqi_level_name}}</span>
            </div> -->
            <!-- <div class="block">
                <span class="iconfont iconshidu"></span>
                <span class="text">40%</span>
            </div>
            <div class="block center">
                <span class="iconfont iconwendu2x"></span>
                <span class="text">20&#8451;-26&#8451;</span>
            </div>
            <div class="block">
                <span class="iconfont iconkongqizhiliang1"></span>
                <span class="text">良好</span>
            </div>
            <div class="block">
                <span class="iconfont iconfengsufengxiang"></span>
                <span class="text">东北风二级</span>
            </div>
            <div class="block center">
                <span class="iconfont iconyanjing"></span>
                <span class="text">1000m</span>
            </div>
            <div class="block">
                <span class="iconfont iconqitalei_ziranzaihai"></span>
                <span class="text">低</span>
            </div> -->
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getWeather } from "../../../axios";
export default {
    name: "Weather",
    mixins: [comMinxins],
    data() {
        return {
            weatherData: {
                temperature: {
                    name: "温度",
                    value: 23.10029,
                    unit: "℃",
                },
                humidity: {
                    name: "湿度",
                    value: 95.15361,
                    unit: "mg/l",
                },
                pm10: {
                    name: "PM10",
                    value: 95.15361,
                    unit: "mg/m³",
                },
                pm25: {
                    name: "PM2.5",
                    value: 95.15361,
                    unit: "mg/m³",
                },
                windspeed: {
                    name: "风速",
                    value: 95.15361,
                    unit: "m/s",
                },
                winddirection: {
                    name: "风向",
                    value: '',
                    unit: "",
                },
            },
            codingList:{
                "a01001":"temperature",
                "a01002":"humidity",
                "a34002":"pm10",
                "a34004":"pm25",
                "a01007":"windspeed",
            }
        };
    },

    components: {
        Title,
    },

    created() {
        this.getData();
    },

    methods: {
        parsingNumber(num) {
            return Math.round(Number(num) * 100) / 100;
        },
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getWeather();
            // let res = {
            //     result: "true",
            //     data: [
            //         {
            //             monitoringFactor: "湿度",
            //             factorCoding: "a01002",
            //             factorValue: 95.15361,
            //             factorUnit: "mg/l",
            //         },
            //         {
            //             monitoringFactor: "风速",
            //             factorCoding: "a01007",
            //             factorValue: 1.03294,
            //             factorUnit: "m/s",
            //         },
            //         {
            //             monitoringFactor: "PM10",
            //             factorCoding: "a34002",
            //             factorValue: 0.0262,
            //             factorUnit: "mg/m³",
            //         },
            //         {
            //             monitoringFactor: "温度",
            //             factorCoding: "a01001",
            //             factorValue: 23.10029,
            //             factorUnit: "℃",
            //         },
            //         {
            //             monitoringFactor: "PM2.5",
            //             factorCoding: "a34004",
            //             factorValue: 0.0199,
            //             factorUnit: "mg/m³",
            //         },
            //     ],
            //     message: "请求成功",
            // };
            
            // console.log("11111111111111", res);
            // let data = JSON.parse(res.message);
            let data = res.data;
            data.forEach(item => {
                let key = this.codingList[item.factorCoding]
                this.weatherData[key].name = item.monitoringFactor;
                this.weatherData[key].value = item.factorValue;
                this.weatherData[key].unit = item.factorUnit;
            })
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 540px;
    height: 184px;
    margin-top: 20px;
}
.panel-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0 0 22.5px;
    .unit {
        padding-right: 67px;
        font-size: 15px;
        span {
            color: #68c8ff;
        }
    }
}
.iconfont {
    font-size: 35px;
    vertical-align: middle;
    margin-right: 10px;
}
.text {
    font-size: 14px;
    vertical-align: middle;
}
.panel-bodyer {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    .center {
        width: 182px;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 9px;
            display: inline-block;
            height: 18px;
            width: 1px;
            background: rgba(109, 214, 255, 1);
        }
        &::after {
            content: "";
            position: absolute;
            right: 0;
            top: 9px;
            display: inline-block;
            height: 18px;
            width: 1px;
            background: rgba(109, 214, 255, 1);
        }
    }
    .block {
        height: 36px;
        width: 175px;
        margin-bottom: 18.5px;
        padding-left: 32px;
    }
}
// .left-line {
//     position: absolute;
//     left: 0;
//     top: 9px;
//     display: inline-block;
//     height: 18px;
//     width: 1px;
//     background: red;
// }
// .right-line {
//     position: absolute;
//     right: 0;
//     top: 9px;
//     display: inline-block;
//     height: 18px;
//     width: 1px;
//     background: red;
// }
</style>
