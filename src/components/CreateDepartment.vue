<template>
<div>
  <h1>{{department.id}}</h1>

  <form>
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="department.name" />
    </div>
    <div>
      <label for="description">Description</label>
      <input id="description" v-model="department.description" />
    </div>
    <input type="button" v-on:click="saveDepartment" value="SAVE">
  </form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateDepartment',

  data () {
    return {
      department: {
        id: this.$route.params.id,
        name: '',
        description: ''
      }
    }
  },

  methods: {
    findDepartment () {
      if (this.department.id !== undefined) {
        axios.get(`/departments/${this.department.id}`)
          .then(resp => {
            this.department = resp.data
          })
          .catch(err => console.error(err)) // fixme handle error
      }
    },
    saveDepartment: function () {
      axios.put(
        `/departments/${this.department.id}`,
        this.department
      )
        .then(resp => alert('saved'))
        .catch(err => console.error(err))
    }
  },
  mounted () {
    this.findDepartment()
  }
}
</script>

<style scoped>

</style>
