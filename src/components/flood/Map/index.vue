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
                        <b
                            :class="selectType == 'supplices' ? 'select' : ''"
                        ></b>
                    </li>
                </ul>
            </div>
        </div>
        <div class="map-bodyer">
            <div id="floodMap"></div>
            <div class="team-mark">
                <div class="team-info">
                    <div class="info-back"></div>
                    <ul>
                        <li><span></span>队伍驻点：XXXXXX</li>
                        <li><span></span>队伍名称：XXXXX</li>
                        <li><span></span>人数：XXXXX</li>
                        <li><span></span>现场负责人联系电话：13555555555</li>
                    </ul>
                </div>
            </div>
            <TeamDialog
                v-show="selectType == 'team' && showDialog"
                @closeDailog="closeDailog"
            />
            <SuppliesDialog
                v-show="selectType == 'supplices' && showDialog"
                @closeDailog="closeDailog"
            />
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
        var point = new BMap.Point(121.346817, 31.203347);
        // 创建点坐标
        map.centerAndZoom(point, 15);
        // 初始化地图，设置中心点坐标和地图级别
        map.setMapStyleV2({
            styleId: "b670429936d6b760f493c0af69582f6c",
        });
        //         121.353293,31.201024
        // 121.334407,31.199594
        // 121.353125,31.200235
        // 121.353134,31.19964

        // map.centerAndZoom(point, 15);
        // 编写自定义函数,创建标注
        function addMarker(point) {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }
        addMarker( new BMap.Point(121.346817, 31.203347));
        addMarker( new BMap.Point(121.353293,31.201024));
        addMarker( new BMap.Point(121.334407,31.199594));
        addMarker( new BMap.Point(121.353125,31.200235));
        addMarker( new BMap.Point(121.353134,31.19964));
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
.team-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}
//rgba(109, 214, 255, 0.44)
.info-back {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../../assets/image/maintain1.png");
    background-size: 100% 100%;
}
.team-info {
    position: absolute;
    width: 397.5px;
    height: 187px;
    z-index: 12;
    ul {
        padding: 29px 25px 0 25px;
    }
    li {
        height: 31px;
        width: 100%;
        border-bottom: 1px solid rgba(219, 231, 255, 0.71);
        line-height: 31px;
        font-size: 16px;
        span {
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #8ebcff;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
}
</style>
