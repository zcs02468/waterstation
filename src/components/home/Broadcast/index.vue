<template>
    <div class="panel news left-container-angle">
        <div class="angle-box"></div>
        <div class="icon-box">
            <span class="icon">
                <span class="block first"></span>
                <span class="block"></span>
                <span class="block"></span>
                <span class="block"></span>
                <span class="block"></span>
                <span class="block"></span>
                <span class="block"></span>
            </span>
        </div>
        <div class="content">
                    <text-scroll
            :dataList="data"
            scrollType="scroll-left-linear"
        >
        </text-scroll>
            <!-- <div class="wrap">
                <div class="cont">
                    <p class="txt">1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p>
                    <p class="txt">1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import TextScroll from './TextScroll'
export default {
    name: "Broadcast",
    data() {
        return {
            data: [
                {id: 1, text: '滚动内容11111111111111'},
                {id: 2, text: '滚动内容222222222222222'},
                {id: 3, text: '滚动内容33333333333333'},
                {id: 4, text: '滚动内容4444444444444444'}
            ]
        }
    },
    components:{
        TextScroll,
    },
    computed: {
        optionSetting() {
            return {};
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.panel {
    width: 600px;
    height: 100px;
    position: relative;
}
.icon-box {
    margin: 14px 0 0 25px;
}
.icon {
    display: inline-block;
    margin-right: 7px;
    .block {
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #478df7;
        transform: skewX(20deg);
        margin-right: 3px;
    }
    .block.first {
        width: 95px;
    }
}
.content {
    font-size: 16px;
    text-align: center;
    padding: 0 30px;
}
.angle-box {
    // width: 50px;
    // height: 38px;
    // background: #010e2e;
    // position: absolute;
    // right: -26px;
    // top: -11px;
    // border-bottom: 2px solid #224c72;
    // transform: rotate(54deg);
    width: 50px;
    height: 29px;
    background: rgb(1, 20, 60);
    position: absolute;
    right: -23px;
    top: -4px;
    border-bottom: 2px solid #224c72;
    transform: rotate(54deg);
}
</style>
