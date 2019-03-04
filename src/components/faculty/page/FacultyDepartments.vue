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
        this.$http
          .get('/faculties/' + this.facultyId + '/departments')
          .then(response => {
            this.departments = response.data.content
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
  .list-group-item {
    color: #000;
    text-align: left;
  }
</style>
