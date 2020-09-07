<!--  -->
<template>
    <div class="map-mark">
        <div class="dialog-box">
            <div class="close" @click="closeDailog">X</div>
            <div class="dialog-content">
                <div class="title">应急队伍</div>
                <div class="content">
                    <ul class="head">
                        <li>
                            <div>队伍驻点</div>
                            <div>队伍名称</div>
                            <div>人数</div>
                            <div>现场负责人</div>
                            <div>电话</div>
                        </li>
                    </ul>
                    <ul class="body">
                        <li v-for="(item, i) in dataList" :key="`phone${i}`">
                            <div>{{ item.armyPlace }}</div>
                            <div>{{ item.armyName }}</div>
                            <div>{{ item.headcount || 0 }}</div>
                            <div>{{ item.chargeLeadName }}</div>
                            <div>{{ item.phone }}</div>
                        </li>
                    </ul>
                </div>
                <div class="pagination">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dialog",

    props: {
        propList: {
            default: Array,
        },
    },

    data() {
        return {
            dataList: [],
            pageSize: 5,
        };
    },

    created() {
        let lastVal = 0;
        let nextVal = this.pageSize;
        this.dataList = this.propList.slice(lastVal, nextVal);
    },

    components: {},

    methods: {
        closeDailog() {
            this.$emit("closeDailog");
        },
        currentChange(val) {
            let lastVal = val * this.pageSize - this.pageSize;
            let nextVal = val * this.pageSize;
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
                &:nth-child(1) {
                    width: 80px;
                }
                &:nth-child(2) {
                    width: 120px;
                }
                &:nth-child(3) {
                    width: 80px;
                }
                &:nth-child(4) {
                    width: 100px;
                }
                &:nth-child(5) {
                    width: 120px;
                }
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
</style>
