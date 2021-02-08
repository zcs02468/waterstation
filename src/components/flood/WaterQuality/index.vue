<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道水质  (五类水)" />
        </div>
        <div class="panel-bodyer">
            <div class="content">
                <div class="block" v-for="item in list" :key="item.id">
                    <div class="left">{{item.type}}<br/>{{item.unit}}</div>
                    <div class="right" :class="[ item.standardValue ? '' : 'center' ]">
                        <div class="target" v-if="item.standardValue">标准：{{item.standardJudge}}{{item.standardValue}}</div>
                        <div class="now"  v-if="item.standardValue" :class="{ select: item.isSelect }">当前：{{item.currentValue}}</div>
                        <div  v-if="!item.standardValue">{{item.currentValue}}</div>
                    </div>
                </div>
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
            let [err,res] = await getRiverWaterQuality();
            if( err ) return;
            let data = JSON.parse( res.message ).riverWaterQuality;
            let arr = [];
            let isSelect = false;
            data.forEach(item => {
                if( item.standardJudge == '＜=' || item.standardJudge == '<=') {
                    item.currentValue > item.standardValue && (isSelect = true);
                }
                if(  item.standardJudge == '<' ) {
                    item.currentValue >= item.standardValue && (isSelect = true);
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
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
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
