<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="main-head">
                <Header title="智慧水站防汛检测" />
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
        };
    },
    computed: {},
    created() {
        if (window.location.hash == '#111') {
            this.show = true;
        }
    },
    mounted() {},
    methods: {},
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
