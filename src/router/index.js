// jshint esversion:6

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Help from "../views/Help.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about/:username",
    name: "About",
    component: About
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  }
];

const router = new VueRouter({
  routes
});

export default router;
