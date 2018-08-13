<template>
  <div>
    <b-list-group
      v-for="department in departments"
      :key="department.id">
      <b-list-group-item
        class="list-group-item"
        variant="light"
        :to="'/departments/' + department.id">
        {{ department.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyDepartments',

  props: ['facultyId'],

  data () {
    return {
      departments: []
    }
  },

  methods: {
    getFacultyDepartments () {
      if (this.facultyId !== undefined) {
        axios
          .get('/faculties/' + this.facultyId + '/departments'  + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.departments = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
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
    this.getFacultyDepartments(this.facultyId)
  }
}
</script>

<style scoped>
  .list-group-item {
    color: #000;
    text-align: left;
  }
</style>
