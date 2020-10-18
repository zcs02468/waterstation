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
        flood: {
            autoUrlNum: "",
            alarm: {
                waterIsAlarm: 1, // 积水声音报警
                rainfallIsAlarm: 1, //雨量声音报警 	String	1：报警；0：不报警
                waiweiIsAlarm: 1, //外围河道水位声音报警	String	1：报警；0：不报警
                weichangIsAlarm: 1, //围场河水位声音报警	String	1：报警；0：不报警
                balancingIsAlarm: 1, //调节水池水位声音报警	String	1：报警；0：不报警
            },
        },
        randomNum: 0,
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
            let date = new Date();
            state.randomNum = date.getTime();
        },
        SET_CONSUMPTION_TYPE(state, value) {
            state.home.consumptionType = value;
        },
        SET_ALARM(state, obj) {
            Object.assign(state.flood.alarm, obj);
        },
    },
    actions: {},
    modules: {},
    getters: {
        getWaterLevel: (state) => state.home.waterLevel,
    },
});
