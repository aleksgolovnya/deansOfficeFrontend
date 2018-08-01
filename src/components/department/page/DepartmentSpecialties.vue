<template>
  <div>
    <b-list-group
      v-for="specialty in specialties"
      :key="specialty.id">
      <b-list-group-item
        class="list-group-item"
        variant="light"
        :to="'/specialties/' + specialty.id">
        {{ specialty.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DepartmentSpecialties',

  props: ['departmentId'],

  data () {
    return {
      specialties: []
    }
  },

  methods: {
    getDepartmentSpecialties () {
      if (this.departmentId !== undefined) {
        axios
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
    this.getDepartmentSpecialties()
  }
}
</script>

<style scoped>
  .list-group-item {
    color: #000;
    text-align: left;
  }
</style>
