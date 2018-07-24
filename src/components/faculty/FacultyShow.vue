<template>
<div class="container">
  <section v-if="errored" class="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <div class="jumbotron">
      <div class="page-header">
        <h1>{{ faculty.name }}</h1>
        <p>{{ faculty.description }}</p>
        <router-link :to="'/faculties/edit/' + faculty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Название</th>
        <th>Описание</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="department in departments" :key="department.id">
        <td>
          <router-link :to="'/departments/' + department.id">{{ department.name }}</router-link>
        </td>
        <td>{{ department.description }}</td>
      </tr>
      </tbody>
    </table>
    <router-link to="/faculties">
      <b-button>Назад</b-button>
    </router-link>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyShow',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      departments: null,
      errored: false
    }
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
          .get(`/faculties/${this.faculty.id}/departments`)
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
    this.getFacultyDepartments()
  }
}
</script>

<style scoped>
  .errored {
    margin: 25px;
    font-size: 20px;
  }
  .jumbotron {
    margin-top: 30px;
  }
</style>
