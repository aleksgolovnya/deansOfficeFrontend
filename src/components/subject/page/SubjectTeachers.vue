<template>
  <div>
    <b-list-group
      class="list-group"
      v-for="teacher in teachers"
      :key="teacher.id">
      <b-list-group-item
        class="list-group-item"
        variant="light"
        :to="'/teachers/' + teacher.id">
        <h5 class="h5">{{ teacher.firstName + ' ' + teacher.lastName}}</h5>
        <small class="small-item-text">{{ teacher.position }}</small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubjectTeachers',

  props: ['teacherId'],

  data () {
    return {
      teachers: []
    }
  },

  methods: {
    getSubjectTeachers () {
      if (this.departmentId !== undefined) {
        axios
          .get(`/subjects/${this.departmentId}/teachers`)
          .then(response => {
            this.teachers = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  mounted () {
    this.getSubjectTeachers()
  }
}
</script>

<style scoped>
  .list-group-item {
    color: #000;
    text-align: left;
    width: 265px;
    height: 70px;
    display: inline-block;
  }
  .small-item-text {
    font-size: 12px;
  }
  .list-group {
    display: inline-block;
    margin: 0px 15px 15px 0px;
    float: left;
  }
  .h5 {
    color: #000;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
</style>
