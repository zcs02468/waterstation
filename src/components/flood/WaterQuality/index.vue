<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道水质  (五类水)" />
        </div>
        <div class="panel-bodyer">
            <div class="content">
                <div class="block" v-for="item in list" :key="item.id">
                    <div class="left">{{item.type}}<br/>{{item.unit}}</div>
                    <div class="right">
                        <div class="target">标准：{{item.standardJudge}}{{item.standardValue}}</div>
                        <div class="now" :class="{ select: item.isSelect }">当前：{{item.currentValue}}</div>
                    </div>
                </div>
                <!-- <div class="block">
                    <div class="left">PH<br/></div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">水温<br/>(℃)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：18.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">电导率<br/>(us/cm)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：297.38</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">浊度<br/>(NTU)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">溶解氧<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">ORP<br/>(mv)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now select">当前：100.78</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">UVAS浓度<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now select">当前：8.10</div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">水中油<br/>(mg/L)</div>
                    <div class="right">
                        <div class="target">标准：>9.10</div>
                        <div class="now">当前：8.10</div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getRiverWaterQuality} from "../../../axios/index"
export default {
    name: "WaterQuality",
    mixins:[comMinxins],
    data() {
        return {
            list:[]
        };
    },

    components: {
        Title,
    },
    created() {
        this.getData();
    },
    methods: {
        updateData() {
            this.getData()
        },
        async getData() {
            let [res] = await getRiverWaterQuality();
            // let res = {"result":"true","message":"{\"riverWaterQuality\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613554745516032\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"水中油\",\"standardJudge\":\"＜=\",\"standardValue\":\"1.0\",\"currentValue\":0.03,\"unit\":\"mg/L\",\"sort\":8,\"updateTime\":\"2020-10-15 13:35:08\",\"isQualified\":null,\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613555840229376\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"总磷\",\"standardJudge\":\"<=\",\"standardValue\":\"0.4\",\"currentValue\":0.12,\"unit\":\"mg/L\",\"sort\":9,\"updateTime\":\"2020-10-15 13:35:08\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613556888805376\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"总氮\",\"standardJudge\":\"<=\",\"standardValue\":\"2.0\",\"currentValue\":1.77,\"unit\":\"mg/L\",\"sort\":10,\"updateTime\":\"2020-10-15 13:35:08\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613550723178496\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"PH\",\"standardJudge\":\"\",\"standardValue\":\"6~9\",\"currentValue\":7.2,\"unit\":\"\",\"sort\":1,\"updateTime\":\"2020-10-15 13:35:07\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613551683674112\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"氨氮\",\"standardJudge\":\"<=\",\"standardValue\":\"2.0\",\"currentValue\":0.25,\"unit\":\"mg/L\",\"sort\":2,\"updateTime\":\"2020-10-15 13:35:07\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613552694501376\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"溶解氧\",\"standardJudge\":\">=\",\"standardValue\":\"2\",\"currentValue\":4.6,\"unit\":\"mg/L\",\"sort\":5,\"updateTime\":\"2020-10-15 13:35:07\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1316613553696940032\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"type\":\"水中有机物\",\"standardJudge\":\">\",\"standardValue\":\"2.40\",\"currentValue\":25.13,\"unit\":\"mg/L\",\"sort\":7,\"updateTime\":\"2020-10-15 13:35:07\",\"isQualified\":\"1\",\"status_in\":null,\"createDate_gte\":null,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"id_in\":null}]}"};
            let data = JSON.parse( res.message ).riverWaterQuality;
            let arr = [];
            let isSelect = false;
            data.forEach(item => {
                if( item.standardJudge == '＜=' || item.standardJudge == '<=') {
                    item.currentValue > item.standardValue && (isSelect = true);
                }
                if( item.standardJudge == '>' ) {
                    item.currentValue <= item.standardValue && (isSelect = true);
                }
                if( item.standardJudge == '>=' ) {
                    item.currentValue < item.standardValue && (isSelect = true);
                }
                if( item.standardJudge == '' ) {
                    let arr1 = item.standardValue.split('~');
                    if( item.currentValue < arr1[0] || item.currentValue > arr1[1] ) {
                        isSelect = true
                    }
                }
                arr.push({
                    id: item.id,
                    type: item.type,
                    currentValue: item.currentValue,
                    standardValue: item.standardValue,
                    standardJudge: item.standardJudge,
                    unit: item.unit,
                    isSelect: isSelect
                })
            });
            this.list = arr;
            this.list.splice();
        }
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    width: 540px;
    // height: 667.5px;
    height: 505px;
    margin-top: 20px;
    position: relative;
}
.panel-header {
    margin: 21.5px 0 0 22.5px;
}
.panel-bodyer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.select{
    color: #F54336;
}
.content {
    width: 491px;
    // height: 580px;
    height: 410px;
    display: flex;
    flex-wrap: wrap;
    .block {
        display: flex;
        border-bottom: 1px solid rgba(87, 189, 255, 0.56);
        // height: 145px;
        height: 102.5px;
        font-size: 16px;
        text-align: center;
        .left {
            width: 105px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(101, 149, 242, 0.12);
        }
        .right {
            width: 140px;
            height: 100%;
            border: 1px solid rgba(87, 189, 255, 0.56);
            border-top: none;
            border-bottom: none;
            background: rgba(101, 149, 242, 0.24);
            .target {
                border-bottom: 1px solid rgba(87, 189, 255, 0.56);
                // height: 72.5px;
                // line-height: 72.5px;
                height: 51.25px;
                line-height: 51.25px;
            }
            .now {
                // height: 72.5px;
                // line-height: 72.5px;
                height: 51.25px;
                line-height: 51.25px;
            }
        }
        &:nth-child(1),
        &:nth-child(2) {
            border-top: 1px solid rgba(87, 189, 255, 0.56);
        }
        &:nth-child(odd) {
            border-left: 1px solid rgba(87, 189, 255, 0.56);
        }
    }
}
</style>
