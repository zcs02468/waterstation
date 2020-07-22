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
                <div class="box-right"></div>
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
                <div class="box-right"></div>
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
                <div class="box-right"></div>
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
.panel {
    width: 540px;
    height: 607px;
    position: relative;
}
.panel-header {
    padding: 21px 0 0 22.5px;
}
.body-content {
    display: flex;
}
.box-left {
    color: #80BCF8;
    margin-top: 40.5px;
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
        width: 202.5px;
        height: 105.5px;
    }
}
</style>
