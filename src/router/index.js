import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Flood from "../views/Flood.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')
  },
  {
    path: "/flood",
    name: "Flood",
    component: () => import('../views/Flood.vue')
  },
  {
    path: "/rain",
    name: "Rain",
    component: () => import('../views/Flood.vue')
  }
];

const router = new VueRouter({
  mode:"history",
  base:"/water/",
  routes
});

export default router;
