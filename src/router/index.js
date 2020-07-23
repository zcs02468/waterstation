import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Flood from "../views/Flood.vue";
import zcs from "../views/zcs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/flood",
    name: "Flood",
    component: Flood
  },
  {
    path: "/zcs",
    name: "zcs",
    component: zcs
  },
];

const router = new VueRouter({
  mode:"history",
  routes
});

export default router;
