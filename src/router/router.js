import Vue from 'vue'
import vueHeadful from 'vue-headful'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FacultyIndex from '@/components/faculty/FacultyIndex'
import FacultyShow from '@/components/faculty/page/FacultyShow'
import FacultyEdit from '@/components/faculty/FacultyEdit'
import DepartmentIndex from '@/components/department/DepartmentIndex'
import DepartmentShow from '@/components/department/page/DepartmentShow'
import DepartmentEdit from '@/components/department/DepartmentEdit'
import SpecialtyIndex from '@/components/specialty/SpecialtyIndex'
import SpecialtyShow from '@/components/specialty/page/SpecialtyShow'
import SpecialtyEdit from '@/components/specialty/SpecialtyEdit'
import StudentGroupIndex from '@/components/student-group/StudentGroupIndex'
import StudentGroupShow from '@/components/student-group/page/StudentGroupShow'
import StudentGroupEdit from '@/components/student-group/edit/StudentGroupEdit'
import StudentIndex from '@/components/student/StudentIndex'
import StudentShow from '@/components/student/page/StudentShow'
import StudentEdit from '@/components/student/StudentEdit'
import TeacherIndex from '@/components/teacher/TeacherIndex'
import TeacherShow from '@/components/teacher/page/TeacherShow'
import TeacherEdit from '@/components/teacher/TeacherEdit'
import ScheduleIndex from '@/components/schedule/ScheduleIndex'
import ScheduleShow from '@/components/schedule/page/ScheduleShow'
import ScheduleEdit from '@/components/schedule/ScheduleEdit'
import SubjectIndex from '@/components/subject/SubjectIndex'
import SubjectShow from '@/components/subject/page/SubjectShow'
import SubjectEdit from '@/components/subject/SubjectEdit'
import Login from '@/components/Login'

Vue.use(Router)
Vue.component('vue-headful', vueHeadful)

export default new Router({
  // mode: 'history',
  routes: [
    /**
     * Стартовая страница
     */
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout'
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
    },

    /**
     * Группа студентов
     */
    {
      path: '/student-groups',
      name: 'StudentGroupIndex',
      component: StudentGroupIndex
    },
    {
      path: '/student-groups/:id',
      name: 'StudentGroupShow',
      component: StudentGroupShow,
      props: true
    },
    {
      path: '/student-groups/edit/:id',
      name: 'StudentGrouptEdit',
      component: StudentGroupEdit
    },

    /**
     * Студенты
     */
    {
      path: '/students',
      name: 'StudentIndex',
      component: StudentIndex
    },
    {
      path: '/students/:id',
      name: 'StudentShow',
      component: StudentShow,
      props: true
    },
    {
      path: '/students/edit/:id',
      name: 'StudentEdit',
      component: StudentEdit
    },

    /**
     * Преподаватели
     */
    {
      path: '/teachers',
      name: 'TeacherIndex',
      component: TeacherIndex
    },
    {
      path: '/teachers/:id',
      name: 'TeacherShow',
      component: TeacherShow,
      props: true
    },
    {
      path: '/teachers/edit/:id',
      name: 'TeacherEdit',
      component: TeacherEdit
    },

    /**
     * Расписание
     */
    {
      path: '/schedule',
      name: 'ScheduleIndex',
      component: ScheduleIndex
    },
    {
      path: '/schedule/:id',
      name: 'ScheduleShow',
      component: ScheduleShow,
      props: true
    },
    {
      path: '/schedule/edit/:id',
      name: 'ScheduleEdit',
      component: ScheduleEdit
    },

    /**
     * Предмет
     */
    {
      path: '/subjects',
      name: 'SubjectIndex',
      component: SubjectIndex
    },
    {
      path: '/subjects/:id',
      name: 'SubjectShow',
      component: SubjectShow,
      props: true
    },
    {
      path: '/subjects/edit/:id',
      name: 'SubjectEdit',
      component: SubjectEdit
    }

  ]
})
