<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道水质  (五类水)" />
        </div>
        <div class="panel-bodyer">
            <div class="content">
                <div class="block">
                    <div class="left">PH<br/></div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">水温<br/>(℃)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：18.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">电导率<br/>(us/cm)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：297.38</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">浊度<br/>(NTU)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">溶解氧<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">ORP<br/>(mv)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：100.78</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">UVAS浓度<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">水中油<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
export default {
    name: "WaterQuality",
    data() {
        return {};
    },

    components: {
        Title,
    },

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    width: 540px;
    height: 667.5px;
    margin-top: 20px;
    position: relative;
}
.panel-header {
    margin: 21.5px 0 0 22.5px;
}
.panel-bodyer {
    margin-top: 17px;
    display: flex;
    justify-content: center;
}
.content {
    width: 491px;
    height: 580px;
    display: flex;
    flex-wrap: wrap;
    .block {
        display: flex;
        border-bottom: 1px solid rgba(87, 189, 255, 0.56);
        height: 145px;
        font-size: 16px;
        text-align: center;
        .left {
            width: 105px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(101, 149, 242, 0.12);
        }
        .right {
            width: 140px;
            height: 100%;
            border: 1px solid rgba(87, 189, 255, 0.56);
            border-top: none;
            border-bottom: none;
            background: rgba(101, 149, 242, 0.24);
            .target {
                border-bottom: 1px solid rgba(87, 189, 255, 0.56);
                height: 72.5px;
                line-height: 72.5px;
            }
            .now {
                height: 72.5px;
                line-height: 72.5px;
            }
        }
        &:nth-child(1),
        &:nth-child(2) {
            border-top: 1px solid rgba(87, 189, 255, 0.56);
        }
        &:nth-child(odd) {
            border-left: 1px solid rgba(87, 189, 255, 0.56);
        }
    }
}
</style>
