import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Faculty from '@/components/Faculty'
import Department from '@/components/Department'
import CreateDepartment from '@/components/CreateDepartment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/faculties',
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
    }
  ]
})
