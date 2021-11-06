import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Home.vue"),
      meta: {
        private: true
      }
    },
    {
      path: "/register",
      component: () => import("../pages/Register.vue"),
      meta: {
        private: false
      }
    },
    {
      path: "/login",
      component: () => import("../pages/Login.vue"),
      meta: {
        private: false
      }
    },
  ],
});

export default router;
