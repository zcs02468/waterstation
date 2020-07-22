<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <Header />
            <Time />
            <div class="main-box">
                <div class="colum">
                    <OnDuty />
                    <Weather />
                    <Rainfall />
                    <Hydrops />
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
import OnDuty from "../components/flood/OnDuty";
import Weather from "../components/flood/Weather";
import Rainfall from "../components/flood/Rainfall";
import Hydrops from "../components/flood/Hydrops";

import Map from "../components/flood/Map";
import EmergencyInfo from "../components/flood/EmergencyInfo";

import WaterLevel from "../components/flood/WaterLevel";
import Drainage from "../components/flood/Drainage";

export default {
    name: "Home",
    components: {
        Header,

        Time,
        OnDuty,
        Weather,
        Rainfall,
        Hydrops,

        Map,
        EmergencyInfo,

        WaterLevel,
        Drainage,
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
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
