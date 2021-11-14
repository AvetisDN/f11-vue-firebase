import { createRouter, createWebHistory } from "vue-router";
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Home.vue"),
      meta: {
        is_private: true
      }
    },
    {
      path: "/about",
      component: () => import("../pages/About.vue"),
      meta: {
        is_private: true
      }
    },
    {
      path: "/profile",
      component: () => import("../pages/Profile.vue"),
      meta: {
        is_private: true
      }
    },
    // {
    //   path: "/profile2",
    //   component: () => import("../pages/Profile2.vue"),
    //   meta: {
    //     is_private: true
    //   }
    // },
    {
      path: "/register",
      component: () => import("../pages/Register.vue"),
      meta: {
        is_private: false
      }
    },
    {
      path: "/login",
      component: () => import("../pages/Login.vue"),
      meta: {
        is_private: false
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.meta.is_private && !store.state.user) next({path: '/login'})
  else if(!to.meta.is_private && store.state.user) next({path: '/'})
  else next()
})

export default router;
