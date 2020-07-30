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
            <!-- <text-scroll :dataList="data" scrollType="scroll-left-linear">
            </text-scroll> -->
            <!-- <div class="wrap">
                <div class="cont">
                    <p class="txt">1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p>
                    <p class="txt">1.文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。文字如果超出了宽度自动向左滚动文字如果超出了宽度自动向左滚动。</p>
                </div>
            </div> -->

            <div class="TextScroll">
                <ul>
                    <li v-for="item in dataList" :key="item.id">
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import TextScroll from "./TextScroll";
import { getBroadcastContent } from "../../../axios";
export default {
    name: "Broadcast",
    data() {
        return {
            dataList: [
                {
                    id: 1,
                    text:
                        "滚动内容1111滚动内容滚动内容滚动内容滚动内容滚动内容滚动内容11111111111111111111111111111111111111",
                },
            ],
        };
    },
    components: {
        TextScroll,
    },

    created() {
        this.getData();
    },

    methods: {
        async getData() {
            const [res] = await getBroadcastContent();
            let data = JSON.parse(res.message);
            this.dataList.splice(0, 1, {
                id: Math.random() * 100,
                text: data.broadcastContent,
            });
            // this.dataList.push({
            //     id: Math.random() * 100,
            //     text: data.broadcastContent,
            // });
        },
    },
    computed: {},
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

.TextScroll {
    width: 100%;
}
.TextScroll ul {
    position: relative;
    width: 100%;
    height: 42px;
    overflow: hidden;
}
.TextScroll li {
    // width: 100%;
    height: 42px;
    line-height: 42px;
    overflow: hidden;
    position: absolute;
    color: #fff;
    min-width: 100%;
}

.TextScroll li p {
    font-size: 16px;
    padding: 0 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    left: -100%;
    animation: marginLeft 16s linear infinite;
}

@keyframes marginLeft {
    0% {
        left: 100%;
    }

    50% {
        left: 0%;
    }

    100% {
        left: -100%;
    }
}
</style>
