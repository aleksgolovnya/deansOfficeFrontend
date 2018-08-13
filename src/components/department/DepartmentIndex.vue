<template>
<div class="container-fluid">
  <h1 class="h1">Кафедры университета</h1>
  <!-- Модальное окно для создания новой кафедры -->
  <department-modal-create @createDepartment="getDepartments"></department-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createDepartmentModal class="button-create">Создать</b-button>
  <hr/>
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
</div>
</template>

<script>
import axios from 'axios'
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'
// import { mapState } from 'vuex'

export default {
  name: 'DepartmentIndex',

  components: {
    DepartmentModalCreate
  },

  data () {
    return {
      departments: []
    }
  },

  // Vuex
  // methods: {
  //   ...mapState([
  //     'departments'
  //   ])
  // },
  //
  // mounted () {
  //   this.$store.dispatch('GET_DEPARTMENTS_LIST')
  // }

  methods: {
    getDepartments () {
      axios
        .get('/departments' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.departments = response.data
        })
        .catch(error => {
          console.log(error)
          if (error.response.status === 401) {
            alert('К сожалению вы не имеете доступа к этой странице, ' +
              'пожалуйста авторизируйтесь.')
            this.$router.replace('/login')
          }
        })
    },
    getCookie () {
      let name = "Auth-Token"
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  },

  mounted () {
    this.getDepartments()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 25px;
    font-size: 60px;
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
