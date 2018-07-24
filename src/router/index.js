import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Faculty from '@/components/Faculty'
import Department from '@/components/Department'
import CreateDepartment from '@/components/CreateDepartment'
import FacultyIndex from '@/components/faculty/FacultyIndex'
import FacultyShow from '@/components/faculty/FacultyShow'
import FacultyCreate from '@/components/faculty/FacultyCreate'
import FacultyEdit from '@/components/faculty/FacultyEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/faculties-old',
      name: 'Faculty',
      component: Faculty
    },
    {
      path: '/departments',
      name: 'Department',
      component: Department
    },
    {
      path: '/departments/:id',
      name: 'CreateDepartment',
      component: CreateDepartment
    },
    /* Факультет */
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
      path: '/faculties',
      name: 'FacultyCreate',
      component: FacultyCreate
    },
    {
      path: '/faculties/edit/:id',
      name: 'FacultyEdit',
      component: FacultyEdit
    }
  ]
})
