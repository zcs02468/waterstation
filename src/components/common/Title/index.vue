<!--  -->
<template>
    <div class="title-box">
        <div class="icon">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
        </div>
        <div class="text">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: "Title",

    props: {
        title: {
            type: String,
            default: "",
        },
    },

    data() {
        return {};
    },

    components: {},

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.title-box {
    height: 17px;
    display: flex;
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
        height: 17px;
        font-size: 16px;
        color: #fff;
        line-height: 17px;
        vertical-align: middle;
    }
}
</style>
