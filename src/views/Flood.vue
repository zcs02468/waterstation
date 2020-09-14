<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="main-head">
                <Header title="防汛监测" />
                <div class="info">
                    <Time />
                    <Phone />
                </div>
            </div>

            <div class="main-box">
                <div class="colum">
                    <OnDuty />
                    <Weather />
                    <Rainfall v-show="!show" />
                    <Hydrops v-show="!show" />
                    <WaterQuality v-show="show" />
                </div>
                <div class="colum center">
                    <Map />
                    <EmergencyInfo />
                </div>
                <div class="colum">
                    <WaterLevel />
                    <Drainage />
                </div>
            </div>
            <!-- 警报声音  http://data.huiyi8.com/2017/gha/03/17/1702.mp3 -->
            <audio
                id="eventAudio"
                src=""
            ></audio>
        </div>
    </div>
</template>

<script>
import Header from "../components/common/Header";

import Time from "../components/flood/Time";
import Phone from "../components/flood/Phone";

import OnDuty from "../components/flood/OnDuty";
import Weather from "../components/flood/Weather";
import Rainfall from "../components/flood/Rainfall";
import Hydrops from "../components/flood/Hydrops";

import WaterQuality from "../components/flood/WaterQuality";

import Map from "../components/flood/Map";
import EmergencyInfo from "../components/flood/EmergencyInfo";

import WaterLevel from "../components/flood/WaterLevel";
import Drainage from "../components/flood/Drainage";

//音频文件
import audioFile from "../assets/audio/jinbao.mp3"

export default {
    name: "Home",
    components: {
        Header,

        Time,
        Phone,

        OnDuty,
        Weather,
        Rainfall,
        Hydrops,
        WaterQuality,

        Map,
        EmergencyInfo,

        WaterLevel,
        Drainage,
    },
    data() {
        return {
            show: false,
            autoUrl: null,
        };
    },
    computed: {
        autoUrlNum() {
            return this.$store.state.flood.autoUrlNum;
        },
    },
    created() {
        if (window.location.hash == "#status") {
            this.show = true;
        }
    },
    methods: {},
    watch: {
        autoUrlNum() {
            let buttonAudio = document.getElementById('eventAudio');
            buttonAudio.setAttribute('src',audioFile)
            buttonAudio.play()
        },
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
        margin: 0px 20px 0 20px;
    }
}
</style>
