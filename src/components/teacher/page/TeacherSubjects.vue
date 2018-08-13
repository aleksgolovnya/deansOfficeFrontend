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
          .get('/teachers/' + this.teacherId + '/subjects' + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.subjects = response.data
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
