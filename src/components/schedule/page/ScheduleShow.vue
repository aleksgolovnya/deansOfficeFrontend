<template>
  <div class="container-fluid">
    <section v-if="errored" class="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
    <section v-else>
      <!--
        Header: название предмета и преподаватель,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h1>{{ scheduleRecord.subject.name }}</h1>
        <p>{{ scheduleRecord.teacher.firstName + ' ' + scheduleRecord.teacher.lastName }}</p>
        <router-link :to="'/schedule/edit/' + scheduleRecord.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>
      <b-row>
        <b-col class="body-section">
          <h3 class="h3">Журнал</h3>
          <hr>
          <journal :scheduleRecordId="scheduleRecord.id" :studentGroupId="scheduleRecord.studentsGroupId"></journal>
        </b-col>
        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Информация</h3>
            <hr>
            <h5 class="h5">Дата</h5>
            <p class="right-section-item-text">
              {{ formatDate(scheduleRecord.date) }}
            </p>
            <h5 class="h5">Группа</h5>
            <p class="right-section-item-text">
              {{ scheduleRecord.studentsGroup.groupName }}
            </p>
            <h5 class="h5">Номер пары</h5>
            <p class="right-section-item-text">
              {{ scheduleRecord.classNumber }}
            </p>
          </div>
        </b-col>
      </b-row>
      <hr>
      <!-- Кнопка возврата на предыдущую страницу -->
      <b-button @click="goBack">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Journal from '@/components/schedule/page/Journal'

export default {
  name: 'ScheduleShow',

  data () {
    return {
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
      errored: false
    }
  },

  components: {
    Journal
  },

  methods: {
    /**
     * Метод получают одну запись из расписания по id
     */
    getScheduleRecord () {
      if (this.scheduleRecord.id !== undefined) {
        axios
          .get(`/schedule/${this.scheduleRecord.id}`)
          .then(response => {
            this.scheduleRecord = response.data
            console.log('Запись расписания', response.data)
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },

    /**
     * Пробуем получить студентов группы
     */
    getStudentGroupStudents () {
      console.log('Id группы студентов до проверки и get запроса (ScheduleShow): ' + this.scheduleRecord.studentsGroupId)
      if (this.scheduleRecord.studentsGroupId !== undefined) {
        axios
          .get('/groups/students/' + this.scheduleRecord.studentsGroupId)
          .then(response => {
            console.log('Студенты получены', response.data)
          })
          .catch(error => {
            console.log('Ошибка в выполнении запроса getStudentGroupStudents студентов из (ScheduleShow)')
            console.log('Id группы студентов после get запроса (ScheduleShow): ' + this.scheduleRecord.studentsGroupId)
            console.log(error)
          })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    formatDate (date) {
      return moment(String(date)).format('DD.MM.YYYY')
    }
  },

  mounted () {
    this.getScheduleRecord()
    this.getStudentGroupStudents()
  }
}
</script>

<style scoped>
  .errored {
    margin: 25px;
    font-size: 20px;
  }
  .container-fluid {
    padding: 30px;
  }
  /* Главная секция */
  .body-section {
    padding: 15px;
  }
  .body-section-text {
    color: #000;
    text-align: left;
    font-size: 17px;
  }
  /* Конец главной секции */

  /* Правая секция */
  .right-section {
    margin-top: 15px;
    float: right;
  }
  .right-section-item {
    margin-bottom: 20px;
  }
  .right-section-item-text {
    color: #000;
    text-align: left;
    font-size: 13px;
  }
  .h3 {
    text-align: left;
  }
  .h4 {
    font-size: 18px;
  }
  .h5 {
    color: #000;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
  /* Конец правой секции */
</style>
