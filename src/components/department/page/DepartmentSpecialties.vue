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
          .get('/departments/' + this.departmentId + '/specialties' + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.specialties = response.data
          })
          .catch(error => {
            console.log(error)
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
