import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';
import NProgress from 'nprogress';
import Home from './views/Home.vue';
import Login from '@/components/user/Login';
import UserPage from '@/components/user/UserPage';
import UserCreate from '@/components/user/UserCreate';

import FacultyIndex from '@/components/faculty/FacultyIndex';
import FacultyShow from '@/components/faculty/page/FacultyShow';
import FacultyEdit from '@/components/faculty/FacultyEdit';
import DepartmentIndex from '@/components/department/DepartmentIndex';
import DepartmentShow from '@/components/department/page/DepartmentShow';
import DepartmentEdit from '@/components/department/DepartmentEdit';
import SpecialtyIndex from '@/components/specialty/SpecialtyIndex';
import SpecialtyShow from '@/components/specialty/page/SpecialtyShow';
import SpecialtyEdit from '@/components/specialty/SpecialtyEdit';
import StudentGroupIndex from '@/components/student-group/StudentGroupIndex';
import StudentGroupShow from '@/components/student-group/page/StudentGroupShow';
import StudentGroupEdit from '@/components/student-group/edit/StudentGroupEdit';

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
      path: '/login',
      name: 'login',
      component: Login
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
    },

    /**
     * Факультет
     */
    {
      path: '/faculties',
      name: 'FacultyIndex',
      component: FacultyIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/faculties/:id',
      name: 'FacultyShow',
      component: FacultyShow,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/faculties/edit/:id',
      name: 'FacultyEdit',
      component: FacultyEdit,
      meta: { requiresAuth: true }
    },

    /**
     * Кафедра
     */
    {
      path: '/departments',
      name: 'DepartmentIndex',
      component: DepartmentIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/departments/:id',
      name: 'DepartmentShow',
      component: DepartmentShow,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/departments/edit/:id',
      name: 'DepartmentEdit',
      component: DepartmentEdit,
      meta: { requiresAuth: true }
    },

    /**
     * Специальность
     */
    {
      path: '/specialties',
      name: 'SpecialtyIndex',
      component: SpecialtyIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/specialties/:id',
      name: 'SpecialtyShow',
      component: SpecialtyShow,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/specialties/edit/:id',
      name: 'SpecialtytEdit',
      component: SpecialtyEdit,
      meta: { requiresAuth: true }
    },

    /**
     * Группа студентов
     */
    {
      path: '/student-groups',
      name: 'StudentGroupIndex',
      component: StudentGroupIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/student-groups/:id',
      name: 'StudentGroupShow',
      component: StudentGroupShow,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/student-groups/edit/:id',
      name: 'StudentGrouptEdit',
      component: StudentGroupEdit,
      meta: { requiresAuth: true }
    },

    {
      path: '/notfound',
      name: 'notfound',
      component: () => import('./components/NotFound.vue')
    },
    {
      path: '*',
      redirect: '/notfound'
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
