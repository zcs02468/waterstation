<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="供水检测率" />
        </div>
        <div class="box">
            <GaugeBox v-for="(item,index) in list" :title="item.title" :num="index+1" :value="item.value" :key="`DetectionRate${item}`"/>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import comMinxins from "@/components/common/comMinxins";
import GaugeBox from "./GaugeBox"
import { getDetectionRate } from "@/axios/index";
export default {
    name: "DetectionRate",
    mixins: [comMinxins],
    components: {
        Title,
        GaugeBox
    },
    data() {
        return {
            list:[
                {
                    title:'西南合建泵站',
                    value: 40,
                },
                {
                    title:'东区南水塔',
                    value: 83,
                },
                {
                    title:'东区新北泵站',
                    value: 90,
                },
            ]
        };
    },

    async created() {
        this.getData();
        
    },
    mounted() {
        // this.drawLine()
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {

        },
    },
};
</script>
<style lang="scss" scoped>
.detection-rate {
    position: relative;
    width: 600px;
    // height: 221px;
    height: 185px;
    // margin-top: 15px;
}

.panel-header {
    padding: 16px 0 0 23px;
}
.box {
    display: flex;
    justify-content: center;
}
</style>
