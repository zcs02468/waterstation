<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道及水池水位" />
        </div>
        <div class="panel-bodyer">
            <div class="body-content body-top">
                <div class="box-left">
                    <div class="left-title">
                        <span class="iconfont iconbolangn3"></span><span class="text">围场河</span>
                    </div>
                    <div class="left-content">
                        <Container />
                    </div>
                </div>
                <div class="box-right">
                    <div class="orange">南水塔:4.32m</div>
                    <div class="yellow">迎宾三路:3.32m</div>
                    <div>空港三路污水泵站:1.92m</div>
                    <div>北水塔:1.92m</div>
                </div>
            </div>
            <div class="body-content body-center">
                <div class="box-left">
                    <div class="left-title">
                        <span class="iconfont iconbolangn2"></span><span class="text">外围河道</span>
                    </div>
                    <div class="left-content">
                        <Container />
                    </div>
                </div>
                <div class="box-right peripheral">
                    <div><span class="region">东区</span><span>友乐路泵站:-1.01m</span></div>
                    <div><span class="region">西区</span><span>南泵站:-1.01m</span></div>
                    <div><span class="region"></span><span>北泵站:-0.47m</span></div>
                </div>
            </div>
            <div class="body-content body-bottom">
                <div class="box-left">
                    <div class="left-title">
                        <span class="iconfont iconbolangn1"></span><span class="text">调节水池</span>
                    </div>
                    <div class="left-content">
                        <Container />
                    </div>
                </div>
                <div class="box-right adjust">
                    <div><span class="region">南</span><span class="orange">东侧：2.96m</span></div>
                    <div><span class="region"></span><span>西侧:1.39m</span></div>
                    <div><span class="region">北</span><span>东侧:1.39m</span></div>
                    <div><span class="region"></span><span class="yellow">西侧:2.30m</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import Container from "./Container"

export default {
    name: "WaterLevel",
    data() {
        return {};
    },

    components: {
        Title,
        Container
    },

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.orange {
    color: #FF5E3D;
}
.yellow {
    color: #F6BA16;
}
.panel {
    width: 540px;
    height: 607px;
    position: relative;
    margin-top: 23px;
}
.panel-header {
    padding: 21px 0 0 22.5px;
}
.body-content {
    display: flex;
}

.body-top{
    margin-top: 30px;
    .left-content{
        width: 202.5px;
        height: 105.5px;
        margin: 16px 0 0 5px;
    }
}
.body-center{
    margin-top: 40.5px;
    .left-content{
        width: 202.5px;
        height: 77px;
        margin: 18px 0 0 4px;
    }
}
.body-bottom{
    margin-top: 53px;
    .left-content{
        width: 202.5px;
        height: 100px;
        margin: 24px 0 0 4px;
    }
}

.box-left {
    color: #80BCF8;
    margin-left: 21.5px;
    .iconfont {
        font-size: 25px;
        vertical-align: middle;
    }
    .text {
        margin-left: 8px;
        font-size: 16px;
        vertical-align: middle;
    }
    .left-content {
        margin-top: 16px;
        margin-left: 5px;
    }
}
.box-right {
    margin-left: 48px;
        font-size: 16px;
    div {
        width: 244px;
        // font-size: 16px;
        height: 37px;
        line-height: 37px;
    }
}
.peripheral {
    div{
        span:nth-child(1) {
            display: inline-block;
            width: 73px;
        }
    }
    div:nth-child(2) {
        border-top:1px solid #D8D8D8;
    }
}
.adjust {
    div{
        span:nth-child(1) {
            display: inline-block;
            width: 73px;
        }
    }
    div:nth-child(2) {
        border-bottom:1px solid #D8D8D8;
    }
}
</style>
