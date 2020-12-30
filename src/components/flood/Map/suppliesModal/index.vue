<!--  -->
<template>
    <div class="map-mark">
        <div class="dialog-box">
            <div class="close" @click="closeDailog">X</div>
            <div class="dialog-content">
                <div class="title">应急仓库</div>
                <div class="content" v-if="isShow">
                    <ul class="head">
                        <li>
                            <div>物资仓库点位</div>
                            <div>物资名称</div>
                            <div>数量</div>
                        </li>
                    </ul>
                    <ul class="body">
                        <li v-for="(item, i) in dataList" :key="`supplies${i}`">
                            <div>{{ item.materialsWarehouse }}</div>
                            <div>{{ item.materialsName }}</div>
                            <div>{{ item.materials || 0 }}</div>
                        </li>
                    </ul>
                </div>
                <div class="pagination" v-if="isShow">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        :page-size="pageSize"
                        :total="propList.length"
                        @current-change="currentChange"
                    >
                    </el-pagination>
                </div>
                <div class="loading" v-if="!isShow">
                    <span class="iconfont iconjiazai"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEmergencyMaterials} from "../../../../axios"
export default {
    props: {
        type: {
            default: String,
        },
    },

    name: "Dialog",
    data() {
        return {
            isShow: false,
            propList:[],
            dataList: [],
            pageSize: 5,
        };
    },

    components: {},

    created() {
        this.getEmergencyMaterials(this.type)
    },

    methods: {
        closeDailog() {
            this.$emit("closeDailog");
        },
        currentChange(val) {
            let lastVal = val * this.pageSize - this.pageSize;
            let nextVal = val * this.pageSize;
            this.dataList = this.propList.slice(lastVal, nextVal);
        },
        async getEmergencyMaterials(location) {
            let [err,res] = await getEmergencyMaterials(location);
            if( err ) return;
            // let res = {"result":"true","message":"{\"emList\":[{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1303243481153122304\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":null,\"status\":null,\"updateBy\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":null,\"createBy\":null,\"materialsId\":\"1303243481153122304\",\"materialsWarehouse\":\"水环境科\",\"materialsName\":\"清水泵-6寸\",\"materials\":10,\"keeper\":\"hebin_wz3q\",\"keeperName\":\"何  彬\",\"phone\":\"13564767793\",\"longitude\":121.35575,\"latitude\":31.19405,\"updateDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1303243264387297280\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":null,\"status\":null,\"updateBy\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":null,\"createBy\":null,\"materialsId\":\"1303243264387297280\",\"materialsWarehouse\":\"水环境科\",\"materialsName\":\"汽油泵\",\"materials\":1,\"keeper\":\"hebin_wz3q\",\"keeperName\":\"何  彬\",\"phone\":\"13564767793\",\"longitude\":121.35575,\"latitude\":31.19405,\"updateDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"status_in\":null,\"id_in\":null}]}"}
            let data = JSON.parse(res.message);
            this.propList = [];
            this.propList = data.emList;
            this.propList.splice();
            this.isShow = true;
            let lastVal = 0;
            let nextVal = this.pageSize;
            this.dataList = this.propList.slice(lastVal, nextVal);
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.map-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(7, 7, 7, 0.43);
    z-index: 999;
    .dialog-box {
        width: 530px;
        height: 293px;
        border: 1px solid #57bdff;
        position: relative;
        padding: 0 15px;
        background: rgba(1, 24, 63, 0.8);
    }
    .close {
        position: absolute;
        right: -26.5px;
        top: -26.5px;
        width: 26.5px;
        height: 26.5px;
        border-radius: 50%;
        border: 1px solid #499fdc;
        text-align: center;
        line-height: 26.5px;
        color: #499fdc;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    .dialog-content {
        .title {
            font-size: 15px;
            margin-top: 5px;
        }
        .content {
            margin-top: 8px;
            min-height: 205px;
        }
        li {
            display: flex;
            height: 34px;
            border-top: 1px solid rgba(87, 189, 255, 0.56);
            border-left: 1px solid rgba(87, 189, 255, 0.56);
            display: table;
            &:last-child {
                border-bottom: 1px solid rgba(87, 189, 255, 0.56);
            }
            div {
                height: 100%;
                font-size: 12px;
                text-align: center;
                // line-height: 34px;
                border-right: 1px solid rgba(87, 189, 255, 0.56);
                padding: 0 10px;
                display: table-cell;
                vertical-align: middle;
                width: 166px;
                // &:nth-child(1) {
                //     width: 180px;
                // }
                // &:nth-child(2) {
                //     width: 120px;
                // }
                // &:nth-child(3) {
                //     width: 80px;
                // }
                // &:nth-child(1) {
                //     width: 180px;
                // }
                // &:nth-child(2) {
                //     width: 120px;
                // }
                // &:nth-child(3) {
                //     width: 80px;
                // }
                // &:nth-child(4) {
                //     width: 120px;
                // }
            }
        }
        .head {
            li {
                border-bottom: none !important;
                div {
                    padding: 0 !important;
                    font-size: 14px !important;
                }
            }
        }
    }
    .pagination {
        margin-top: 13px;
        float: right;
        /deep/.el-pagination__total {
            color: #636363 !important;
        }
        /deep/.number {
            height: 20px !important;
            font-size: 10px !important;
            line-height: 20px !important;
            background: transparent !important;
            border: 1px solid #bcbcbc !important;
            min-width: 20px !important;
            font-size: 10px !important;
        }
        /deep/.more {
            height: 20px !important;
            font-size: 10px !important;
            line-height: 20px !important;
            background: transparent !important;
            border: none !important;
            font-size: 10px !important;
        }
        /deep/.btn-prev {
            background: transparent !important;
            border: 1px solid #bcbcbc !important;
            color: #bcbcbc !important;
            vertical-align: middle !important;
            width: 42px;
            height: 20px;
            span {
                font-size: 10px !important;
                line-height: 20px !important;
            }
        }
        /deep/.btn-next {
            background: transparent !important;
            border: 1px solid #bcbcbc;
            color: #bcbcbc !important;
            width: 42px;
            height: 20px;
            span {
                font-size: 10px !important;
                line-height: 20px !important;
            }
        }
        /deep/.active {
            border-color: #0e8ce5 !important;
            color: #0e8ce5 !important;
            font-weight: 400 !important;
        }
    }
}
.loading {
    width: 100%;
    min-height: 210px;
    text-align: center;
    line-height: 210px;
    .iconfont {
        display: inline-block;
        font-size: 30px;
        animation: rotate 2s linear infinite;
    }
}
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
</style>
