import Vue from 'vue'
import vueHeadful from 'vue-headful'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FacultyIndex from '@/components/faculty/FacultyIndex'
import FacultyShow from '@/components/faculty/FacultyShow'
import FacultyEdit from '@/components/faculty/FacultyEdit'
import DepartmentIndex from '@/components/department/DepartmentIndex'
import DepartmentShow from '@/components/department/DepartmentShow'
import DepartmentEdit from '@/components/department/DepartmentEdit'
import SpecialtyIndex from '@/components/specialty/SpecialtyIndex'
import SpecialtyShow from '@/components/specialty/SpecialtyShow'
import SpecialtyEdit from '@/components/specialty/SpecialtyEdit'

Vue.use(Router)
Vue.component('vue-headful', vueHeadful)

export default new Router({
  routes: [
    /**
     * Стартовая страница
     */
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    /**
     * Факультет
     */
    {
      path: '/faculties',
      name: 'FacultyIndex',
      component: FacultyIndex
    },
    {
      path: '/faculties/:id',
      name: 'FacultyShow',
      component: FacultyShow,
      props: true
    },
    {
      path: '/faculties/edit/:id',
      name: 'FacultyEdit',
      component: FacultyEdit
    },

    /**
     * Кафедра
     */
    {
      path: '/departments',
      name: 'DepartmentIndex',
      component: DepartmentIndex
    },
    {
      path: '/departments/:id',
      name: 'DepartmentShow',
      component: DepartmentShow,
      props: true
    },
    {
      path: '/departments/edit/:id',
      name: 'DepartmentEdit',
      component: DepartmentEdit
    },

    /**
     * Специальность
     */
    {
      path: '/specialties',
      name: 'SpecialtyIndex',
      component: SpecialtyIndex
    },
    {
      path: '/specialties/:id',
      name: 'SpecialtyShow',
      component: SpecialtyShow,
      props: true
    },
    {
      path: '/specialties/edit/:id',
      name: 'SpecialtytEdit',
      component: SpecialtyEdit
    }
  ]
})
