<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Факультеты</h1>
    <section v-if="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    </section>
    <section v-else>
      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="faculty in info" :key="faculty.id">
                <td>{{ faculty.name }}</td>
                <td>{{ faculty.description }}</td>
                <td>
                  <button type="button" class="btn btn-warning">Редактировать</button>
                  <button type="button" class="btn btn-danger">Удалить</button>
                </td>
            </tr>
            </tbody>
          </table>
        </b-col>
        <b-col lg="3">
          <b-card>
            <form @submit.prevent="saveDepartment">
              <b-form-group label="Название">
                <b-form-input type="text" v-model="info.name"></b-form-input>
              </b-form-group>
              <b-form-group label="Описание">
                <b-form-textarea rows="2" v-model="info.description"></b-form-textarea>
              </b-form-group>
              <div>
                <b-btn type="submit" variant="success">Сохранить</b-btn>
              </div>
            </form>
          </b-card>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Faculty',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      info: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('/faculties')
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
  .card-header {
    text-align: left;
  }
</style>
