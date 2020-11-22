<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="今日值班" />
        </div>
        <div class="content-box">
            <div class="img-box">
                <img src="" alt="">
            </div>
            <div class="name">张三</div>
            <div class="phone">18612345678</div>
            <div class="location">东区南</div>
            <div class="icon iconfont iconright1"></div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
// import Container from "./Container";
import comMinxins from "@/components/common/comMinxins"
import { getDetectionRate } from "@/axios/index";
export default {
    name: "WaterUse",
    mixins:[comMinxins],
    data() {
        return {
            water_detectionRate_east: "90%",
            water_detectionRate_west: "90%",
        };
    },

    async created() {

    },

    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            const [res] = await getDetectionRate();
            let message = JSON.parse(res.message);
            this.water_detectionRate_west = message.water_detectionRate_west;
            this.water_detectionRate_east = message.water_detectionRate_east;
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
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
    }
}
</style>
