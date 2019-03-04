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
          <h1 class="h1">{{ specialty.name }}</h1>
          <p>{{ specialty.description }}</p>
        </div>
      </div>
      <div>
      <b-form @submit="onSubmit" v-if="show" class="form-class">
        <b-form-group id="specialtyNameLabel"
                      label="Название специальности:"
                      label-for="specialtyName">
          <b-form-input id="specialtytName"
                        type="text"
                        v-model="specialty.name"
                        required
                        placeholder="Введите название специальности">
          </b-form-input>
        </b-form-group>
        <b-form-group id="specialtyDescriptionLabel"
                      label="Описание специальности:"
                      label-for="specialtyDescription">
          <b-form-textarea id="specialtyDescription"
                           v-model="specialty.description"
                           placeholder="Введите описание специальности"
                           required
                           :rows="3"
                           :max-rows="6">
          </b-form-textarea>
        </b-form-group>
        <b-form-group id="specialtyListLabel"
                      label="Кафедра:"
                      label-for="specialtyList">
          <b-form-select id="specialtyList"
                         v-model="specialty.departmentId"
                         required>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id">
              {{ department.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" class="button">Сохранить</b-button>
        <b-button variant="danger" @click="deleteSpecialty" class="button">Удалить</b-button>
      </b-form>
      </div>
      <hr/>
      <router-link :to="'/departments/' + specialty.departmentId">
        <b-button>Назад</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SpecialtyEdit',

  data () {
    return {
      specialty: {
        id: this.$route.params.id,
        name: '',
        description: '',
        departmentId: '',
        department: {
          name: '',
          description: ''
        }
      },
      studentGroups: null,
      departments: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getSpecialty () {
      if (this.specialty.id !== undefined) {
        this.$http
          .get(`/specialties/${this.specialty.id}`)
          .then(response => {
            this.specialty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getDepartments () {
      this.$http
        .get('/departments')
        .then(response => {
          this.departments = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteSpecialty () {
      const studentGroups = this.getSpecialtyStudentGroups()
      if (studentGroups != null) {
        alert('Удаление специальности невозможно, так как она содержит группы студентов.' +
          'Пожалуйста удалите или перенесите группы студентов с этой специальности.')
      } else {
        this.$http
          .delete(`/specialties/${this.specialty.id}`)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/departments/${this.specialty.departmentId}`)
            alert('Успешно удаленно')
          })
          .catch(error => {
            console.log(error)
            alert('Возникла ошибка при удалении' + error)
          })
      }
    },
    getSpecialtyStudentGroups () {
      if (this.specialty.id !== undefined) {
        this.$http
          .get(`/specialties/${this.specialty.id}/student-groups`)
          .then(response => {
            this.studentGroups = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.put(
        `/specialties/${this.specialty.id}`,
        this.specialty
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.specialty.name = ''
      this.specialty.description = ''
      this.specialty.department.name = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  },

  mounted () {
    this.getSpecialty()
    this.getDepartments()
    this.getSpecialtyStudentGroups()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 10px;
    font-size: 35px;
    font-weight: 500;
    color: #2c3e50;
  }
  .jumbotron {
    background-color: #f8f8f8;
    padding: 20px;
    padding-bottom: 10px;
    margin-top: 25px;
  }
  .form-class {
    max-width: 1000px;
    text-align: left;
    margin: auto;
  }
  .faculty-text {
    margin: auto;
    font-size: 12px;
    background-color: lightgray;
    max-width: 50%;
  }
  .container-fluid {
    padding: 0px;
  }
  .button {
    margin-right: 5px;
  }
</style>
