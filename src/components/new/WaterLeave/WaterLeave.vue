<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="蓄水池水位" />
        </div>
        
                        <!-- poolDown: item.poolDown,
                        poolUp: item.poolUp,
                        poolHighest: Math.ceil(item.poolHighest),
                        waterLevel: item.waterLevel, -->
        <div class="content-box">
            <div class="left-content" v-for="(item,index) in list" :key="item.title">
                <div class="top-title" :class="`top_title${index+1}`">{{item.title}}</div>
                <div class="single-box" v-for="attr in item.children" :key="attr.id">
                    <div class="container-box">
                        <Rule :oneH="attr.poolDown" :twoH="attr.poolUp" :count="attr.poolHighest"/>
                        <Box :type="index" :num="attr.waterLevel" :count="attr.poolHighest" :textType="attr.textStyle"/>
                    </div>
                    <div class="title">{{attr.title}}</div>
                </div>
            </div>
            <!-- <div class="left-content">
                <div class="top-title top_title1">东区南</div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="1.5" :twoH="3" :count="4" />
                        <Box :type="0" />
                    </div>
                    <div class="title">东区南水塔1#</div>
                </div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="1.5" :twoH="3" :count="4" />
                        <Box :type="0" />
                    </div>
                    <div class="title">东区南水塔2#</div>
                </div>
            </div>
            <div class="left-content">
                <div class="top-title top_title2">东区北</div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="3" :twoH="5.45" :count="7" />
                        <Box :type="1" />
                    </div>
                    <div class="title">东区新北泵站1#</div>
                </div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="3" :twoH="5.45" :count="7" />
                        <Box :type="1" />
                    </div>
                    <div class="title">东区新北泵站2#</div>
                </div>
            </div>
            <div class="left-content">
                <div class="top-title top_title3">西区</div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="1.2" :twoH="3" :count="4" />
                        <Box :type="2" />
                    </div>
                    <div class="title">西区南水泵站1#</div>
                </div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule :oneH="1.2" :twoH="3" :count="4" />
                        <Box :type="2" />
                    </div>
                    <div class="title">西区南水泵站2#</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import Rule from "./Rule";
import Box from "./Box";
import comMinxins from "@/components/common/comMinxins";
import { getReservoirLevel } from "@/axios/index";
export default {
    name: "WaterLeave",
    mixins: [comMinxins],
    components: {
        Title,
        Rule,
        Box,
    },
    data() {
        return {
            list: [
                {
                    title: "东区南",
                    children: [
                        {
                            waterLevel: 0,
                            poolName: "东区南水塔1#",
                            poolUp: 3,
                            poolDown: 1.5,
                            poolHighest: 4,
                            id: 1,
                        },
                        {
                            waterLevel: 0,
                            poolName: "东区南水塔2#",
                            poolUp: 3,
                            poolDown: 1.5,
                            poolHighest: 4,
                            id: 2,
                        },
                    ],
                },
                {
                    title: "东区北",
                    children: [
                        {
                            waterLevel: 2.1,
                            poolName: "东区新北泵站1#",
                            poolUp: 5.45,
                            poolDown: 3,
                            poolHighest: 7,
                            id: 3,
                        },
                        {
                            waterLevel: 2,
                            poolName: "东区新北泵站2#",
                            poolUp: 5.45,
                            poolDown: 3,
                            poolHighest: 7,
                            id: 4,
                        },
                    ],
                },
                {
                    title: "西区",
                    children: [
                        {
                            waterLevel: 1.926,
                            poolName: "西区南泵站1#",
                            poolUp: 3,
                            poolDown: 1.2,
                            poolHighest: 4,
                            id: 5,
                        },
                        {
                            waterLevel: 2.0185,
                            poolName: "西区南泵站2#",
                            poolUp: 3,
                            poolDown: 1.2,
                            poolHighest: 4,
                            id: 6,
                        },
                    ],
                },
            ],
        };
    },

    async created() {
        this.getData();
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            const [res] = await getReservoirLevel();
            // let res = {
            //     result: "true",
            //     data: [
            //         {
            //             waterLevel: 1.926,
            //             poolName: "西区南泵站1#",
            //             poolUp: 3,
            //             poolDown: 1.2,
            //             poolHighest: 4,
            //         },
            //         {
            //             waterLevel: 2.0185,
            //             poolName: "西区南泵站2#",
            //             poolUp: 3,
            //             poolDown: 1.2,
            //             poolHighest: 4,
            //         },
            //         {
            //             waterLevel: 0,
            //             poolName: "东区南水塔1#",
            //             poolUp: 3,
            //             poolDown: 1.5,
            //             poolHighest: 3.48,
            //         },
            //         {
            //             waterLevel: 0,
            //             poolName: "东区南水塔2#",
            //             poolUp: 3,
            //             poolDown: 1.5,
            //             poolHighest: 3.9,
            //         },
            //         {
            //             waterLevel: 2.1,
            //             poolName: "东区新北泵站1#",
            //             poolUp: 5.45,
            //             poolDown: 3,
            //             poolHighest: 6.5,
            //         },
            //         {
            //             waterLevel: 2,
            //             poolName: "东区新北泵站2#",
            //             poolUp: 5.45,
            //             poolDown: 3,
            //             poolHighest: 6.5,
            //         },
            //     ],
            //     message: "获取蓄水池成功",
            // };
            let data = res.data;
            let list = [
                {
                    title: "东区南",
                    children: [],
                },
                {
                    title: "东区北",
                    children: [],
                },
                {
                    title: "西区",
                    children: [],
                },
            ]
            // waterLevel	蓄水池当前值
            // poolName	蓄水池名称
            // poolUp	蓄水池上限值
            // poolDown	蓄水池下限值
            // poolHighest	蓄水池容量高度值

            data.forEach( item => {
                let id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36);
                let textStyle = 'default';
                item.waterLevel > item.poolDown && (textStyle = 'yellow');
                item.waterLevel > item.poolUp && (textStyle = 'orange');
                if( item.poolName.indexOf('东区南') != -1 ) {
                    list[0].children.push({
                        poolName: item.poolName,
                        poolDown: item.poolDown,
                        poolUp: item.poolUp,
                        poolHighest: Math.ceil(item.poolHighest),
                        waterLevel: item.waterLevel,
                        id: id,
                        textStyle: textStyle
                    })
                    return
                }
                if( item.poolName.indexOf('东区新北') != -1 ) {
                    list[1].children.push({
                        poolName: item.poolName,
                        poolDown: item.poolDown,
                        poolUp: item.poolUp,
                        poolHighest: Math.ceil(item.poolHighest),
                        waterLevel: item.waterLevel,
                        id: id,
                        textStyle: textStyle
                    })
                    return
                }
                if( item.poolName.indexOf('西区') != -1 ) {
                    list[2].children.push({
                        poolName: item.poolName,
                        poolDown: item.poolDown,
                        poolUp: item.poolUp,
                        poolHighest: Math.ceil(item.poolHighest),
                        waterLevel: item.waterLevel,
                        id: id,
                        textStyle: textStyle
                    })
                    return
                }
            })
            this.list = list;
            this.list.splice();
        },
        getClass(value, num1, num2) {
            if( this.list[value] > arr[2] ) {
                // this.$store.commit('setAutoUrlNum');
                this.alarmList[index] = 1;
                return 'orange';
            }
            if( this.list[value] > arr[1] ) {
                // this.$store.commit('setAutoUrlNum');
                this.alarmList[index] = 1;
                return 'yellow';
            }
            return 'default';
        },
    },
};
</script>
<style lang="scss" scoped>
.detection-rate {
    position: relative;
    width: 600px;
    height: 460px;
    margin-top: 15px;
}

.panel-header {
    // padding: 22px 0 0 23px;
    padding: 16px 0 0 23px;
}
.content-box {
    display: flex;
    justify-content: space-around;
    margin-top: 26px;
    padding-left: 10px;
}
.left-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.single-box {
    margin-top: 26px;
}
.container-box {
    display: flex;
}
.top-title {
    width: 75px;
    height: 22.5px;
    background: #142955;
    text-align: center;
    margin-left: 25px;
    line-height: 22.5px;
}
.title {
    margin-top: 10px;
    text-align: right;
    font-size: 12px;
    color: #4c8ef5;
}
.top_title1 {
    border: 1px solid #4c8ef5;
    color: #4c8ef5;
}
.top_title2 {
    border: 1px solid #4cccf5;
    color: #4cccf5;
}
.top_title3 {
    border: 1px solid #1da3b0;
    color: #1da3b0;
}
</style>
