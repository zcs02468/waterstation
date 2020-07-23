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
import Title from "../../common/Title"
export default {
    name: "Drainage",
    data() {
        return {};
    },

    components: {
        Title
    },

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
%ul-line {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    background: #5075A6;
    top: 0;
}
ul{
    width: 498px;
    position: relative;
    padding-left: 21px;
    margin-top: 15px;
    &::before{
        @extend %ul-line;
        left: 166px;
    }
    &::after{
        @extend %ul-line;
        right: 166px;
    }
    li {
        width: 100%;
        height: 34px;
        display: flex;
        // align-items: center;
        margin-bottom: 15px;
        border: 1px solid #57BDFF;
        div{
            width: 166px;
            height: 34px;
            font-size: 16px;
            line-height: 34px;
            text-align: center;
        }
    }
}
</style>
