<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="back"></div>
        <div class="panel-header">
            <Title title="施工信息情况" />
        </div>
        <div class="panel-bodyer">
            <ul>
                <li :class="selectIndex == 'fixData' ? 'select' : ''" @click="selectClick('fixData')">
                    <span>抢修<b></b></span>
                    <i v-show="selectIndex == 'fixData'"></i>
                </li>
                <li :class="selectIndex == 'maintainData' ? 'select' : ''" @click="selectClick('maintainData')">
                    <span>维护<b></b></span>
                    <i v-show="selectIndex == 'maintainData'"></i>
                </li>
                <li :class="selectIndex == 'roadworkData' ? 'select' : ''" @click="selectClick('roadworkData')">
                    <span>施工<b></b></span>
                    <i v-show="selectIndex == 'roadworkData'"></i>
                </li>
            </ul>
            <div class="content-box">
                <el-carousel class="carousel-box" trigger="click" :nterval="3000" indicator-position="none" arrow="never">
                    <el-carousel-item v-for="item in workData[selectIndex]" :key="item.id">
                        <div class="tab-user">
                            <div class="user-box" v-for="ele in item.userData" :key="ele.id">
                                <div class="img-box">
                                    <img :src="ele.url" alt="" />
                                </div>
                                <div class="name">{{ ele.name }}<span class="ring"></span></div>
                            </div>
                        </div>
                        <div class="tab-content-box">
                            <div class="content">
                                <p><span></span> 时间：{{ item.planTimeInterval }}</p>
                                <p><span></span>内容：{{ item.workContent }}</p>
                                <p><span></span>特种作业：{{ workTypeArr[item.specialWork] }}</p>
                                <p><span></span>当日班组长：{{ item.deptHeadName }}</p>
                                <p><span></span>供水监管员：{{ item.supervisorNames }}</p>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import { getConstructionInfo } from "../../../axios/index";
export default {
    name: "roadworkInfo",
    mixins:[comMinxins],
    data() {
        return {
            selectIndex: "fixData",
            workData: {
                fixData: [],
                maintainData: [],
                roadworkData: [],
            },
            workTypeArr: [null, "动火作业", "登高作业", "有限空间作业"],
        };
    },

    components: {
        Title,
    },

    async created() {
        this.getData();
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            let [err,res] = await getConstructionInfo();
            if( err ) return;
            // const res = {"result":"true","message":"{\"orderList\":[{\"id\":\"1282543937222967296\",\"pageNo\":null,\"orderBy\":null,\"pageSize\":null,\"isNewRecord\":false,\"lastUpdateDateTime\":null,\"createDate\":null,\"createBy\":null,\"createByName\":null,\"updateDate\":null,\"status\":null,\"updateByName\":null,\"remarks\":null,\"updateBy\":null,\"bpm\":{\"taskId\":null,\"procInsId\":null,\"activityId\":null,\"comment\":null,\"dueDate\":null,\"priority\":null,\"nextUserCodes\":null,\"view\":false},\"workNo\":\"1282543937222967296\",\"procins\":\"1282543938242183168\",\"deviceCode\":null,\"workType\":\"1\",\"subType\":\"1001\",\"workTitle\":\"水管损坏\",\"buildType\":\"1\",\"specialWork\":\"1\",\"planBeginTime\":1594915200000,\"planEndTime\":1594915200000,\"deptHead\":\"user14_d2qj\",\"deptHeadName\":\"用户14\",\"supervisors\":\"user15_1g7d,user16_u1gg\",\"supervisorNames\":\"用户15,用户16\",\"supervisorAvatars\":\"http://47.110.155.149:8980/smartEnergy/userfiles/avatar/0/employee/user15_1g7d.jpg,null\",\"workContent\":\"萨达\",\"acceptOffice\":null,\"acceptUser\":null,\"submitTime\":\"2020-07-13 13:14:37\",\"submitUser\":\"system\",\"workSubmitUser\":\"张三\",\"parentWork\":\"\",\"workStatus\":\"1\",\"faultPlace\":\"T2航站楼\",\"faultCode\":null,\"dispatchTime\":null,\"dispatchUser\":null,\"arrivalTime\":null,\"finishTime\":null,\"cancelTime\":null,\"fittingCode\":null,\"extendS1\":null,\"extendS2\":null,\"extendS3\":null,\"extendS4\":null,\"extendS5\":null,\"extendS6\":null,\"extendS7\":null,\"extendS8\":null,\"extendS9\":null,\"extendS10\":null,\"phoneNumber\":\"13212345612\",\"remark\":null,\"resources\":null,\"operList\":null,\"workStatusName\":null,\"workTypeName\":null,\"subTypeName\":null,\"acceptOfficeName\":null,\"submitUserName\":null,\"acceptUserName\":null,\"empName\":null,\"reportPictureList\":null,\"prePictureList\":null,\"postPictureList\":null,\"buildTypeName\":null,\"specialWorkName\":null,\"planTimeInterval\":\"00:00-00:00\",\"orWorkStatusName\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"status_in\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"updateDate_lte\":null,\"id_in\":null},{\"id\":\"1282544722090491904\",\"pageNo\":null,\"orderBy\":null,\"pageSize\":null,\"isNewRecord\":false,\"lastUpdateDateTime\":null,\"createDate\":null,\"createBy\":null,\"createByName\":null,\"updateDate\":null,\"status\":null,\"updateByName\":null,\"remarks\":null,\"updateBy\":null,\"bpm\":{\"taskId\":null,\"procInsId\":null,\"activityId\":null,\"comment\":null,\"dueDate\":null,\"priority\":null,\"nextUserCodes\":null,\"view\":false},\"workNo\":\"1282544722090491904\",\"procins\":\"1282544722254069760\",\"deviceCode\":null,\"workType\":\"1\",\"subType\":\"1001\",\"workTitle\":\"水管损坏\",\"buildType\":\"1\",\"specialWork\":\"1\",\"planBeginTime\":1594915200000,\"planEndTime\":1594915200000,\"deptHead\":\"user15_1g7d\",\"deptHeadName\":\"用户15\",\"supervisors\":\"user17_wkai,user18_r5wh\",\"supervisorNames\":\"用户17,用户18\",\"supervisorAvatars\":\"null,null\",\"workContent\":\"啊啊\",\"acceptOffice\":null,\"acceptUser\":null,\"submitTime\":\"2020-07-13 13:17:44\",\"submitUser\":\"system\",\"workSubmitUser\":\"张三\",\"parentWork\":\"1282543937222967296\",\"workStatus\":\"1\",\"faultPlace\":\"T2航站楼\",\"faultCode\":null,\"dispatchTime\":null,\"dispatchUser\":null,\"arrivalTime\":null,\"finishTime\":null,\"cancelTime\":null,\"fittingCode\":null,\"extendS1\":null,\"extendS2\":null,\"extendS3\":null,\"extendS4\":null,\"extendS5\":null,\"extendS6\":null,\"extendS7\":null,\"extendS8\":null,\"extendS9\":null,\"extendS10\":null,\"phoneNumber\":\"13511111111\",\"remark\":null,\"resources\":null,\"operList\":null,\"workStatusName\":null,\"workTypeName\":null,\"subTypeName\":null,\"acceptOfficeName\":null,\"submitUserName\":null,\"acceptUserName\":null,\"empName\":null,\"reportPictureList\":null,\"prePictureList\":null,\"postPictureList\":null,\"buildTypeName\":null,\"specialWorkName\":null,\"planTimeInterval\":\"00:00-00:00\",\"orWorkStatusName\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"status_in\":null,\"updateDate_gte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"updateDate_lte\":null,\"id_in\":null}]}"}
            let data = JSON.parse(res.message);
            this.filterAjaxData(data.orderList);
        },
        selectClick(value) {
            this.selectIndex = value;
        },
        //数据处理
        filterAjaxData(data) {
            let fixData = [];
            let maintainData = [];
            let roadworkData = [];
            data.forEach((item) => {
                let imgs = item.supervisorAvatars.split(",");
                let users = item.supervisorNames.split(",");
                let userData = [];
                imgs.forEach((item, index) => {
                    userData.push({
                        url: item,
                        name: users[index],
                    });
                });
                let obj = {
                    userData: userData,
                    planTimeInterval: item.planTimeInterval,
                    workContent: item.workContent,
                    specialWork: item.specialWork,
                    deptHeadName: item.deptHeadName,
                    supervisorNames: item.supervisorNames,
                    id: item.id
                };
                if( item.buildType == 1 ) {
                    //抢修
                    fixData.push(obj);
                } 
                if( item.buildType == 2 || item.buildType == 3 ) {
                    //施工
                    roadworkData.push(obj);
                } 
                if( item.buildType == 4 ) {
                    //维护
                    maintainData.push(obj);
                }
            });
            this.workData.fixData = fixData;
            this.workData.maintainData = maintainData;
            this.workData.roadworkData = roadworkData;
            this.workData.fixData.splice();
            this.workData.maintainData.splice();
            this.workData.roadworkData.splice();
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 603px;
    height: 430px;
    padding: 0 23px;
    margin-top: 15px;
}
.back {
    position: absolute;
    left: 0;
    top: 6px;
    height: 204.5px;
    width: 100%;
    // background: url("../../../assets/image/RoadworkInfoBack.jpg");
    background-size: 100% 100%;
}
.panel-content {
    background: #092050;
}
.panel-header {
    height: 60px;
    padding-top: 25px;
}
//tab切换
ul {
    width: 100%;
    display: flex;
    li {
        flex: 1;
        height: 27.5px;
        font-size: 18px;
        text-align: center;
        line-height: 27.5px;
        position: relative;
        span {
            display: inline-block;
            position: relative;
            height: 100%;
            width: 68px;
            color: #4bdcff;
            cursor: pointer;
            b {
                position: absolute;
            }
        }
        i {
            position: absolute;
            width: 100%;
            height: 3px;
            // border: 1px solid #2272b7;
            background: #00a5e9;
            bottom: 0;
            left: 0;
        }
    }
    .select {
        span {
            color: #fff;
            b {
                position: absolute;
                left: 0;
                width: 100%;
                height: 100%;
                background: #00a5e9;
                transform: skewX(-20deg);
                z-index: -1;
            }
        }
    }
}

.content-box {
    margin-top: 22.5px;
    background: rgba(9, 33, 84, 0.4);
    padding-bottom: 5px;
    width: 556px;
    height: 305px;
    /deep/ .el-carousel__container {
        height: 305px;
    }
    /deep/ .carousel-box {
        margin-left: 0;
        padding-top: 0;
    }
}

//图像部分  76  3  10
.tab-user {
    width: 100%;
    height: 90px;
    padding-top: 5px;
    display: flex;
    .user-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .img-box {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 6px solid #00579e;
        img {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid #1bc2f9;
        }
    }
    .name {
        margin-top: 10px;
        min-width: 64px;
        height: 24px;
        font-size: 12px;
        line-height: 24px;
        background: #244485;
        text-align: center;
        position: relative;
    }
}

.carousel-box {
    margin-left: 37.5px;
    padding-top: 33px;
}
//内容介绍
.tab-content-box {
    background: #092050;
    width: 442px;
    height: 181px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 57px;
    background: url("../../../assets/image/maintain.jpg");
    background-size: 100% 100%;
    margin-top: 14px;
    .content {
        width: 367px;
        height: 115px;
        position: relative;
        z-index: 1;
        p {   
            width: 100%;
            height: 25px;
            font-size: 12px;
            line-height: 25px;
            border-bottom: 1px solid #2866e4;
            padding-left: 5px;
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
}

.ring {
    position: absolute;
    left: 0;
    top: 0;
    width: 64px;
    height: 23px;
}
.ring:before,
.ring:after {
    content: " ";
    display: block;
    position: absolute;
    // width: 80px;
    // height: 30px;
    width: 64px;
    height: 23px;
    border: 2px solid #2fa9f7;
    z-index: 10;
    box-sizing: border-box;
    -webkit-animation: clipAni 8s infinite linear;
}
.ring:before {
    -webkit-animation-delay: -4s;
}
@keyframes clipAni {
    0%,
    100% {
        clip: rect(0px, 64px, 24px, 62px);
    }
    25% {
        clip: rect(0px, 64px, 2px, 0px);
    }
    50% {
        clip: rect(0px, 2px, 24px, 0px);
    }
    75% {
        clip: rect(22px, 64px, 24px, 0px);
    }
}
</style>
