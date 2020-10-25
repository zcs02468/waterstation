<template>
    <div class="panel right-container-angle">
        <div class="angle-box"></div>
        <div class="content">
            <span class="iconfont icondianhua"></span>
            <span class="text">
                <!-- <span>22369831</span>
                <span>22369800</span> -->
                <span v-for="item in phoneArr" :key="item">{{ item }}</span>
            </span>
            <div class="icon-box">
                <span class="icon">
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block first"></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Time",
    props: {
        phoneArr: {
            type: Array,
        },
    },
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 600px;
    height: 41px;
    margin-right: 20px;
}
.right-container-angle:before {
    display: none !important;
}
.angle-box {
    position: absolute;
    width: 50px;
    height: 29px;
    background: #01143c;
    left: -23px;
    top: -4px;
    border-bottom: 2px solid #224c72;
    transform: rotate(-54deg);
}
.content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding-right: 21.5px;
    .text {
        font-size: 16px;
        margin-left: 3px;
        span:nth-child(1) {
            margin-right: 30px;
        }
    }
    .iconfont {
        font-size: 18px;
    }
}
.icon-box {
    margin: 0px 0 0 15px;
}
.icon {
    display: inline-block;
    margin-right: 7px;
    .block {
        display: inline-block;
        width: 4px;
        height: 14px;
        background: #478df7;
        transform: skewX(-20deg);
        margin-right: 3px;
        vertical-align: middle;
    }
    .block.first {
        width: 95px;
    }
}
</style>
