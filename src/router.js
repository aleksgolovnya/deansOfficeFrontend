import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import NProgress from 'nprogress';
import Home from './views/Home.vue';
import Login from '@/components/Login';
import UserBoard from '@/components/UserBoard';
import UserPage from '@/components/UserPage';
import UserCreate from '@/components/UserCreate';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/userboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personal',
      name: 'userPage',
      component: UserPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: UserCreate
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
