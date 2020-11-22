<!--  -->
<template>
    <div class="panel detection-rate left-container-angle">
        <div class="panel-header">
            <Title title="蓄水池水位" />
        </div>
        <div class="content-box">
            <div class="left-content" v-for="(item,index) in list" :key="item.title">
                <div class="top-title" :class="`top_title${index+1}`">{{item.title}}</div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule />
                        <Box :type="index"/>
                    </div>
                    <div class="title">东区南水塔1#</div>
                </div>
                <div class="single-box">
                    <div class="container-box">
                        <Rule />
                        <Box :type="index"/>
                    </div>
                    <div class="title">东区南水塔1#</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import Rule from "./Rule";
import Box from "./Box";
import comMinxins from "@/components/common/comMinxins"
import { getDetectionRate } from "@/axios/index";
export default {
    name: "WaterLeave",
    mixins:[comMinxins],
    components: {
        Title,
        Rule,
        Box
    },
    data() {
        return {
            list:[
                {
                    title:"东区南",
                    children:[
                        {
                            title:'东区南水塔1#'
                        },
                        {
                            title:'东区南水塔2#'
                        },
                    ]
                },
                {
                    title:"东区北",
                    children:[
                        {
                            title:'东区新北泵站1#'
                        },
                        {
                            title:'东区新北泵站2#'
                        },
                    ]
                },
                {
                    title:"西区",
                    children:[
                        {
                            title:'西区南泵站1#'
                        },
                        {
                            title:'西区南泵站2#'
                        },
                    ]
                },
            ]
        };
    },

    async created() {

    },

    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            const [res] = await getDetectionRate();
            let message = JSON.parse(res.message);
            this.water_detectionRate_west = message.water_detectionRate_west;
            this.water_detectionRate_east = message.water_detectionRate_east;
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
        }
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
    color: #4C8EF5;
}
.top_title1 {
    border: 1px solid #4C8EF5;
    color: #4C8EF5;
}
.top_title2 {
    border: 1px solid #4CCCF5;
    color: #4CCCF5;
}
.top_title3 {
    border: 1px solid #1DA3B0;
    color: #1DA3B0;
}
</style>
