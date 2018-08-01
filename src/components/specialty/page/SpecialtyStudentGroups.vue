<template>
  <div>
    <b-list-group
      v-for="studentGroup in studentGroups"
      :key="studentGroup.id">
      <b-list-group-item
        class="list-group-item"
        variant="light"
        :to="'/student-groups/' + studentGroup.id">
        {{ studentGroup.groupName }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpecialtyStudentGroups',

  props: [`specialtyId`],

  data () {
    return {
      studentGroups: []
    }
  },

  methods: {
    getSpecialtyStudentGroups () {
      if (this.specialtyId !== undefined) {
        axios
          .get(`/specialties/${this.specialtyId}/student-groups`)
          .then(response => {
            this.studentGroups = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  mounted () {
    this.getSpecialtyStudentGroups()
  }
}
</script>

<style scoped>
  .list-group-item {
    color: #000;
    text-align: left;
    margin-bottom: 10px;
  }
</style>
