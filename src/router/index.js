import Vue from "vue";
import VueRouter from "vue-router";
import CloudinaryVue from "cloudinary-vue";
import { Cloudinary as CloudinaryCore } from "cloudinary-core";

import Home from "../views/Home.vue";
import LoggedIn from "../views/LoggedIn.vue";
import Playlists from "../views/Playlists.vue";
import UploadImage from "../components/UploadImage.vue";
import Logout from "../components/Logout.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/discovery",
    name: "LoggedIn",
    component: LoggedIn,
  },
  {
    path: "/playlists",
    name: "Playlists",
    component: Playlists,
  },
  {
    path: "/uploadimage",
    name: "UploadImage",
    component: UploadImage,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "*", 
    name: "404",
    component: Home 
  }
];

const router = new VueRouter({
  mode: "hash",
  base: '/',
  routes,
});

// all Cloudinary components:
Vue.use(CloudinaryVue, {
  configuration: { cloudName: "mai-boo" },
});

const cloudinary = new CloudinaryCore({ cloud_name: "mai-boo", secure: true });

export { cloudinary };
export default router;
