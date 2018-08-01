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
        <!--<div class="page-header">-->
          <p class="faculty-text">{{ formatDate(scheduleRecord.date) }}</p>
          <h1>{{ scheduleRecord.subject.name }}</h1>
          <p class="faculty-text">Пара №{{ scheduleRecord.classNumber }}</p>
          <p class="faculty-text">Преподаватель:{{ ' ' + scheduleRecord.teacher.firstName + ' ' + scheduleRecord.teacher.lastName }}</p>
          <p class="faculty-text">Группа: {{ ' ' + scheduleRecord.studentsGroup.groupName }}</p>
        <!--</div>-->
      </div>

      <div>
        <b-form @submit="onSubmit" v-if="show" class="form-class">
          <!-- Предмет -->
          <b-form-group id="subjectListLabel"
                        label="Предмет:"
                        label-for="subjectGroupList">
            <b-form-select id="subjectGroupList"
                           v-model="scheduleRecord.subjectId"
                           required>
              <option
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id">
                {{ subject.name }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- Преподаватель -->
          <b-form-group id="teacherListLabel"
                        label="Преподаватель:"
                        label-for="teacherGroupList">
            <b-form-select id="teacherGroupList"
                           v-model="scheduleRecord.teacherId"
                           required>
              <option
                v-for="teacher in teachers"
                :key="teacher.id"
                :value="teacher.id">
                {{ teacher.firstName + ' ' + teacher.lastName }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- Группа студентов -->
          <b-form-group id="studentGroupListLabel"
                        label="Группа студентов:"
                        label-for="studentGroupList">
            <b-form-select id="studentGroupList"
                           v-model="scheduleRecord.studentsGroupId"
                           required>
              <option
                v-for="studentGroup in studentGroups"
                :key="studentGroup.id"
                :value="studentGroup.id">
                {{ studentGroup.groupName }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- Дата -->
          <b-form-group id="scheduleRecordDateLabel"
                        label="Дата:"
                        label-for="scheduleRecordDate">
            <b-form-input id="scheduleRecordDate"
                          type="date"
                          v-model="scheduleRecord.date"
                          required>
            </b-form-input>
          </b-form-group>

          <!-- Номер пары -->
          <b-form-group id="classNumberListLabel"
                        label="Номер пары:"
                        label-for="classNumberList">
            <b-form-select id="classNumberList"
                           v-model="scheduleRecord.classNumber"
                           required>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </b-form-select>
          </b-form-group>

          <!-- Кнопки сохранить и удалить -->
          <b-button type="submit" variant="primary">Сохранить</b-button>
          <b-button variant="danger" @click="deleteScheduleRecord">Удалить</b-button>
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
import moment from 'moment'
export default {
  name: 'ScheduleEdit',

  data () {
    return {
      teachers: '',
      subjects: '',
      studentGroups: '',
      scheduleRecord: {
        id: this.$route.params.id,
        subjectId: '',
        teacherId: '',
        studentsGroupId: '',
        date: '',
        classNumber: '',
        studentsGroup: {
          groupName: ''
        },
        teacher: {
          firstName: '',
          lastName: ''
        },
        subject: {
          name: ''
        }
      },
      errored: false,
      show: true
    }
  },

  methods: {
    getScheduleRecord () {
      if (this.scheduleRecord.id !== undefined) {
        axios
          .get(`/schedule/${this.scheduleRecord.id}`)
          .then(response => {
            this.scheduleRecord = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    deleteScheduleRecord () {
      axios
        .delete(`/schedule/${this.scheduleRecord.id}`)
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
    getSubjects () {
      axios
        .get('/subjects')
        .then(response => {
          this.subjects = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTeachers () {
      axios
        .get('/teachers')
        .then(response => {
          this.teachers = response.data
        })
        .catch(error => {
          console.log(error)
        })
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
    formatDate (date) {
      return moment(String(date)).format('DD.MM.YYYY')
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(
        `/schedule/${this.scheduleRecord.id}`,
        this.scheduleRecord
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.scheduleRecord.subject = ''
      this.scheduleRecord.teacher = ''
      this.scheduleRecord.studentsGroup = ''
      this.scheduleRecord.date = ''
      this.scheduleRecord.classNumber = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    this.getScheduleRecord()
    this.getSubjects()
    this.getTeachers()
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
    font-size: 15px;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
