<template>
<div class="container-fluid">
  <h1 class="h1">Факультеты</h1>
  <b-button size="sm" v-b-modal.createFacultyModal class="button-create">Создать</b-button>
  <hr/>
  <section v-if="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <!-- Отображение модального окна добавления факультета -->
    <faculty-modal-create @createFaculty="getFaculties"></faculty-modal-create>
    <!-- Отображение карточек факультетов -->
    <div class="container-fluid">
      <b-card-group
        deck
        class="mb-3"
        v-for="faculty in faculties"
        :key="faculty.id">
        <b-card :header="faculty.name" class="text-center">
          <p class="card-text">{{ faculty.description }}</p>
          <router-link :to="'/faculties/edit/' + faculty.id">
            <b-button size="sm">Редактировать</b-button>
          </router-link>
          <router-link :to="'/faculties/' + faculty.id">
            <b-button size="sm" variant="primary">Подробнее</b-button>
          </router-link>
        </b-card>
      </b-card-group>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import FacultyModalCreate from '@/components/faculty/FacultyModalCreate'

export default {
  name: 'FacultyIndex',

  data () {
    return {
      faculties: null,
      errored: false
    }
  },

  components: {
    FacultyModalCreate
  },

  methods: {
    getFaculties () {
      axios
        .get('/faculties')
        .then(response => {
          this.faculties = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },

  mounted () {
    this.getFaculties()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 25px;
    font-size: 60px;
  }
  .container-fluid {
    padding: 30px;
  }
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
</style>
