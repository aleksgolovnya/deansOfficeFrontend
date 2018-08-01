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
          <h1>{{ student.firstName + ' ' + student.lastName }}</h1>
          <p class="faculty-text">{{ student.studentsGroup.groupName }}</p>
        </div>
      </div>
      <div>
        <b-form @submit="onSubmit" v-if="show" class="form-class">
        <b-form-group id="studentFirstNameLabel"
                      label="Имя:"
                      label-for="studentFirstName">
          <b-form-input id="studentFirstName"
                        type="text"
                        v-model="student.firstName"
                        required
                        placeholder="Введите имя студента">
          </b-form-input>
        </b-form-group>
        <b-form-group id="studentLastNameLabel"
                      label="Фамилия:"
                      label-for="studentLastName">
          <b-form-input id="studentLastName"
                        type="text"
                        v-model="student.lastName"
                        required
                        placeholder="Введите фамилию студента">
          </b-form-input>
        </b-form-group>
        <b-form-group id="courseListLabel"
                      label="Курс:"
                      label-for="courseList">
          <b-form-select id="courseList"
                         v-model="student.course"
                         required>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="studentGroupListLabel"
                      label="Группа студентов:"
                      label-for="studentGroupList">
          <b-form-select id="studentGroupList"
                         v-model="student.groupId"
                         required>
            <option
              v-for="studentGroup in studentGroups"
              :key="studentGroup.id"
              :value="studentGroup.id">
              {{ studentGroup.groupName }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button variant="danger" @click="deleteStudent">Удалить</b-button>
      </b-form>
      </div>
      <hr/>
      <!-- Возврат на страницу назад -->
      <b-button @click="goBack">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentEdit',

  data () {
    return {
      student: {
        id: this.$route.params.id,
        firstName: '',
        lastName: '',
        course: '',
        groupId: '',
        studentsGroup: {
          name: '',
          description: ''
        }
      },
      studentGroups: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getStudent () {
      if (this.student.id !== undefined) {
        axios
          .get(`/students/${this.student.id}`)
          .then(response => {
            this.student = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getStudentGroups () {
      axios
        .get('/groups')
        .then(response => {
          this.studentGroups = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteStudent () {
      axios
        .delete(`/students/${this.student.id}`)
        .then(response => {
          console.log(response.data)
          this.$router.go(-1)
          alert('Успешно удаленно')
        })
        .catch(error => {
          console.log(error)
          alert('Возникла ошибка при удалении' + error)
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      if (!this.student.firstName) {
        alert('Пожалуйста введите имя студента.')
      } else if (!this.student.lastName) {
        alert('Пожалуйста введите фамилию студента.')
      } else if (!this.student.course) {
        alert('Пожалуйста укажите курс обучения студента.')
      } else if (!this.student.studentsGroup) {
        alert('Пожалуйста укажите учебную группу для студента.')
      } else {
        axios.put(
          `/students/${this.student.id}`,
          this.student
        )
          .then(resp => alert('Успешно сохраненно'))
          .catch(err => console.error(err))
      }
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.student.firstName = ''
      this.student.lastName = ''
      this.student.course = ''
      this.student.studentsGroup = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    this.getStudent()
    this.getStudentGroups()
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
  .faculty-text {
    margin: auto;
    font-size: 18px;
    background-color: lightgray;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
