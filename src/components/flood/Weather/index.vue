<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="气象信息" />
            <div class="unit"><span>当前平均温度：</span>25&#8451;</div>
        </div>
        <div class="panel-bodyer">
            <div class="block">
                <span class="iconfont iconwendu2x"></span>
                <span class="text">20&#8451;-26&#8451;</span>
            </div>
            <div class="block center">
                <span class="iconfont iconshidu"></span>
                <span class="text">40%</span>
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
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import {getWeather} from "../../../axios"
export default {
    name: "Weather",
    data() {
        return {};
    },

    components: {
        Title,
    },

    created() {
        this.getData()
    },

    methods: {
        async getData() {
            let [res] = await getWeather();
            console.log( 'resres', res );
        }
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
        width: 159px;
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
