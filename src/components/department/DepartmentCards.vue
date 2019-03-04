<template>
  <div class="container-fluid">
    <hr/>
    <b-button size="sm" v-b-modal.createDepartmentModal class="button-create">Создать кафедру</b-button>
    <hr/>
    <!-- Модальное окно создания новой кафедры -->
    <department-modal-create :facultyId="facultyId" @createDepartment="getFacultyDepartments"></department-modal-create>

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
  </div>
</template>

<script>
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'

export default {
  name: 'DepartmentCards',

  props: ['facultyId'],

  data () {
    return {
      departments: null
    }
  },

  components: {
    DepartmentModalCreate
  },

  methods: {
    getFacultyDepartments () {
      if (this.facultyId !== undefined) {
        this.$http
          .get('/faculties/' + this.facultyId + '/departments')
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
    this.getFacultyDepartments(this.facultyId)
  }
}
</script>

<style scoped>
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
  .container-fluid {
    padding: 0px;
  }
</style>
