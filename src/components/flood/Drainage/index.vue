<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="排水泵站运行情况" />
        </div>
        <div class="panel-body">
            <ul>
                <li>
                    <div></div>
                    <div>开启数量（台）</div>
                    <div>累积排水量（m³）</div>
                </li>
                <li>
                    <div>南调东侧</div>
                    <div>10</div>
                    <div>1000</div>
                </li>
                <li>
                    <div>南调西侧</div>
                    <div>10</div>
                    <div>1000</div>
                </li>
                <li>
                    <div>北调东侧</div>
                    <div>10</div>
                    <div>1000</div>
                </li>
                <li>
                    <div>北调西侧</div>
                    <div>10</div>
                    <div>1000</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Drainage",
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
    width: 540px;
    height: 310px;
    position: relative;
    margin-top: 20px;
}
.panel-header {
    padding: 21.5px 0 0 22.5px;
}
ul{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li {
        display: flex;
    }
}
</style>
