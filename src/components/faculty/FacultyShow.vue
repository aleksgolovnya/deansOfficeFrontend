<template>
<div class="container-fluid">
  <section v-if="errored" class="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <!--
    Header: название и описание факультета,
         кнопка редактирования в отдельной секции
    -->
    <div class="jumbotron">
      <div class="page-header">
        <h1>{{ faculty.name }}</h1>
        <p>{{ faculty.description }}</p>
        <router-link :to="'/faculties/edit/' + faculty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
      </div>
    </div>

    <b-row>
      <b-col class="faculty-body"></b-col>
      <b-col class="departments-right"></b-col>
    </b-row>

    <!-- Модальное окно для создания новой кафедры -->
    <department-modal-create @createDepartment="getFacultyDepartments"></department-modal-create>
    <!-- Кнопка вызова модального окна -->
    <hr>
    <b-button size="sm" v-b-modal.createDepartmentModal class="button-create">Создать кафедру</b-button>
    <hr>
    <!--Отображение кафедр-->
    <b-card-group
      deck
      class="mb-3"
      v-for="department in departments"
      :key="department.id">
      <b-card :header="department.name" class="text-center">
        <p class="card-text">{{ department.description }}</p>
        <p class="faculty-text">{{ department.faculty.name }}</p>
        <router-link :to="'/departments/edit/' + department.id">
          <b-button size="sm" class="card-button">Редактировать</b-button>
        </router-link>
        <router-link :to="'/departments/' + department.id">
          <b-button size="sm" variant="primary" class="card-button">Подробнее</b-button>
        </router-link>
      </b-card>
    </b-card-group>
    <hr>
    <!-- Кнопка возврата на предыдущую страницу -->
    <router-link to="/faculties">
      <b-button class="back-button">Назад</b-button>
    </router-link>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'

export default {
  name: 'FacultyShow',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      departments: [],
      errored: false
    }
  },

  components: {
    DepartmentModalCreate
  },

  methods: {
    getFaculty () {
      if (this.faculty.id !== undefined) {
        axios
          .get(`/faculties/${this.faculty.id}`)
          .then(response => {
            this.faculty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getFacultyDepartments () {
      if (this.faculty.id !== undefined) {
        axios
          .get('/faculties/' + this.faculty.id + '/departments')
          .then(response => {
            this.departments = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },

  mounted () {
    this.getFaculty()
    this.getFacultyDepartments(this.faculty.id)
  }
}
</script>

<style scoped>
  .errored {
    margin: 25px;
    font-size: 20px;
  }
  .jumbotron {
    background-color: #f7f7f7;
    padding: 20px;
    margin-top: 25px;
  }
  .back-button {
    margin-bottom: 25px;
  }
  .container-fluid {
    padding: 0px;
  }
  /* Styles for Department Cards */
  .mb-3 {
    display: inline-block;
    width: 48%;
    margin: 10px;
    max-width: 600px;
  }
  .text-center {
    font-size: 25px;
  }
  .card-text {
    font-size: 15px;
  }
  .card-button {
    margin-top: 15px;
  }
  .faculty-text {
    margin: auto;
    font-size: 12px;
    background-color: lightgray;
    max-width: 50%;
  }
  /* End of styles for Department Cards */
</style>
