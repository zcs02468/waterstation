<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="main-head">
                <Header title="智慧水务供水监测" />
            </div>
            <div class="main-box">
                <div class="colum">
                    <DetectionRate />
                    <WaterUse />
                    <WaterLeave />
                </div>
                <div class="colum center">
                    <WaterConsumption />
                    <DetectionRateLine />
                </div>
                <div class="colum">
                    <WorkLog />
                    <RoadworkInfo />
                    <Effluent />
                    <Pressure />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/common/Header";
import DetectionRate from "@/components/new/DetectionRate"
import WaterUse from "@/components/new/WaterUse"
import WaterLeave from "@/components/new/WaterLeave"

import WaterConsumption from "@/components/home/WaterConsumption"
import DetectionRateLine from "@/components/new/DetectionRateLine"

import WorkLog from "@/components/new/WorkLog"
import RoadworkInfo from "@/components/new/RoadworkInfo"
import Effluent from "@/components/new/Effluent"
import Pressure from "@/components/new/Pressure"

export default {
    name: "Home",
    components: {
        Header,

        DetectionRate,
        WaterUse,
        WaterLeave,

        WaterConsumption,
        DetectionRateLine,

        WorkLog,
        RoadworkInfo,
        Effluent,
        Pressure
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
        margin: 30px 13.5px 0 16px;
    }
}
</style>
