import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        home: {
            consumptionType: 0, // 0--日 1--周  2--月
            waterLevel: {
                oneH: 0,
                twoH: 0,
            },
        },
        flood:{
            autoUrlNum: ''
        },
        randomNum: 0
    },
    mutations: {
        setWaterLevel(state, obj) {
            state.home.waterLevel.oneH = obj.oneH;
            state.home.waterLevel.twoH = obj.twoH;
        },
        setAutoUrlNum(state) {
            state.flood.autoUrlNum = Math.random();
        },
        SET_RANDOM_NUM(state) {
            console.log( '设置时间' );
            let date = new Date();
            state.randomNum = date.getTime();
        },
        SET_CONSUMPTION_TYPE(state,value) {
            state.home.consumptionType = value
        }
    },
    actions: {},
    modules: {},
    getters: {
        getWaterLevel: (state) => state.home.waterLevel,
    },
});
