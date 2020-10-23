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
                                <p>时间：{{ item.planTimeInterval }}</p>
                                <p>内容：{{ item.workContent }}</p>
                                <p>特种作业：{{ workTypeArr[item.specialWork] }}</p>
                                <p>科室负责人：{{ item.deptHeadName }}</p>
                                <p>监管员：{{ item.supervisorNames }}</p>
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
            const [res] = await getConstructionInfo();
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
    width: 640px;
    height: 500px;
    padding: 0 23px;
}
.back {
    position: absolute;
    left: 0;
    top: 6px;
    height: 204.5px;
    width: 100%;
    background: url("../../../assets/image/RoadworkInfoBack.jpg");
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
        height: 30px;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        position: relative;
        span {
            display: inline-block;
            position: relative;
            height: 30px;
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
            border: 1px solid #2272b7;
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
    background: rgba(9, 33, 84, 0.4);
    padding-bottom: 5px;
    width: 590px;
    height: 401px;
    /deep/ .el-carousel__container {
        height: 401px;
    }
    /deep/ .carousel-box {
        margin-left: 0;
        padding-top: 0;
    }
}

//图像部分  76  3  10
.tab-user {
    width: 100%;
    height: 180px;
    padding-top: 20px;
    display: flex;
    .user-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .img-box {
        width: 89px;
        height: 89px;
        border-radius: 50%;
        border: 10px solid #00579e;
        img {
            display: inline-block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid #1bc2f9;
        }
    }
    .name {
        margin-top: 20px;
        min-width: 80px;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        background: #244485;
        text-align: center;
        position: relative;
    }
}

.carousel-box {
    margin-left: 37.5px;
    // margin-top: 33px;
    padding-top: 33px;
    // width: 432px;
    // height: 150px;
}
//内容介绍
.tab-content-box {
    background: #092050;
    width: 507px;
    height: 216px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 42px;
    background: url("../../../assets/image/maintain.jpg");
    background-size: 100% 100%;
    .content {
        width: 432px;
        height: 150px;
        position: relative;
        z-index: 1;
        p {
            width: 100%;
            height: 30px;
            font-size: 14px;
            line-height: 38px;
            border-bottom: 1px solid #2866e4;
        }
    }
}

.ring {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 30px;
}
.ring:before,
.ring:after {
    content: " ";
    display: block;
    position: absolute;
    width: 80px;
    height: 30px;
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
        clip: rect(0px, 80px, 30px, 78px);
    }
    25% {
        clip: rect(0px, 80px, 2px, 0px);
    }
    50% {
        clip: rect(0px, 2px, 30px, 0px);
    }
    75% {
        clip: rect(28px, 80px, 30px, 0px);
    }
}
</style>
