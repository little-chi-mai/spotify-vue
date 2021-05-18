import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoggedIn from "../components/LoggedIn.vue";
import Playlist from "../components/Playlist.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
  },
  {
    path: "/loggedin",
    name: "Logged In",
    component: LoggedIn,
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: Playlist,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
