import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Flood from "../views/Flood.vue";

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
];

const router = new VueRouter({
  mode:"history",
  routes
});

export default router;
