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
            <div id="eaMap" v-show="selectType == 'team'"></div>
            <div id="emMap" v-show="selectType == 'supplices'"></div>
            <div class="team-mark" v-show="isShowList" @click="closeList">
                <div class="team-info">
                    <div class="info-back"></div>
                    <ul>
                        <li><span></span>{{info.location}}</li>
                        <li><span></span>{{info.name}}</li>
                        <li><span></span>{{info.num}}</li>
                        <li><span></span>{{info.phone}}</li>
                    </ul>
                </div>
            </div>
            <TeamDialog
                v-if="selectType == 'team' && showDialog"
                :propList="eaList"
                @closeDailog="closeDailog"
            />
            <SuppliesDialog
                v-if="selectType == 'supplices' && showDialog"
                :propList="emList"
                @closeDailog="closeDailog"
            />
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import TeamDialog from "./TeamDialog";
import SuppliesDialog from "./SuppliesDialog";
import {getEmergencyInfo} from "../../../axios"
export default {
    name: "Map",
    data() {
        return {
            selectType: "team",
            showDialog: false,
            isShowList: false,
            teamIndex: '',
            eaList: [],
            emList: [],
            eaBMap: null,
            emBMap: null,
            info:{
                location:'',
                name:'',
                num:'',
                phone:''
            }
        };
    },

    components: {
        Title,
        TeamDialog,
        SuppliesDialog,
    },

    mounted() {
        this.getData()
    },

    created() {
    },

    methods: {
        createEaMap() {
            if( !this.emBMap ) {
                this.eaBMap = new BMap.Map("eaMap");
                // 创建地图实例yanmou
                this.eaPoint = new BMap.Point(121.346817, 31.203347);
                // 创建点坐标
                this.eaBMap.centerAndZoom(this.eaPoint, 15);
                this.eaBMap.enableScrollWheelZoom();
                // 初始化地图，设置中心点坐标和地图级别
                this.eaBMap.setMapStyleV2({
                    styleId: "b670429936d6b760f493c0af69582f6c",
                });
            }
            // map.centerAndZoom(point, 15);
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                var marker = new BMap.Marker(point);
                that.eaBMap.addOverlay(marker);
                // addClickHandler(marker,index);
                marker.addEventListener("click",function() {
                    let eaList = that.eaList[index];
                    that.info.location = `队伍驻点：${eaList.armyPlace}`   //队伍驻点：
                    that.info.name = `队伍名称：${eaList.armyName}`      //队伍名称：XXXXX
                    that.info.num = `人数：${eaList.headcount || 0}`        //人数：XXXXX
                    that.info.phone = `现场负责人联系电话：${eaList.phone}`       //现场负责人联系电话：13555555555
                    that.isShowList = true
                });
            }
            this.eaList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        createEmMap() {
            if( !this.emBMap ) {
                this.emBMap = new BMap.Map("emMap");
                // 创建地图实例yanmou
                this.emPoint = new BMap.Point(121.346817, 31.203347);
                // 创建点坐标
                this.emBMap.centerAndZoom(this.emPoint, 15);
                this.emBMap.enableScrollWheelZoom();
                // 初始化地图，设置中心点坐标和地图级别
                this.emBMap.setMapStyleV2({
                    styleId: "b670429936d6b760f493c0af69582f6c",
                });
            }
            //         121.353293,31.201024
            // 121.334407,31.199594
            // 121.353125,31.200235
            // 121.353134,31.19964

            // map.centerAndZoom(point, 15);
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                var marker = new BMap.Marker(point);
                that.emBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    let emList = that.emList[index];
                    that.info.location = `物资仓库点位：${emList.materialsWarehouse}`   //队伍驻点：
                    that.info.name = `物资名称：${emList.materialsName}`      //队伍名称：XXXXX
                    that.info.num = `数量：${emList.materials || 0}`        //人数：XXXXX
                    that.info.phone = `保管联系人电话：${emList.phone}`          //现场负责人联系电话：13555555555
                    that.isShowList = true
                });
            }
            this.emList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        openDialog() {
            this.showDialog = true;
            this.isShowList = false;
        },
        closeDailog() {
            this.showDialog = false;
        },
        selectClick(type) {
            this.selectType = type;
        },
        async getData() {
            if( this.eaBMap ) {
                this.eaBMap.clearOverlays();
            }
            if( this.emBMap ) {
                this.emBMap.clearOverlays();
            }
            // eaList	应急队伍对象
            // emList	应急物资对象
            let [res] = await getEmergencyInfo()
            let data = JSON.parse(res.message);
            let eaList = data.eaList;
            let emList = data.emList;
            this.eaList = eaList;
            this.emList = emList;
            this.createEaMap();
            this.createEmMap();
            setTimeout(()=> {
                this.getData()
            },60000)
        },
        closeList() {
            this.isShowList = false
        }
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
#emMap {
    height: 100%;
    width: 100%;
    position: absolute;
}
#eaMap {
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
    // pointer-events: none;
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
