import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import axios from "axios";
import "./assets/js/flexible";
import { Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/styles/base.scss";
import "@/assets/styles/common.scss";

Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
