<template>
<div class="container-fluid">
  <h1 class="h1">Кафедры</h1>
  <!-- Модальное окно для создания новой кафедры -->
  <department-modal-create @createDepartment="getDepartments"></department-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createDepartmentModal class="button-create" v-if="isAdmin">Создать</b-button>
  <hr/>
     <!--Отображение кафедр-->
    <b-card-group
      deck
      class="mb-3"
      v-for="department in departments"
      :key="department.id">
      <b-card :header="department.name" class="text-center">
        <p class="card-text">{{ department.description }}</p>
        <router-link :to="'/departments/edit/' + department.id">
          <b-button size="sm" class="card-button" v-if="isAdmin">Редактировать</b-button>
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
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'

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

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  methods: {
    getDepartments () {
      this.$http
        .get('/departments')
        .then(response => {
          this.departments = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  mounted () {
    this.getDepartments()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 10px;
    font-size: 50px;
    font-weight: 500;
    color: #2c3e50;
  }
  .container-fluid {
    padding: 30px;
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
    margin-left: 5px; 
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
