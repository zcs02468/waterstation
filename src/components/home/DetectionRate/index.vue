<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="供水检测率" />
        </div>
        <div class="content-box">
            <Container type="east" btnText="东区" :percentage="water_detectionRate_east" />
            <Container type="west" btnText="西区" :percentage="water_detectionRate_west" />
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import Container from "./Container";
import comMinxins from "../../common/comMinxins"
import { getDetectionRate } from "../../../axios/index";
export default {
    name: "DetectionRate",
    mixins:[comMinxins],
    data() {
        return {
            water_detectionRate_east: "90%",
            water_detectionRate_west: "90%",
        };
    },

    async created() {
        // this.$axios.get("http://47.110.226.205:8980/smartEnergy/detectionrate").then((res) => {
        //     let message = JSON.parse(res.data.message);
        //     this.water_detectionRate_west = message.water_detectionRate_west;
        //     this.water_detectionRate_east = message.water_detectionRate_east;
        // });
        this.getData();
    },

    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            let [err,res] = await getDetectionRate();
            if( err ) return;
            let message = JSON.parse(res.message);
            this.water_detectionRate_west = message.water_detectionRate_west;
            this.water_detectionRate_east = message.water_detectionRate_east;
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
        }
    },

    components: {
        Title,
        Container,
    },
};
</script>
<style lang="scss" scoped>
.detection-rate {
    position: relative;
    width: 600px;
    // height: 221px;
    height: 215px;
    margin-top: 15px;
}

.panel-header {
    // padding: 22px 0 0 23px;
    padding: 16px 0 0 23px;
        // padding: 0.2rem 0 0 0.2875rem;
}
.content-box {
    display: flex;
    justify-content: center;
    margin-top: 8px;
}
</style>
