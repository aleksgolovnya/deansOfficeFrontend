<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Departments</h1>
    <section v-if="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    </section>
    <section v-else>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Faculty</th>
            <!--<th>&nbsp;</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="department in info" :key="department.id">
            <td>{{ department.name }}</td>
            <td>{{ department.description }}</td>
            <td>{{ department.faculty.name }}</td>
          </tr>
          </tbody>
        </table>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Department',

  data () {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('/departments')
      .then(response => {
        this.info = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

<style scoped>

</style>
