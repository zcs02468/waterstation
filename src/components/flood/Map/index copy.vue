<!--  -->
<template>
    <div class="panel">
        <div class="map-header">
            <div @click="openDialog">
                <Title class="title" :title="isShowVideo ? '关闭监控' : '查看全部' " />
            </div>
            <!-- <div class="select-box">
                <ul>
                    <li @click="selectClick('team')">
                        <span>应急队伍</span>
                        <b :class="selectType == 'team' ? 'select' : ''"></b>
                    </li>
                    <li @click="selectClick('supplices')">
                        <span>应急仓库</span>
                        <b :class="selectType == 'supplices' ? 'select' : ''"
                        ></b>
                    </li>
                </ul>
            </div> -->
        </div>
        <div class="map-bodyer" :class="[ selectType == 'team' ? 'selectEaMap':'selectEmMap']">
            <!-- <div id="eaMap" v-show="selectType == 'team'"></div>
            <div id="emMap" v-show="selectType == 'supplices'"></div> -->
            <div id="eaMap"></div>
            <div id="emMap"></div>
            <div class="team-mark" v-show="isShowList" @click="closeList">
                <div class="team-info">
                    <div class="info-background">
                        <div class="back"></div>
                    </div>
                    <div class="info-back"></div>
                    <button class="look-detail" @click="opSuppliesModal(info.materialsWarehouse)" v-show="isShowBtn">详细物资</button>
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
                :propList="eaList"
                @closeDailog="closeDailog"
            />
            <videoDialog
                v-if="selectType == 'supplices' && showDialog"
                :accessToken="token"
                :videoUrl="videoUrl"
                @closeDailog="closeDailog"
            />
            <SuppliesModal 
                v-if="isShowSuppliesModal" 
                :type="suppliesModalType" 
                @closeDailog="closeDailog"
            />
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import TeamDialog from "./TeamDialog";
// import SuppliesDialog from "./SuppliesDialog";
import SuppliesModal from "./suppliesModal"
import videoDialog from "./videoDialog"
import comMinxins from "../../common/comMinxins"
import {getEmergencyInfo, getVideoToken, getDeviceList, getDeviceUrl} from "../../../axios"
let videoData =  {
    "result": "true",
    "data": [
        {
        "isNewRecord": false,
        "id": "E92779082",
        "status": "1",
        "deviceSerial": "E92779082",
        "deviceName": "迎宾八路河道东",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 16:57:03",
        "updateTime": "2020-10-11 16:57:03",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779081",
        "status": "1",
        "deviceSerial": "E92779081",
        "deviceName": "空港三路东西河道",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 17:00:59",
        "updateTime": "2020-10-11 17:00:59",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779078",
        "status": "1",
        "deviceSerial": "E92779078",
        "deviceName": "空港三路联虹路口南北河道",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 16:53:11",
        "updateTime": "2020-10-11 16:53:55",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779077",
        "status": "1",
        "deviceSerial": "E92779077",
        "deviceName": "迎宾八路河道中",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 16:58:55",
        "updateTime": "2020-10-11 16:57:22",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779075",
        "status": "1",
        "deviceSerial": "E92779075",
        "deviceName": "空港三路联虹路口东西河道",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 16:58:24",
        "updateTime": "2020-10-11 16:58:24",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779074",
        "status": "1",
        "deviceSerial": "E92779074",
        "deviceName": "南水塔河道西",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 16:59:37",
        "updateTime": "2020-10-11 16:59:37",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779073",
        "status": "1",
        "deviceSerial": "E92779073",
        "deviceName": "空港三路南北河道",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2020-10-11 17:00:17",
        "updateTime": "2020-10-11 17:00:16",
        "longitude": 121.35575,
        "latitude": 31.19405
        },
        {
        "isNewRecord": false,
        "id": "E92779071",
        "status": "1",
        "deviceSerial": "E92779071",
        "deviceName": "南水塔河道南",
        "deviceType": "DS-2DE42BC-XCR",
        "deviceVersion": "V5.6.15 build 191211",
        "addTime": "2021-01-12 12:30:53",
        "updateTime": "2021-01-12 12:31:46",
        "longitude": 121.35575,
        "latitude": 31.19405
        }
    ],
    "message": "请求成功"
}
export default {
    name: "Map",
    mixins:[comMinxins],
    data() {
        return {
            selectType: "supplices",
            showDialog: false,
            // selectType: "supplices",
            // showDialog: true,
            isShowList: false,
            isShowBtn: false,
            isShowSuppliesModal: false,
            suppliesModalType: '',
            teamIndex: '',
            eaList: [],
            emList: [],
            suppliesList:[],
            eaBMap: null,
            emBMap: null,
            info:{
                location:'',
                name:'',
                num:'',
                phone:''
            },
            token: '',
            videoUrl: ''
        };
    },

    components: {
        Title,
        TeamDialog,
        videoDialog,
        SuppliesModal,
    },

    mounted() {
        this.getData()
    },

    methods: {
        updateData() {
            this.getData();
        },
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
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                var marker = new BMap.Marker(point);
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
                that.eaBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    let eaList = that.eaList[index];
                    that.info.location = `队伍驻点：${eaList.armyPlace}`   //队伍驻点：
                    that.info.name = `队伍名称：${eaList.armyName}`      //队伍名称：XXXXX
                    that.info.num = `人数：${eaList.headcount || 0}`        //人数：XXXXX
                    that.info.userName = `现场负责人：${eaList.chargeLeadName}`       //现场负责人：13555555555
                    that.info.phone = `联系电话：${eaList.phone}`       //联系电话：13555555555
                    that.isShowList = true;
                    that.isShowBtn = false;
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
            // 编写自定义函数,创建标注
            let that = this;
            function addMarker(point,index) {
                var myIcon = new BMap.Icon("/images/camera.png", new BMap.Size(30, 30));
                var marker = new BMap.Marker(point,{
                    icon: myIcon
                });
                marker.setTitle(that.emList[index].deviceName)
                
                that.emBMap.addOverlay(marker);
                marker.addEventListener("click",function() {
                    that.getDeviceUrl(that.emList[index].deviceSerial)
                });
            }
            this.emList.forEach( (item,index)=> {
                addMarker(new BMap.Point(item.longitude, item.latitude),index)
            })
        },
        opSuppliesModal(location) {
            this.closeDailog();
            this.suppliesModalType = location;
            this.isShowSuppliesModal = true;
        },
        openDialog() {
            this.showDialog = true;
            this.isShowList = false;
        },
        closeDailog() {
            this.isShowList = false;
            this.showDialog = false;
            this.isShowSuppliesModal = false;
        },
        selectClick(type) {
            this.selectType = type;
            this.showDialog = false;
            this.isShowSuppliesModal = false;
            this.isShowList = false;
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
            let [err,res] = await getEmergencyInfo()
            if( err ) return;
            let data = JSON.parse(res.message);
            let eaList = data.eaList;
            let emList = data.emList;
            this.eaList = eaList;
            this.emList = emList;
            this.createEaMap();
            this.createEmMap();
        },
        async initEaMap() {
            if( this.eaBMap ) {
                this.eaBMap.clearOverlays();
            }
            // eaList	应急队伍对象
            // emList	应急物资对象
            let [err,res] = await getEmergencyInfo()
            if( err ) return;
            let data = JSON.parse(res.message);
            let eaList = data.eaList;
            // let emList = data.emList;
            this.eaList = eaList;
            // this.emList = emList;
            // console.log( 'eaList:', eaList, "emList:", emList );
            this.createEaMap();
            // this.createEmMap();
        },
        async initVideoMap() {
            if( this.emBMap ) {
                this.emBMap.clearOverlays();
            }
            // eaList	应急队伍对象
            // emList	应急物资对象
            let [err,res] = await getDeviceList()
            if( err ) return;
            // let res = videoData;
            let emList = res.data;
            this.emList = emList;
            this.createEmMap();
        },
        async getVideoToken() {
            let [err,res] = await getVideoToken();
            if( err ) return;
            this.token = res.data;

            // this.token = 'at.be062kpedlzopk4q7vcouso0davk8909-6m2dwkb4ly-16ltzgw-njfdujzrd'
        },
        async getDeviceUrl(deviceSerial) {
            let [err,res] = await getDeviceUrl(deviceSerial);
            if( err ) return;
            // console.log( 'rss', res );
            // let res = {
            //     "result": "true",
            //     "data": "ezopen://abcd1234@open.ys7.com/E92779082/1.hd.live",
            //     "message": "请求成功"
            // }
            this.videoUrl = res.data;
            this.showDialog = true;
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
.point-station {
    position: absolute;
    width: 100px;
    height: 20px;
    background: #fff;
    z-index: 9999;
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
.selectEaMap {
    #eaMap{
        z-index: 3;
    }
    #emMap{
        z-index: -1;
    }
}
.selectEmMap {
    #eaMap{
        z-index: -1;
    }
    #emMap{
        z-index: 3;
    }
}
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
