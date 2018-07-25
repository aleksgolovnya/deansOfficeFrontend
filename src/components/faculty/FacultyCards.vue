<template>
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
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyCards',

  data () {
    return {
      faculties: null
    }
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
  .mb-3 {
    display: inline-block;
    width: 48%;
    margin: 10px;
    max-width: 600px;
  }
  .text-center {
    font-size: 25px;
    /*font-weight: revert;*/
  }
  .card-text {
    font-size: 15px;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
