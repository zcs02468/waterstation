import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        home: {
            waterLevel: {
                oneH: 0,
                twoH: 0,
            },
        },
    },
    mutations: {
        setWaterLevel(state, obj) {
            state.home.waterLevel.oneH = obj.oneH;
            state.home.waterLevel.twoH = obj.twoH;
        },
    },
    actions: {},
    modules: {},
    getters: {
        getWaterLevel: (state) => state.home.waterLevel,
    },
});
