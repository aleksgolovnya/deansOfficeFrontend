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
        Header: имя и фамилия преподавателя,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h1>{{ teacher.firstName + ' ' + teacher.lastName }}</h1>
        <router-link :to="'/teachers/edit/' + teacher.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>
      <b-row>
        <b-col class="body-section">
          <h3 class="h3">Расписание</h3>
          <hr>
          <teacher-schedule :teacherId="teacher.id"></teacher-schedule>

        </b-col>
        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Информация</h3>
            <hr>
            <h5 class="h5">Кафедра</h5>
            <p class="right-section-item-text">
              {{ teacher.department.name }}
            </p>
            <h5 class="h5">Должность</h5>
            <p class="right-section-item-text">
              {{ teacher.position }}
            </p>

            <hr>
            <h3 class="h3">Предметы</h3>
            <hr>
            <teacher-subjects :teacherId="teacher.id"></teacher-subjects>

            <hr>
            <h3 class="h3">Контакты</h3>
            <hr>
            <h5 class="h5">Адресс проживания</h5>
            <p class="right-section-item-text">
              г. Севастополь, ул. Университетская, 33
            </p>
            <h5 class="h5">Телефон</h5>
            <p class="right-section-item-text">
              +79189581098
            </p>
            <h5 class="h5">E-mail</h5>
            <p class="right-section-item-text">
              <a href="mailto:aleksandergolovnya@gmail.com">aleksandergolovnya@gmail.com</a>
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
import TeacherSubjects from '@/components/teacher/page/TeacherSubjects'
import TeacherSchedule from '@/components/teacher/page/TeacherSchedule'

export default {
  name: 'StudentShow',

  data () {
    return {
      teacher: {
        id: this.$route.params.id,
        firstName: '',
        lastName: '',
        position: '',
        departmentId: '',
        department: {
          name: ''
        }
      },
      errored: false
    }
  },

  components: {
    TeacherSubjects,
    TeacherSchedule
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
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    this.getTeacher()
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
