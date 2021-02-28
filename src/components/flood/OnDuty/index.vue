<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="icon">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
        </div>
        <div class="text"><span class="tag">当日部总值班：</span> {{this.charageClass}}； <span class="tag">当日平台值班：</span>{{this.platformClass}}</div>
    </div>
</template>

<script>
import comMinxins from "../../common/comMinxins"
import {getTodayDuty} from "../../../axios"
export default {
    name: "OnDuty",
    mixins:[comMinxins],
    data() {
        return {
            platformClass:'', //平台值班
            charageClass:'',  //部总值班
        };
    },

    components: {},

    mounted() {
        this.getData()
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            let [err,res] = await getTodayDuty();
            if( err ) return;
            let data = JSON.parse(res.message);
            this.platformClass = data.platformClass;
            this.charageClass = data.charageClass;
        }
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    display: flex;
    position: relative;
    width: 540px;
    height: 47.5px;
    align-items: center;
    padding-left: 21px;
    margin-top: 23px;
}
.left-container-angle::before {
    display: none !important;
}

.icon {
    height: 17px;
    padding-top: 1.5px;
    margin-right: 7px;
    display: flex;
    vertical-align: middle;
    .block {
        width: 4px;
        height: 14px;
        background: #478df7;
        transform: skewX(20deg);
        margin-right: 3px;
    }
}
.text {
    font-size: 16px;
}
.tag {
    color: rgba(104, 200, 255, 1);
}
</style>
