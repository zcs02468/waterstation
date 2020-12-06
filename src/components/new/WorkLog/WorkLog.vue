<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="今日值班" />
        </div>
        <div class="carousel-box">
            <el-carousel height="45px" direction="vertical" :interval="5000" :autoplay="true" indicator-position="none" ref="workLog">
                <el-carousel-item v-for="(item,i) in list" :key="`${i}${item.pumpStation}`">
                    <div class="content-box">
                        <div class="img-box">
                            <img src="" alt="">
                        </div>
                        <div class="name">{{item.dutyName}}</div>
                        <div class="phone">{{item.dutyPhone}}</div>
                        <div class="location">{{stationList[item.pumpStati]}}</div>
                        <div class="icon iconfont iconright1" @click="changNext"></div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
// import Container from "./Container";
import comMinxins from "@/components/common/comMinxins"
import { getTodayWaterDuy } from "@/axios/index";
export default {
    name: "WaterUse",
    mixins:[comMinxins],
    data() {
        return {
            list:[],
            stationList: ["",'西区','东区南','东区北']
        };
    },

    async created() {
        this.getData();
    },

    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            // const [res] = await getTodayWaterDuy();
            let res = {
                    "result":"true",
                    "data":[
                        {
                            "dutyDate":"2020-11-29",
                            "dutyName":"老李",
                            "dutyPhone":"13554280987",
                            "pumpStation":"1"
                        },
                        {
                            "dutyDate":"2020-11-29",
                            "dutyName":"老李",
                            "dutyPhone":"13554280987",
                            "pumpStation":"1"
                        },
                        {
                            "dutyDate":"2020-11-29",
                            "dutyName":"老刘",
                            "dutyPhone":"13554289876",
                            "pumpStation":"2"
                        },
                        {
                            "dutyDate":"2020-11-29",
                            "dutyName":"老王",
                            "dutyPhone":"13554290987",
                            "pumpStation":"3"
                        }
                    ],
                    "message":"获取值班人员列表成功"
                }
            this.list = res.data;
            this.list.splice();
        },
        changNext() {
            this.$refs.workLog.next();
        }
    },

    components: {
        Title
    },
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 603px;
    height: 82px;
}

.panel-header {
    // padding: 22px 0 0 23px;
    padding: 16px 0 0 23px;
}
.carousel-box {
    width: 100%;
    height: 45px;
}
.content-box {
    display: flex;
    margin-top: 8px;
    font-size: 18px;
    justify-content: space-around;
    .img-box {
        width: 27px;
        height: 27px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .icon {
        color: #4BDCFF;
        cursor: pointer;
    }
}
</style>
