<template>
  <div class="container-fluid">
    <b-card-group
      deck
      class="mb-3"
      v-for="specialty in specialties"
      :key="specialty.id">
      <b-card :header="specialty.name" class="text-center">
        <p class="card-text">{{ specialty.description }}</p>
        <p class="faculty-text">{{ specialty.department.name }}</p>
        <router-link :to="'/specialties/edit/' + specialty.id">
          <b-button size="sm" class="card-button">Редактировать</b-button>
        </router-link>
        <router-link :to="'/specialties/' + specialty.id">
          <b-button size="sm" variant="primary" class="card-button">Подробнее</b-button>
        </router-link>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'SpecialtyCards',

  props: ['departmentId'],

  data () {
    return {
      specialties: null
    }
  },

  methods: {
    getDepartmentSpecialties () {
      if (this.departmentId !== undefined) {
        this.$htpp
          .get(`/departments/${this.departmentId}/specialties`)
          .then(response => {
            this.specialties = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  mounted () {
    this.getDepartmentSpecialties(this.departmentId)
  }
}
</script>

<style scoped>
  .mb-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    margin: 10px;
    /* max-width: 600px; */
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
    max-width: 70%;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
