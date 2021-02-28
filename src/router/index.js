import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import('../views/index.vue')
  },
  {
    path: "/flood",
    name: "Flood",
    component: () => import('../views/Flood.vue')
  },
  {
    path: "/normal",
    name: "Normal",
    component: () => import('../views/Flood.vue')
  }
];

const router = new VueRouter({
  mode:"history",
  base:"/water/",
  routes
});

export default router;
