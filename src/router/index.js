import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Productsview from "../views/Productsview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product/:id",
      name: "product",
      component: Productsview,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      // route level code-splitting
    },
  ],
});

export default router;
