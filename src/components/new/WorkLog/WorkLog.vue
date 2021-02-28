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
                            <!-- <img src="" alt=""> -->
                            <i class="iconfont iconshigongrenyuan"></i>
                        </div>
                        <div class="name">{{item.dutyName}}</div>
                        <div class="phone">{{item.dutyPhone}}</div>
                        <div class="location">{{item.pumpStation}}</div>
                        <div class="icon iconfont iconright1" @click="changNext"></div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
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
            let [err,res] = await getTodayWaterDuy();
            if( err ) return;
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
        .iconfont {
            font-size: 24px;
        }
    }
    .icon {
        color: #4BDCFF;
        cursor: pointer;
    }
}
</style>
