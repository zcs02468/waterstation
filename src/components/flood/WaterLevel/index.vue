<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道及水池水位" />
        </div>
        <div class="panel-bodyer">
          <div class="panel-top body-content">
            <div class="content-header">
              <span class="iconfont iconbolangn3 default"></span><span class="title default">围场河</span>
              <span class="select-item" v-for="(item,index) in categoryArr" :key="item">
                <span class="round" :class="`${colorArr[index]}-border`"></span>
                <span class="text" :class="`${colorArr[index]}`">{{item}}</span>
              </span>
            </div>
            <div class="content-body">
              <rule :standardList="standardList"/>
              <div class="water-box-content">
                <div class="water-box">
                  <Box :textType="classType.value1" :num="list.value1"/>
                  <div class="title">南水塔</div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.value2" :num="list.value2"/>
                  <div class="title">迎宾三路</div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.value3" :num="list.value3"/>
                  <div class="title">东泵站</div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.value4" :num="list.value4"/>
                  <div class="title">北水塔</div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-top body-content">
            <div class="content-header">
              <span class="iconfont iconbolangn2 default"></span><span class="title default">外围河道</span>
              <span class="select-item" v-for="(item,index) in categoryArr" :key="item">
                <span class="round" :class="`${colorArr[index]}-border`"></span>
                <span class="text" :class="`${colorArr[index]}`">{{item}}</span>
              </span>
            </div>
            <div class="content-body">
              <rule :standardList="standardList"/>
              <div class="water-box-content">
                <div class="water-box">
                  <Box :textType="classType.youle_level" :num="list.youle_level"/>
                  <div class="title">东区 <span>友乐路泵站</span></div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.south_out_level" :num="list.south_out_level"/>
                  <div class="title">西区 <span>南泵站</span></div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.north_out_level" :num="list.north_out_level"/>
                  <div class="title">西区 <span>北泵站</span></div>
                </div>
                <div class="water-box" style="visibility:hidden;">
                  <Box textType="default" :num="1.92"/>
                  <div class="title"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-top body-content">
            <div class="content-header">
              <span class="iconfont iconbolangn1 default"></span><span class="title default">调节水池</span>
              <span class="select-item" v-for="(item,index) in categoryArr1" :key="item">
                <span class="round" :class="`${colorArr[index]}-border`"></span>
                <span class="text" :class="`${colorArr[index]}`">{{item}}</span>
              </span>
            </div>
            <div class="content-body">
              <rule :standardList="standardList"/>
              <div class="water-box-content">
                <div class="water-box">
                  <Box :textType="classType.south_east_level" :num="list.south_east_level"/>
                  <div class="title text-center">南<span>东侧</span></div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.south_west_level" :num="list.south_west_level"/>
                  <div class="title text-center">南<span>西侧</span></div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.north_east_level" :num="list.north_east_level"/>
                  <div class="title text-center">北<span>东侧</span></div>
                </div>
                <div class="water-box">
                  <Box :textType="classType.north_west_level" :num="list.north_west_level"/>
                  <div class="title text-center">北<span>西侧</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
import rule from "./rule"
import Box from "./Box"
import comMinxins from "../../common/comMinxins"
import {getRiverCourseLevel} from "../../../axios/index"
import {mapState} from "vuex"

export default {
    name: "WaterLevel",
    mixins:[comMinxins],
    data() {
        return {
            defaultColor: 'default',
            categoryArr:['排水通畅','排水放缓','排水困难'],
            categoryArr1:['安全水位','可控水位','警戒水位'],
            colorArr:['default','yellow','orange'],
            list:{
              value1:'2.244',
              value2:'1.966',
              value3:'2.33',
              value4:'2.327',

              youle_level: '',
              north_out_level:'',
              south_out_level:'',
              south_east_level:'',
              south_west_level:'',
              north_east_level:'',
              north_west_level:'',
              standardList:[]
            },
            classType: {
              value1:'',
              value2:'',
              value3:'',

              youle_level: 'default',
              north_out_level:'default',
              south_out_level:'default',
              south_east_level:'default',
              south_west_level:'default',
              north_east_level:'default',
              north_west_level:'default',
            },
            standardList:[2,3],
            alarmList:[0,0,0]
        };
    },

    components: {
        Title,
        rule,
        Box
    },

    created() {
        this.getData()
    },

    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            let [err,res] = await getRiverCourseLevel();
            if( err ) return;
            let data = JSON.parse(res.message);
            let standardList = data.standardList;

            this.list.youle_level = this.keepTwoDecimal(data.youle_level);
            this.list.north_out_level = this.keepTwoDecimal(data.north_out_level);
            this.list.south_out_level = this.keepTwoDecimal(data.south_out_level);
            this.list.south_east_level = this.keepTwoDecimal(data.south_east_level);
            this.list.south_west_level = this.keepTwoDecimal(data.south_west_level);
            this.list.north_east_level = this.keepTwoDecimal(data.north_east_level);
            this.list.north_west_level = this.keepTwoDecimal(data.north_west_level);
            let arr = []
            standardList.forEach(item => {
                arr.push( item.dictValue )
            })
            this.standardList = arr;
            this.standardList.splice();
            this.alarmList = [0,0,0];
            //0 围场河  1 外围河道   2 - 调节水池 
            this.classType.value1 = this.getClass(arr,'value1',0);
            this.classType.value2 = this.getClass(arr,'value2',0);
            this.classType.value3 = this.getClass(arr,'value3',0);
            this.classType.value4 = this.getClass(arr,'value4',0);


            this.classType.youle_level = this.getClass(arr,'youle_level',1);
            this.classType.north_out_level = this.getClass(arr,'north_out_level',1);
            this.classType.south_out_level = this.getClass(arr,'south_out_level',1);
            this.classType.south_east_level = this.getClass(arr,'south_east_level',2);
            this.classType.south_west_level = this.getClass(arr,'south_west_level',2);
            this.classType.north_east_level = this.getClass(arr,'north_east_level',2);
            this.classType.north_west_level = this.getClass(arr,'north_west_level',2);
            
            this.alarmList.forEach((item,index) => {
              if( index == 0 ) {
                if(item && Number(this.alarm.weichangIsAlarm)) {
                  this.$store.commit('setAutoUrlNum');
                }
              }
              if( index == 1 ) {
                if(item && Number(this.alarm.waiweiIsAlarm)) {
                  this.$store.commit('setAutoUrlNum');
                }
              }
              if( index == 2 ) {
                if(item && Number(this.alarm.balancingIsAlarm)) {
                  this.$store.commit('setAutoUrlNum');
                }
              }
            })
            // 北调节池外河水位 north_out_level
            // 南调节池外河水位 south_out_level

            // 对应  外围河道，

            // 南调节东侧前水位 south_east_level	南调节东侧前水位
            // 南调节西侧前水位 south_west_level	南调节西侧前水位
            // 北调节东侧前水位 north_east_level	北调节东侧前水位
            // 北调节西侧前水位 north_west_level	北调节西侧前水位
            
            // 对应   调节水池
        },
        getClass(arr,value,index) {
            if( this.list[value] > arr[2] ) {
                this.alarmList[index] = 1;
                return 'orange';
            }
            if( this.list[value] > arr[1] ) {
                this.alarmList[index] = 1;
                return 'yellow';
            }
            return 'default';
        },
        keepTwoDecimal(num) {
          var result = parseFloat(num);

          if (isNaN(result)) {

            return 0;
          }

          result = Math.round(num * 100) / 100;

          return result;
        },
    },

    computed: {
        ...mapState({
            // weichangIsAlarm: state => state.flood.alarm.weichangIsAlarm,	//围场河水位声音报警	String	1：报警；0：不报警
            // waiweiIsAlarm: state => state.flood.alarm.waiweiIsAlarm,	//外围河道水位声音报警	String	1：报警；0：不报警
            // balancingIsAlarm: state => state.flood.alarm.balancingIsAlarm,	//调节水池水位声音报警	String	1：报警；0：不报警
            alarm: state => state.flood.alarm
        })
    },
};
</script>
<style lang="scss" scoped>
.divider {
    border-top:1px solid #D8D8D8;
}
.default {
  color: #7BC7FF;
}
.yellow {
    color: #F6BA16;
}
.orange {
    color: #FF5E3D;
}
.panel {
    width: 540px;
    height: 607px;
    position: relative;
    margin-top: 23px;
}
.panel-header {
    padding: 21px 0 0 22.5px;
}
// .body-content {
//     display: flex;
// }
.body-content {
  height: 185px;
  padding-top: 10px;
}
.content-header {
    display: flex;
    align-items: center;
    padding-left: 22.5px;
    .iconfont {
        font-size: 20px;
        vertical-align: middle;
    }
    .title {
        margin-left: 2px;
        font-size: 16px;
        vertical-align: middle;
    }
}
.select-item {
  font-size: 12px;
  margin-left: 18px;
  .default-border {
    border: 1px solid #7BC7FF;
  }
  .yellow-border {
    border: 1px solid #F6BA16;
  }
  .orange-border {
    border: 1px solid #FF5E3D;
  }
  .round {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: transparent;
    margin-right: 5px;
  }
}
.content-body {
  height: 95px;
  padding: 0 15px 0 35px;
  position: relative;
  // outline: 1px solid red;
  margin-top: 22px;
  .title {
    font-size: 15px;
    text-align: center;
    margin-top: 2px;
  }
}
.water-box-content {
  position: absolute;
  top: 0;
  left: 53px;
  width: 460px;
  display: flex;
  justify-content: space-between;
}
.text-center {
  text-align: left;
  display: flex;
  span {
    flex: 1;
    text-align: center;
  }
}
</style>
