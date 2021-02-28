<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="main-head">
                <Header :title="title"/>
                <div class="info">
                    <Time />
                    <Phone :phoneArr="['22341515', '22344388']" />
                </div>
            </div>

            <div class="main-box">
                <div class="colum">
                    <OnDuty />
                    <WeatherPlus/>
                    <Rainfall v-if="!show" />
                    <WaterQuality v-if="show" />
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
            <audio id="eventAudio" src=""></audio>
        </div>
    </div>
</template>

<script>
import Header from "../components/common/Header";

import Time from "../components/flood/Time";
import Phone from "../components/flood/Phone";

import OnDuty from "../components/flood/OnDuty";
// import Weather from "../components/flood/Weather";
import WeatherPlus from "../components/flood/WeatherPlus";
import Rainfall from "../components/flood/Rainfall";
// import Hydrops from "../components/flood/Hydrops";

import WaterQuality from "../components/flood/WaterQuality";

import Map from "../components/flood/Map";
import EmergencyInfo from "../components/flood/EmergencyInfo";

import WaterLevel from "../components/flood/WaterLevel";
import Drainage from "../components/flood/Drainage";

//音频文件
import audioFile from "../assets/audio/jinbao.mp3";

import { getAlarm } from "../axios";
import { mapMutations } from "vuex";

export default {
    name: "Home",
    components: {
        Header,

        Time,
        Phone,

        OnDuty,
        // Weather,
        Rainfall,
        // Hydrops,
        WaterQuality,
        WeatherPlus,

        Map,
        EmergencyInfo,

        WaterLevel,
        Drainage,
    },
    data() {
        return {
            show: false,
            autoUrl: null,
            title: '防汛监测'
        };
    },
    computed: {
        autoUrlNum() {
            return this.$store.state.flood.autoUrlNum;
        },
    },
    created() {
        if (this.$route.name == "Normal") {
            this.show = true;
            this.title = '生态环境监测';
        }else {
            this.show = false;
            this.title = '防汛监测';
        }
        this.getAlarm();
    },
    methods: {
        ...mapMutations(["SET_ALARM"]),
        async getAlarm() {
            let [err,res] = await getAlarm();
            if( err ) return;
            let data = JSON.parse(res.message);
            // waterIsAlarm	积水声音报警	String	1：报警；0：不报警
            // rainfallIsAlarm	雨量声音报警 	String	1：报警；0：不报警
            // waiweiIsAlarm	外围河道水位声音报警	String	1：报警；0：不报警
            // weichangIsAlarm	围场河水位声音报警	String	1：报警；0：不报警
            // balancingIsAlarm	调节水池水位声音报警	String	1：报警；0：不报警
            this.SET_ALARM(data);
        },
    },
    watch: {
        autoUrlNum() {
            let buttonAudio = document.getElementById("eventAudio");
            buttonAudio.setAttribute("src", audioFile);
            buttonAudio.play();
        }
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
