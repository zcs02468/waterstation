<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="气象信息" />
            <!-- <div class="unit"><span>当前平均温度：</span>{{weatherData.temperature}}&#8451;</div> -->
            <div class="unit"><span>当前平均温度：</span>{{parsingNumber(weatherData.temperature)}}&#8451;</div>
        </div>
        <div class="panel-bodyer">
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconwendu2x"></span>
                    <span class="title">温度</span>
                </div>
                <span class="text">{{parsingNumber(weatherData.temperature)}}{{weatherData.temperature_unit}}</span>
            </div>
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconshidu"></span>
                    <span class="title">湿度</span>
                </div>
                <span class="text">{{parsingNumber(weatherData.humidity)}}{{weatherData.humidity_unit}}</span>
            </div>
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconapp_icons--1"></span>
                    <span class="title">PM10</span>
                </div>
                <span class="text"></span>
            </div>
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconapp_icons--"></span>
                    <span class="title">PM2.5</span>
                </div>
                <span class="text">{{parsingNumber(weatherData.aqi)}}</span>
            </div>
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconfengsu1"></span>
                    <span class="title">风速</span>
                </div>
                <span class="text">{{parsingNumber(weatherData.windspeed)}}{{weatherData.windspeed_unit}}</span>
            </div>
            <div class="block">
                <div class="icon-box">
                    <span class="iconfont iconfengxiang"></span>
                    <span class="title">风向</span>
                </div>
                <span class="text">{{weatherData.winddirection}}{{weatherData.winddirection_unit}}</span>
            </div>
            <!-- <div class="block center">
                <span class="iconfont iconfengxiang"></span>
                <span class="text">{{weatherData.winddirection}}{{weatherData.winddirection_unit}}</span>
            </div>
            <div class="block">
                <span class="iconfont iconfengsu"></span>
                <span class="text">{{weatherData.windspeed}}{{weatherData.windspeed_unit}}</span>
            </div>
            <div class="block">
                <span class="iconfont iconkongqizhiliangjianceshujufenxi"></span>
                <span class="text">{{weatherData.aqi}}</span>
            </div>
            <div class="block center">
                <span class="iconfont iconkongqizhiliang1"></span>
                <span class="text">{{weatherData.aqi_level_name}}</span>
            </div> -->
            <!-- <div class="block">
                <span class="iconfont iconkongqizhiliang1"></span>
                <span class="text">{{weatherData.aqi_level_name}}</span>
            </div> -->
            
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getWeather} from "../../../axios"
export default {
    name: "WeatherPlus",
    mixins:[comMinxins],
    data() {
        return {
            weatherData:{
                temperature:25,//温度 -
                humidity:40,	//湿度-
                windspeed:2,	//风速-
                winddirection:"东北风",	//风向-
                temperature_unit:"",	//温度单位-
                humidity_unit:'',	//湿度单位-
                windspeed_unit:'',	//风速单位-
                winddirection_unit:'',	//风向单位-
                aqi:'',	//空气质量指数-
                aqi_level:'',	//空气质量等级
                aqi_level_name:'',	//空气质量等级名称
                aqi_color:'',	//空气质量等级颜色

                // 湿度     风向   风速    空气质量指数  空气质量+颜色
            }
        };
    },

    components: {
        Title,
    },

    created() {
        this.getData()
    },

    methods: {
        parsingNumber(num) {
            return Math.round( Number(num) * 100) / 100
        },
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getWeather();
            let data = JSON.parse(res.message);
            Object.assign(this.weatherData, data)
            // temperature	温度
            // humidity	湿度
            // windspeed	风速
            // winddirection	风向
            // temperature_unit	温度单位
            // humidity_unit	湿度单位
            // windspeed_unit	风速单位
            // winddirection_unit	风向单位
            // aqi	空气质量指数
            // aqi_level	空气质量等级
            // aqi_level_name	空气质量等级名称
            // aqi_color	空气质量等级颜色
        }
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 540px;
    // height: 184px;
    height: 347px;
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
    text-align: center;
}
.text {
    font-size: 14px;
    vertical-align: middle;
}
.panel-bodyer {
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
        height: 102px;
        width: 175px;
        // padding-left: 32px;
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        padding-left: 60px;
    }
    .icon-box {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        margin-right: 53px;
        .title {
            margin-top: 15px;
            text-align: center;
        }
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
