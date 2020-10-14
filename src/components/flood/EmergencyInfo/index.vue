<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="应急看板" />
        </div>
        <div class="panel-bodyer">
            <ul v-if="!status">
                <li v-for="(item, i) in bbList" :key="`EmergencyInfo${i}`"><span>{{ item.napeName }}:</span>&nbsp;&nbsp;{{item.napeValue}}</li>
            </ul>
            <ul v-else>
                <li v-for="(item, i) in adList" :key="`EmergencyInfo${i}`"><span>{{ item.warningLevel }}:</span>&nbsp;&nbsp;{{item.remark1 || ''}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins"
import {getBulletinBoard} from "../../../axios";

export default {
    name: "EmergencyInfo",
    mixins:[comMinxins],
    data() {
        return {
            bbList:[],
            adList:[],
            status: 0,
        };
    },

    components: {
        Title,
    },

    created() {
        if (window.location.hash == "#status") {
            this.status = 1
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            try {
                let [res] = await getBulletinBoard();
                let data = JSON.parse(res.message)
                this.bbList = data.bbList;
                this.adadList = data.adList;
                // adList		Object	
                // warningLevel	预警等级	String	
                // remark1	应对措施	String	如果为空，则不显示
            } catch (error) {
                console.error('error', error)
            }
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
        }
    
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 756.5px;
    height: 184px;
    margin-top: 20px;
}
.panel-header {
    padding: 15px 0 0 22.5px;
}

ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 0 55px;
}
li {
    font-size: 18px;
    min-width: 180.5px;
    margin-top: 30px;
    &:nth-child(2),
    &:nth-child(5) {
        margin-left: 50px;
        margin-right: 50px;
    }
}
</style>
