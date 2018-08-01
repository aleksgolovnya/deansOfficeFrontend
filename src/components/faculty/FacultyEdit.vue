<template>
  <div class="container-fluid">
    <section v-if="errored" class="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
    <section v-else>
      <div class="jumbotron">
        <div class="page-header">
          <h1>{{ faculty.name }}</h1>
          <p>{{ faculty.description }}</p>
        </div>
      </div>
      <div>
      <b-form @submit="onSubmit" v-if="show" class="form-class">
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
        <b-button variant="danger" @click="deleteFaculty">Удалить</b-button>
      </b-form>
      </div>
      <hr/>
      <router-link to="/faculties">
        <b-button>Назад</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyEdit',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      departments: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getFaculty () {
      if (this.faculty.id !== undefined) {
        axios
          .get(`/faculties/${this.faculty.id}`)
          .then(response => {
            this.faculty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    deleteFaculty () {
      const departments = this.getFacultyDepartments()
      if (departments != null) {
        alert('Удаление факультета невозможно, так как он содержит кафедры.' +
          'Пожалуйста удалите или перенесите кафедры с этого факультета.')
      } else {
        axios
          .delete(`/faculties/${this.faculty.id}`)
          .then(response => {
            console.log(response.data)
            this.$router.push('/faculties')
            alert('Успешно удаленно')
          })
          .catch(error => {
            console.log(error)
            alert('Возникла ошибка при удалении' + error)
          })
      }
    },
    getFacultyDepartments () {
      if (this.faculty.id !== undefined) {
        axios
          .get(`/faculties/${this.faculty.id}/departments`)
          .then(response => {
            this.departments = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(
        `/faculties/${this.faculty.id}`,
        this.faculty
      )
        .then(resp => alert('Успешно сохраненно'))
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
  },

  mounted () {
    this.getFaculty()
    this.getFacultyDepartments()
  }
}
</script>

<style scoped>
  .jumbotron {
    background-color: #f7f7f7;
    padding: 20px;
    padding-bottom: 10px;
    margin-top: 25px;
  }
  .form-class {
    max-width: 1000px;
    text-align: left;
    margin: auto;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
