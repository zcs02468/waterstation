<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="icon">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
        </div>
        <div class="text"><span class="tag">当日值班：</span> 部总值班 张三； <span class="tag">平台值班：</span>李四</div>
    </div>
</template>

<script>
export default {
    name: "OnDuty",
    data() {
        return {};
    },

    components: {},

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    display: flex;
    position: relative;
    width: 540px;
    height: 47.5px;
    align-items: center;
    padding-left: 21px;
}
.left-container-angle::before {
    display: none !important;
}

.icon {
    height: 17px;
    padding-top: 1.5px;
    margin-right: 7px;
    display: flex;
    vertical-align: middle;
    .block {
        width: 4px;
        height: 14px;
        background: #478df7;
        transform: skewX(20deg);
        margin-right: 3px;
    }
}
.text {
    font-size: 16px;
}
.tag {
    color: rgba(104, 200, 255, 1);
}
</style>
