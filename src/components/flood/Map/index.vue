<!--  -->
<template>
    <div class="panel">
        <div class="map-header">
            <div @click="openDialog">
                <Title class="title" title="查看全部" />
            </div>
            <div class="select-box">
                <ul>
                    <li @click="selectClick('team')">
                        <span>应急队伍</span>
                        <b :class="selectType == 'team' ? 'select' : ''"></b>
                    </li>
                    <li @click="selectClick('supplices')">
                        <span>应急仓库</span>
                        <b :class="selectType == 'supplices' ? 'select' : ''"></b>
                    </li>
                </ul>
            </div>
        </div>
        <div class="map-bodyer">
            <div id="floodMap"></div>
            <TeamDialog v-show="selectType == 'team' && showDialog" @closeDailog="closeDailog"/>
            <SuppliesDialog v-show="selectType == 'supplices' && showDialog"  @closeDailog="closeDailog"/>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import TeamDialog from "./TeamDialog";
import SuppliesDialog from "./SuppliesDialog";
export default {
    name: "Map",
    data() {
        return {
            selectType: "team",
            showDialog: false,
        };
    },

    components: {
        Title,
        TeamDialog,
        SuppliesDialog,
    },

    mounted() {
        var map = new BMap.Map("floodMap");
        // 创建地图实例yanmou
        var point = new BMap.Point(116.404, 39.915);
        // 创建点坐标
        map.centerAndZoom(point, 15);
        // 初始化地图，设置中心点坐标和地图级别
        map.setMapStyleV2({
            styleId: "b670429936d6b760f493c0af69582f6c",
        });
    },

    methods: {
        openDialog() {
            this.showDialog = true;
        },
        closeDailog() {
            this.showDialog = false;
        },
        selectClick(type) {
            this.selectType = type;
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    height: 713.5px;
    width: 757px;
    margin-top: 43.5px;
}
.map-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18.5px 0 21.5px;
    .title {
        cursor: pointer;
    }
}
.select-box {
    width: 215.5px;
    height: 30.5px;
    ul {
        width: 100%;
        display: flex;
        height: 30.5px;
        li {
            flex: 1;
            height: 100%;
            font-size: 16px;
            text-align: center;
            height: 30.5px;
            line-height: 30.5px;
            position: relative;
            span {
                display: inline-block;
                position: relative;
                width: 68px;
                color: #fff;
                cursor: pointer;
            }
            &:nth-child(1) b {
                border-right: none;
            }
            &:nth-child(2) b {
                border-left: none;
            }
            .select {
                background: #1847b9;
            }
            b {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 1px solid #1847b9;
                left: 0;
                top: 0;
                z-index: -1;
                transform: skewX(-10deg);
            }
        }
    }
}
.map-bodyer {
    width: 757px;
    height: 669.5px;
    margin-top: 13.5px;
    position: relative;
}
#floodMap {
    height: 100%;
    width: 100%;
}
</style>
