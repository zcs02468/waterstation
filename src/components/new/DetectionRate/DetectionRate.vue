<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="供水检测率" />
        </div>
        <div class="box">
            <GaugeBox
                v-for="(item, index) in list"
                :title="item.title"
                :num="index + 1"
                :value="item.value"
                :key="item.id"
            />
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import comMinxins from "@/components/common/comMinxins";
import GaugeBox from "./GaugeBox";
import { getDetectionRate } from "@/axios/index";
export default {
    name: "DetectionRate",
    mixins: [comMinxins],
    components: {
        Title,
        GaugeBox,
    },
    data() {
        return {
            list: [
                {
                    title: "西南合建泵站",
                    value: 40,
                    id: 0,
                },
                {
                    title: "东区新北泵站",
                    value: 90,
                    id: 2
                },
            ],
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
            let [err,res] = await getDetectionRate();
            if( err ) return;
            res.data.forEach(item => {
                if( item.regionname == '西区' ){
                    this.list[0].value = parseFloat(item.percentage);
                    this.list[0].id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
                }
                if( item.regionname == '东区北' ){
                    this.list[1].value = parseFloat(item.percentage);
                    this.list[1].id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
                }
            })
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
