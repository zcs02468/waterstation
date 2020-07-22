<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="应急看板" />
        </div>
        <div class="panel-bodyer">
            <ul>
                <li v-for="(item, i) in 6" :key="`EmergencyInfo${i}`"><span>电话{{ item }}:</span>&nbsp;&nbsp;13888888288</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";

export default {
    name: "EmergencyInfo",
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
    position: relative;
    width: 756.5px;
    height: 184px;
    margin-top: 20px;
}
.panel-header {
    padding: 15px 0 0 22.5px;
}

ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 0 55px;
}
li {
    font-size: 18px;
    width: 180.5px;
    margin-top: 30px;
    &:nth-child(2),
    &:nth-child(5) {
        margin-left: 50px;
        margin-right: 50px;
    }
}
</style>
