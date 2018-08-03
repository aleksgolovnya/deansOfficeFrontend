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
          <h1>{{ teacher.firstName + ' ' + teacher.lastName }}</h1>
          <p class="faculty-text">{{ teacher.department.name }}</p>
        </div>
      </div>
      <div>
      <b-form @submit="onSubmit" v-if="show" class="form-class">
        <b-form-group id="teacherFirstNameLabel"
                      label="Имя преподователя:"
                      label-for="teacherFirstName">
          <b-form-input id="teacherFirstName"
                        type="text"
                        v-model="teacher.firstName"
                        required
                        placeholder="Введите имя преподователя">
          </b-form-input>
        </b-form-group>
        <b-form-group id="teacherLastNameLabel"
                      label="Фамилия преподователя:"
                      label-for="teacherLastName">
          <b-form-input id="teacherLastName"
                        type="text"
                        v-model="teacher.lastName"
                        required
                        placeholder="Введите фамилию преподователя">
          </b-form-input>
        </b-form-group>
        <b-form-group id="positionListLabel"
                      label="Должность:"
                      label-for="positiontist">
          <b-form-select id="positionList"
                         v-model="teacher.position"
                         required>
            <option>Ассистент</option>
            <option>Лаборант</option>
            <option>Старший преподаватель</option>
            <option>Кандидат технических наук</option>
            <option>Кандидат физико-математических наук</option>
            <option>Кандидат биологических наук</option>
            <option>Кандидат исторических наук</option>
            <option>Кандидат культорологии</option>
            <option>Кандидат педагогических наук</option>
            <option>Кандидат политических наук</option>
            <option>Кандидат психологических наук</option>
            <option>Кандидат социологических наук</option>
            <option>Кандидат филологических наук</option>
            <option>Кандидат философских наук</option>
            <option>Кандидат химических наук</option>
            <option>Кандидат экономических наук</option>
            <option>Кандидат юридических наук</option>
            <option>Доктор технических наук</option>
            <option>Доктор физико-математических наук</option>
            <option>Доктор биологических наук</option>
            <option>Доктор исторических наук</option>
            <option>Доктор культорологии</option>
            <option>Доктор педагогических наук</option>
            <option>Доктор политических наук</option>
            <option>Доктор психологических наук</option>
            <option>Доктор социологических наук</option>
            <option>Доктор филологических наук</option>
            <option>Доктор философских наук</option>
            <option>Доктор химических наук</option>
            <option>Доктор экономических наук</option>
            <option>Доктор юридических наук</option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="departmentListLabel"
                      label="Кафедра:"
                      label-for="departmentList">
          <b-form-select id="departmentList"
                         v-model="teacher.departmentId"
                         required>
            <option
              v-for="department in departments"
              :key="department.id"
              :value="department.id">
              {{ department.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Сохранить</b-button>
        <b-button variant="danger" @click="deleteTeacher">Удалить</b-button>
      </b-form>
      </div>
      <hr/>
      <!-- Кнопка возврата на предыдущую страницу -->
      <b-button @click="goBack">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentGroupEdit',

  data () {
    return {
      teacher: {
        id: this.$route.params.id,
        firstName: '',
        lastName: '',
        position: '',
        departmentId: '',
        department: {
          name: '',
          description: ''
        }
      },
      // subjects: null,
      departments: null,
      errored: false,
      show: true
    }
  },

  methods: {
    getTeacher () {
      if (this.teacher.id !== undefined) {
        axios
          .get(`/teachers/${this.teacher.id}`)
          .then(response => {
            this.teacher = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getDepartments () {
      axios
        .get('/departments')
        .then(response => {
          this.departments = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTeacher () {
      // const subjects = this.getTeacherSubjects()
      // if (subjects != null) {
      //   alert('Удаление преподавателя невозможно, так как он содержит предметы.' +
      //     'Пожалуйста удалите или перенесите предметы от этого преподавателя.')
      // } else {
      axios
        .delete(`/teachers/${this.teacher.id}`)
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
    // getTeacherSubjects () {
    //   if (this.teacher.id !== undefined) {
    //     axios
    //       .get(`/teachers/${this.teacher.id}/subjects`)
    //       .then(response => {
    //         this.subjects = response.data
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //   }
    // },
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(
        `/teachers/${this.teacher.id}`,
        this.teacher
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.teacher.firstName = ''
      this.this.teacher.lastName = ''
      this.this.teacher.position = ''
      this.teacher.department = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    this.getTeacher()
    this.getDepartments()
    // this.getTeacherSubjects()
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
    font-size: 15px;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
