<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="main-head">
                <Header title="供水监测" />
                <div class="info">
                    <Time />
                    <Phone :phoneArr="['22369831', '22369800']" />
                </div>
            </div>
            <!-- <Header title="供水监测"/> -->
            <div class="main-box">
                <div class="colum">
                    <Broadcast />
                    <DetectionRate />
                    <WaterSupply />
                    <Effluent />
                </div>
                <div class="colum center">
                    <WaterLevel />
                    <RoadworkInfo />
                </div>
                <div class="colum">
                    <WaterConsumption />
                    <Pressure />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/common/Header";

import Time from "../components/flood/Time";
import Phone from "../components/flood/Phone";

import Broadcast from "../components/home/Broadcast";
import WaterSupply from "../components/home/WaterSupply";
import DetectionRate from "../components/home/DetectionRate";
import Effluent from "../components/home/Effluent";

import WaterLevel from "../components/home/WaterLevel";
import RoadworkInfo from "../components/home/RoadworkInfo";

import WaterConsumption from "../components/home/WaterConsumption";
import Pressure from "../components/home/Pressure";

export default {
    name: "Home",
    components: {
        Header,

        Time,
        Phone,

        Broadcast,
        DetectionRate,
        WaterSupply,
        Effluent,

        WaterLevel,
        RoadworkInfo,

        WaterConsumption,
        Pressure,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: space-between;
}
.main-box {
    min-width: 1920px;
    padding: 0 20px;
    display: flex;
    .column {
        flex: 3;
    }
    .center {
        margin: 30px 20px 0 20px;
    }
}
</style>
