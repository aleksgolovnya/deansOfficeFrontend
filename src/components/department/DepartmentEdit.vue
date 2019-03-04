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
          <h1 class="h1">{{ department.name }}</h1>
          <p>{{ department.description }}</p>
        </div>
      </div>
      <div>
      <b-form @submit="onSubmit" v-if="show" class="form-class">
        <b-form-group id="departmentNameLabel"
                      label="Название кафедры:"
                      label-for="departmentName">
          <b-form-input id="departmentName"
                        type="text"
                        v-model="department.name"
                        required
                        placeholder="Введите название кафедры">
          </b-form-input>
        </b-form-group>
        <b-form-group id="departmentDescriptionLabel"
                      label="Описание кафедры:"
                      label-for="departmentDescription">
          <b-form-textarea id="departmentDescription"
                           v-model="department.description"
                           placeholder="Введите описание кафедры"
                           required
                           :rows="3"
                           :max-rows="6">
          </b-form-textarea>
        </b-form-group>
        <b-form-group id="facultyListLabel"
                      label="Факультет:"
                      label-for="facultyList">
          <b-form-select id="facultyList"
                         v-model="department.facultyId"
                         required>
            <option
              v-for="faculty in faculties"
              :key="faculty.id"
              :value="faculty.id">
              {{ faculty.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" class="button">Сохранить</b-button>
        <b-button variant="danger" @click="deleteDepartment" class="button">Удалить</b-button>
      </b-form>
      </div>
      <hr/>
      <router-link :to="'/departments/' + this.department.id">
        <b-button>Назад</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DepartmentEdit',

  data () {
    return {
      department: {
        id: this.$route.params.id,
        name: '',
        description: '',
        facultyId: '',
        faculty: {
          name: '',
          description: ''
        }
      },
      specialties: null,
      faculties: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getDepartment () {
      if (this.department.id !== undefined) {
        this.$http
          .get(`/departments/${this.department.id}`)
          .then(response => {
            this.department = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getFaculties () {
      this.$http
        .get('/faculties')
        .then(response => {
          this.faculties = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteDepartment () {
      const specialties = this.getDepartmentSpecialties()
      if (specialties != null) {
        alert('Удаление кафедры невозможно, так как он содержит специальности.' +
          'Пожалуйста удалите или перенесите специальности с этой кафедры.')
      } else {
        this.$http
          .delete(`/departments/${this.department.id}`)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/faculties/${this.department.facultyId}`)
            alert('Успешно удаленно')
          })
          .catch(error => {
            console.log(error)
            alert('Возникла ошибка при удалении' + error)
          })
      }
    },
    getDepartmentSpecialties () {
      if (this.department.id !== undefined) {
        this.$http
          .get(`/departments/${this.department.id}/specialties`)
          .then(response => {
            this.specialties = response.data.content
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$http.put(
        `/departments/${this.department.id}`,
        this.department
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.department.name = ''
      this.department.description = ''
      this.department.faculty.name = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  },

  mounted () {
    this.getDepartment()
    this.getFaculties()
    this.getDepartmentSpecialties()
  }
}
</script>

<style scoped>
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
    font-size: 18px;
    background-color: lightgray;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
  .h1 {
    margin-top: 10px;
    font-size: 35px;
    font-weight: 500;
    color: #2c3e50;
  }
    .button {
    margin-right: 5px;
  }
</style>
