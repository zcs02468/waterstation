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
            <audio id="indexEventAudio" src="" loop></audio>
        </div>
        <alarmDialog @close="closeAlarmDialog" v-if="isShowAlarmDialog"></alarmDialog>
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
//音频文件
import audioFile from "../assets/audio/jinbao.mp3";

import alarmDialog from "../components/common/alarmDialog"

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
        Pressure,

        alarmDialog
    },
    data() {
        return {
            isShowAlarmDialog: false
        };
    },
    computed: {
        autoUrlNum() {
            return this.$store.state.home.autoUrlNum;
        },
    },
    watch: {
        autoUrlNum() {
            let buttonAudio = document.getElementById("indexEventAudio");
            buttonAudio.setAttribute("src", audioFile);
            buttonAudio.play();
            this.isShowAlarmDialog = true
        }
    },
    methods:{
        closeAlarmDialog() {
            this.isShowAlarmDialog = false
        }
    }
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
