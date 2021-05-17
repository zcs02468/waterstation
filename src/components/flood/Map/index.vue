<!--  -->
<template>
    <div class="panel">
        <div class="map-header">
            <div @click="openDialog">
                <Title class="title" :title="isShowVideo ? '关闭监控' : '查看全部'" />
            </div>
            <div class="select-box" v-if="isShowTop">
                <ul>
                    <li @click="selectClick('water')" class="li-water">
                        <span>河道水位</span>
                        <b :class="selectType == 'water' ? 'select' : ''"></b>
                    </li>
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
        <!-- <div class="map-bodyer" :class="[ selectType == 'team' ? 'selectEaMap':'selectEmMap']"> -->
        <div class="map-bodyer" :class="[`select-${selectType}`]">
            <div id="waterMap"></div>
            <div id="eaMap"></div>
            <div id="emMap"></div>
            <div class="team-mark" v-show="isShowList" @click="closeList">
                <div class="team-info">
                    <div class="info-background">
                        <div class="back"></div>
                    </div>
                    <div class="info-back"></div>
                    <button class="look-detail" @click="opSuppliesModal(info.key)" v-show="isShowBtn">详细物资</button>
                    <ul>
                        <li v-show="info.location"><span></span>{{info.location}}</li>
                        <li v-show="info.name"><span></span>{{info.name}}</li>
                        <li v-show="info.num"><span></span>{{info.num}}</li>
                        <li v-show="info.userName"><span></span>{{info.userName}}</li>
                        <li v-show="info.phone"><span></span>{{info.phone}}</li>
                    </ul>
                    <!-- <div class="tab-content-box">
                        <div class="content">
                            <p><span></span>{{ info.location }}</p>
                            <p><span></span>{{ info.name }}</p>
                            <p><span></span>{{ info.num }}</p>
                            <p><span></span>{{ info.userName}}</p>
                            <p><span></span>{{ info.phone }}</p>
                        </div>
                    </div> -->
                </div>
            </div>
            <TeamDialog
                v-if="selectType == 'team' && showDialog"
                :propList="eaLists"
                @closeDailog="closeDailog"
            />
            <SuppliesDialog
                v-if="selectType == 'supplices' && showDialog"
                :propList="emLists"
                @closeDailog="closeDailog"
            />
            <SuppliesModal 
                v-if="isShowSuppliesModal" 
                :type="suppliesModalType" 
                @closeDailog="closeDailog"
            />
            <TeamModal 
                v-if="isShowTeamModal" 
                :type="teamModalType" 
                @closeDailog="closeDailog"
            />
            <videoDialog
                ref="videoDialogRef"
                v-if="isShowVideo"
                :videoUrl="videoUrl"
                @closeDailog="closeVideoDailog"
            />
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import TeamDialog from "./TeamDialog";
import SuppliesDialog from "./SuppliesDialog";
import SuppliesModal from "./suppliesModal"
import TeamModal from "./TeamModal"
import videoDialog from "./videoDialog"
import comMinxins from "../../common/comMinxins"
import {getEmergencyInfo, getDeviceList, getDeviceUrl, getWristbandList, getSinglePawn, getFloodControlAndWaterLevel} from "../../../axios"
export default {
    name: "Map",
    mixins:[comMinxins],
    data() {
        return {
            isShowTop: false,
            selectType: "water",
            showDialog: false,
            isShowList: false,
            isShowBtn: false,
            isShowSuppliesModal: false,
            suppliesModalType: '',
            isShowTeamModal: false,
            teamModalType:'',
            teamIndex: '',
            eaLists: [],
            emLists: [],
            eaList: [],
            emList: [],
            waterList:[],
            suppliesList:[],
            waterBMap: null,
            eaBMap: null,
            emBMap: null,
            info:{
                location:'',
                name:'',
                num:'',
                phone:''
            },
            isShowVideo: false,
            token: '',
            videoUrl: ''
        };
    },

    components: {
        Title,
        TeamDialog,
        SuppliesDialog,
        SuppliesModal,
        videoDialog,
        TeamModal
    },

    mounted() {
        this.getData()
    },
    methods: {
        updateData() {
            this.getData();
        },
        //河道水位
        createWaterMap() {
            if( !this.waterBMap ) {
                this.waterBMap = new BMap.Map("waterMap");
                // 创建地图实例yanmou
                this.eaPoint = new BMap.Point(121.346817, 31.203347);
                // 创建点坐标
                this.waterBMap.centerAndZoom(this.eaPoint, 15);
                this.waterBMap.enableScrollWheelZoom();
                // 初始化地图，设置中心点坐标和地图级别
                this.waterBMap.setMapStyleV2({
                    styleId: "beda1b53ef0b60c06200da39068b025e",
                });
            }
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                let nowData = that.waterList[index];
                let marker;
                let url = `/images/status${nowData.isOverproof}.png`
                var myIcon = new BMap.Icon(url, new BMap.Size(30, 30));
                marker = new BMap.Marker(point,{
                    icon: myIcon
                });
                marker.setTitle(nowData.name)
                that.waterBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    let eaData = that.waterList[index];
                    //河道水位
                    that.info.location = `名称：${eaData.name}`
                    that.info.name = `水位值：${eaData.value}`

                    that.info.num = ""
                    that.info.userName = ""
                    that.info.phone = "" 
                    that.isShowList = true;
                    that.isShowBtn = false;
                });
            }
            this.waterList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        //应急队伍
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
                    styleId: "beda1b53ef0b60c06200da39068b025e",
                });
            }
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                let nowData = that.eaList[index];
                let marker;
                let type = "video"
                //视频列表
                if( nowData.deviceSerial ) type = "video"
                //应急队伍
                if( nowData.armyPlace && nowData.phone ) type = "ea"
                //手环
                if( nowData.wristbandName ) type = "wristband"
                //执法仪
                if( nowData.singlePawnName ) type = "singlePawn"
                //河道水位
                if( nowData.isOverproof ) type = "water"
                if( type == 'ea' ) {
                    marker = new BMap.Marker(point);
                    if( index >= 10 ) {
                        var label = new BMap.Label(index+1, {
                            offset : new BMap.Size(0, 4)
                        }); 
                    }else {
                        var label = new BMap.Label(index+1, {
                            offset : new BMap.Size(4, 4)
                        }); 
                    }
                    label.setStyle({
                        background:'none',color:'#fff',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                    });
                    marker.setLabel(label);//显示地理名称 a 
                }else {
                    if( type == 'video' ) {
                        var myIcon = new BMap.Icon("/images/camera.png", new BMap.Size(30, 30));
                        marker = new BMap.Marker(point,{
                            icon: myIcon
                        });
                        marker.setTitle(nowData.deviceName)
                    }
                    if( type == 'wristband' ) {
                        var myIcon = new BMap.Icon("/images/wristband.png", new BMap.Size(30, 30));
                        marker = new BMap.Marker(point,{
                            icon: myIcon
                        });
                    }
                    if( type == 'singlePawn' ) {
                        var myIcon = new BMap.Icon("/images/lawEnforcement.png", new BMap.Size(30, 30));
                        marker = new BMap.Marker(point,{
                            icon: myIcon
                        });
                        marker.setTitle(nowData.singlePawnName)
                    }
                    if( type == 'water' ) {
                        let url = `/images/status${nowData.isOverproof}.png`
                        var myIcon = new BMap.Icon(url, new BMap.Size(30, 30));
                        marker = new BMap.Marker(point,{
                            icon: myIcon
                        });
                    }
                }
                that.eaBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    let eaData = that.eaList[index];
                    //视频列表
                    if( type == "video" ) {
                        that.getDeviceUrl(eaData.deviceSerial);
                    }
                    //应急队伍
                    if( type == "ea" ) {
                        that.info.location = `队伍驻点：${eaData.armyPlace}`   //队伍驻点：
                        that.info.name = `队伍名称：${eaData.armyName}`      //队伍名称：XXXXX
                        that.info.num = `人数：${eaData.headcount || 0}`        //人数：XXXXX
                        that.info.userName = `现场负责人：${eaData.chargeLeadName}`       //现场负责人：13555555555
                        that.info.phone = `联系电话：${eaData.phone}`       //联系电话：13555555555
                        that.isShowList = true;
                        that.isShowBtn = true;
                        that.info.key = eaData.id
                    }
                    //手环
                    if( type == "wristband" ) {
                        that.info.location = `名称：${eaData.wristbandName}`
                        that.info.name = `设备描述：${eaData.deviceInfo}`

                        that.info.num = ""
                        that.info.userName = ""
                        that.info.phone = "" 
                        that.isShowList = true;
                        that.isShowBtn = false;
                    }
                    //执法仪
                    if( type == "singlePawn" ) {
                        //待定打开 vlc
                        that.copyToClipboard(eaData.videoUrl)
                        window.location.href = "vlc://"
                    }
                    //河道水位
                    if( type == "water" ) {
                        that.info.location = `名称：${eaData.name}`
                        that.info.name = `水位值：${eaData.value}`

                        that.info.num = ""
                        that.info.userName = ""
                        that.info.phone = "" 
                        that.isShowList = true;
                        that.isShowBtn = false;
                    }

                    // let eaList = that.eaList[index];
                    // if( eaList.deviceSerial ) {
                    //     that.getDeviceUrl(eaList.deviceSerial);
                    // }else {
                    //     that.info.location = `队伍驻点：${eaList.armyPlace}`   //队伍驻点：
                    //     that.info.name = `队伍名称：${eaList.armyName}`      //队伍名称：XXXXX
                    //     that.info.num = `人数：${eaList.headcount || 0}`        //人数：XXXXX
                    //     that.info.userName = `现场负责人：${eaList.chargeLeadName}`       //现场负责人：13555555555
                    //     that.info.phone = `联系电话：${eaList.phone}`       //联系电话：13555555555
                    //     that.isShowList = true;
                    //     that.isShowBtn = false;
                    // }
                });
            }
            this.eaList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        //应急仓库
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
                    styleId: "beda1b53ef0b60c06200da39068b025e",
                });
            }
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                let nowData = that.emList[index];
                let marker;
                if( nowData.deviceSerial ){
                    var myIcon = new BMap.Icon("/images/camera.png", new BMap.Size(30, 30));
                    marker = new BMap.Marker(point,{
                        icon: myIcon
                    });
                    marker.setTitle(nowData.deviceName)
                }else {
                    marker = new BMap.Marker(point);
                    if( index >= 10 ) {
                        var label = new BMap.Label(index+1, {
                            offset : new BMap.Size(0, 4)
                        }); 
                    }else {
                        var label = new BMap.Label(index+1, {
                            offset : new BMap.Size(4, 4)
                        }); 
                    }
                    label.setStyle({
                        background:'none',color:'#fff',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                    });
                    marker.setLabel(label);//显示地理名称 a 
                }
                that.emBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    let emList = that.emList[index];
                    if( emList.deviceSerial ) {
                        that.getDeviceUrl(emList.deviceSerial);
                    }else {
                        that.info.location = `物资仓库点位：${emList.materialsWarehouse}`   //队伍驻点：
                        that.info.name = ``      //队伍名称：XXXXX
                        that.info.num = ''        //人数：XXXXX
                        that.info.userName = `保管人：${emList.keeperName}`          //现场负责人联系电话：13555555555
                        that.info.phone = `联系电话：${emList.phone}`          //现场负责人联系电话：13555555555
                        that.info.key = emList.materialsWarehouse
                        that.isShowList = true;
                        that.isShowBtn = true;
                    }
                });
            }
            this.emList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        opSuppliesModal(key) {
            this.closeDailog();
            if( this.selectType == 'supplices' ){
                this.suppliesModalType = key;
                this.isShowSuppliesModal = true;
            }else {
                this.teamModalType = key;
                this.isShowTeamModal = true;
            }
        },
        openDialog() {
            if( this.isShowVideo ) {
                this.$refs.videoDialogRef.closeDailog();
                return;
            }
            if( this.$route.name != "Normal" ) {
                this.showDialog = true;
                this.isShowList = false;
            }
        },
        closeDailog() {
            this.isShowList = false;
            this.showDialog = false;
            this.isShowSuppliesModal = false;
            this.teamModalType = null;
            this.isShowTeamModal = false;
        },
        closeVideoDailog() {
            this.isShowVideo = false;
        },
        selectClick(type) {
            this.selectType = type;
            this.showDialog = false;
            this.isShowSuppliesModal = false;
            this.isShowList = false;
        },
        async getEaAllData() {
            // 地图手环点位 WristbandList
            // 地图执法记录仪点位 SinglePawn
            // 河道及水池水位和地图点位 RiverCourseLevel

            const [EmergencyInfo,DeviceList,WristbandList,SinglePawn,RiverCourseLevel ] = await Promise.all([
                getEmergencyInfo(),
                this.getDeviceList(),
                getWristbandList(),
                getSinglePawn(),
                getFloodControlAndWaterLevel()
            ])
            if (EmergencyInfo[0]) throw '获取 应急队伍 应急物资 出错'
            // if (DeviceList[0] || DeviceList[1].result != 'true') throw '获取视频设备列表出错'
            if (WristbandList[0] || WristbandList[1].result != 'true') throw '获取地图手环点位出错'
            if (SinglePawn[0] || SinglePawn[1].result != 'true') throw '获取地图执法记录仪点位出错'
            if (RiverCourseLevel[0] || RiverCourseLevel[1].result != 'true') throw '获取河道及水池水位和地图点位出错'
            return {
                emergencyInfoData: JSON.parse(EmergencyInfo[1].message),
                deviceListData: DeviceList.list,
                wristbandListData: WristbandList[1].data,
                singlePawnData: SinglePawn[1].data,
                riverCourseLevelData: RiverCourseLevel[1].data,
            }
        },
        async getData() {
            // this.getVideoToken();
            if( this.eaBMap ) {
                this.eaBMap.clearOverlays();
            }
            if( this.emBMap ) {
                this.emBMap.clearOverlays();
            }
            // eaList	应急队伍对象
            // emList	应急物资对象
            if( this.$route.name == "Normal" ) {
                //生态环境监测  只显示摄像头信
                this.isShowTop = false;
                let list = await this.getDeviceList();
                let eaList = [...list.list];
                let emList = [...list.list];
                
                this.eaList = eaList;
                this.emList = emList;
                this.createEaMap();
                this.createEmMap();
            }else {
                this.isShowTop = true;
                const { emergencyInfoData,deviceListData,wristbandListData,singlePawnData,riverCourseLevelData } = await this.getEaAllData()
                let eaList = [...emergencyInfoData.eaList,...deviceListData,...wristbandListData,...singlePawnData];
                let emList = [...emergencyInfoData.emList,...deviceListData];
                // this.isShowTop = true;
                // let [err,res] = await getEmergencyInfo()
                // if( err ) return;
                // let data = JSON.parse(res.message);
                // let list = await this.getDeviceList();
                this.eaLists = [...emergencyInfoData.eaList];
                this.emLists = [...emergencyInfoData.emList];
                // let eaList = [...data.eaList,...list.list];
                // let emList = [...data.emList,...list.list];
                this.eaList = eaList;
                this.emList = emList;
                this.waterList = riverCourseLevelData
                this.createEaMap();
                this.createEmMap();
                this.createWaterMap()
            }
        },
        async initNormal() {
            this.getVideoToken();
            let [list] = await getDeviceList();
            if(!list)return;
            this.emList = list;
        },
        async getDeviceList() {
            let [err,res] = await getDeviceList()
            if( err ) return {list: []};
            return {list: res.data};
        },
        async getDeviceUrl(deviceSerial) {
            let [err,res] = await getDeviceUrl(deviceSerial);
            if( err ) return;
            this.videoUrl = res.data;
            this.isShowVideo = true;
        },
        closeList() {
            this.isShowList = false
        },
        copyToClipboard(str) {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }
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
    // width: 327px;
    // width: 215.5px;
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
            width: 109px;
            span {
                display: inline-block;
                position: relative;
                width: 68px;
                color: #fff;
                cursor: pointer;
            }
            &:nth-child(1) b {
                // border-right: none;
            }
            &:nth-child(2) b {
                // border-left: none;
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
//supplices   team     water
.select-water {
    #waterMap {
        z-index: 3;
    }
    #eaMap{
        z-index: -1;
    }
    #emMap{
        z-index: -2;
    }
}
.select-team {
    #eaMap{
        z-index: 3;
    }
    #waterMap {
        z-index: -1;
    }
    #emMap{
        z-index: -2;
    }
}
.select-supplices {
    #emMap{
        z-index: 3;
    }
    #waterMap {
        z-index: -1;
    }
    #eaMap{
        z-index: -2;
    }
}

// .selectEaMap {
//     #eaMap{
//         z-index: 3;
//     }
//     #emMap{
//         z-index: -1;
//     }
// }
// .selectEmMap {
//     #eaMap{
//         z-index: -1;
//     }
//     #emMap{
//         z-index: 3;
//     }
// }
#emMap {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
#eaMap {
    height: 100%;
    width: 100%;
}
#waterMap {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
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
    z-index: 5;
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
    // height: 187px;
    // width: 507px;
    height: 216px;
    z-index: 12;
    .info-background {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 20px;
        z-index: -1;
        .back {
            // background: rgba(9,32,80,.7);
            // background: rgba(101, 149, 242, 0.4);
        background: RGBA(17, 53, 73, 1);
            // background: red;
            width: 100%;
            height: 100%;
        }
    }
    .look-detail {
        width: 96px;
        height: 23px;
        background: rgba(24, 71, 186, 0.5);
        outline: none;
        border: 1px solid #68C8FF;
        border-radius: 5px;
        position: absolute;
        right: 25px;
        bottom: 8px;
        color: #fff;
        cursor: pointer;
    }
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

// .tab-content-box {
//     background: #092050;
//     width: 507px;
//     height: 216px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-left: 42px;
//     background: url("../../../assets/image/maintain.jpg");
//     background-size: 100% 100%;
//     .content {
//         width: 432px;
//         height: 150px;
//         position: relative;
//         z-index: 1;
//         p {
//             width: 100%;
//             height: 30px;
//             font-size: 14px;
//             line-height: 38px;
//             border-bottom: 1px solid #2866e4;
//         }
//     }
// }
</style>
