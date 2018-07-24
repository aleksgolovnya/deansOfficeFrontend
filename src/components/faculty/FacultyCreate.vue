<template>
  <div class="container">
      <div class="jumbotron">
        <div class="page-header">
          <h1>Создание новго факультета</h1>
          <h3>{{ faculty.name }}</h3>
          <p>{{ faculty.description }}</p>
        </div>
      </div>
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="facultyNameLabel"
                        label="Название факультета:"
                        label-for="facultyName"
                        description="За вами следит ФСБ">
            <b-form-input id="facultyName"
                          type="text"
                          v-model="faculty.name"
                          required
                          placeholder="Введите название факультета">
            </b-form-input>
          </b-form-group>
          <b-form-group id="facultyDescriptionLabel"
                        label="Описание факультета:"
                        label-for="facultyDescription">
            <b-form-textarea id="facultyDescription"
                             v-model="faculty.description"
                             placeholder="Введите описание факультета"
                             required
                             :rows="3"
                             :max-rows="6">
            </b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Сохранить</b-button>
          <b-button type="reset" variant="danger">Отменить</b-button>
        </b-form>
      </div>
      <hr/>
      <router-link to="/faculties">
        <b-button>Назад</b-button>
      </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyCreate',

  data () {
    return {
      faculty: {
        name: '',
        description: ''
      },
      show: true
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(
        `/faculties`,
        this.faculty
      )
        .then(resp => alert('Created'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.faculty.name = ''
      this.faculty.description = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>

<style scoped>

</style>
