<template>
  <div>
    <b-list-group
      v-for="subject in subjects"
      :key="subject.id">
      <b-list-group-item
        class="list-group-item"
        variant="light"
        >
        <!--:to="'/subjects/' + subject.id"-->
        {{ subject.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TeacherSubjects',

  props: ['teacherId'],

  data () {
    return {
      subjects: []
    }
  },

  methods: {
    getTeacherSubjects () {
      if (this.teacherId !== undefined) {
        axios
          .get(`/teachers/${this.teacherId}/subjects`)
          .then(response => {
            this.subjects = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  mounted () {
    this.getTeacherSubjects()
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
