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
        Header: название и описание группы стдентов,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h1>Группа{{ ' ' + '"' + studentGroup.groupName + '"' }}</h1>
        <b-button size="sm" :to="'/student-groups/edit/' + studentGroup.id">Редактировать</b-button>
        <hr>
      </div>
      <b-row>
        <b-col class="body-section">
          <h3 class="h3">Студенты</h3>
          <hr>
          <student-group-students :studentGroupId="this.studentGroup.id"></student-group-students>
        </b-col>
        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Контакты</h3>
            <hr>
            <h5 class="h5">Куратор</h5>
            <p class="right-section-item-text">
              Корепанова Наталья Леонидовна
              <br>
              +79785672323
              <br>
              <a href="mailto:korepanova@sevsu.ru">korepanova@sevsu.ru</a>
            </p>
            <h5 class="h5">Наставник</h5>
            <p class="right-section-item-text">
              Головня Александр Константинович
              <br>
              +79189581098
              <br>
              <a href="mailto:golovnya@sevsu.ru">golovnya@sevsu.ru</a>
            </p>
            <h5 class="h5">Староста</h5>
            <p class="right-section-item-text">
              Фёдорова Вера Александровна
              <br>
              +79782042347
              <br>
              <a href="mailto:fedorova@sevsu.ru">fedorova@sevsu.ru</a>
            </p>
            <h5 class="h5">Заместитель старосты</h5>
            <p class="right-section-item-text">
              Иванов Смурфик Алексеевич
              <br>
              +79785552237
              <br>
              <a href="mailto:smurfik@sevsu.ru">smurfik@sevsu.ru</a>
            </p>
            <h5 class="h5">Профорг</h5>
            <p class="right-section-item-text">
              Ленин Владимир Ильич
              <br>
              +79786666666
              <br>
              <a href="mailto:lenin@sevsu.ru">lenin@sevsu.ru</a>
            </p>
          </div>
        </b-col>
      </b-row>
      <hr>
      <!-- Кнопка возврата на предыдущую страницу -->
      <b-button :to="'/specialties/' + studentGroup.specialtyId">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import StudentGroupStudents from '@/components/student-group/page/StudentGroupStudents'

export default {
  name: 'StudentGroupShow',

  data () {
    return {
      studentGroup: {
        id: this.$route.params.id,
        groupName: '',
        specialtyId: ''
      },
      errored: false
    }
  },

  components: {
    StudentGroupStudents
  },

  methods: {
    getStudentGroups () {
      if (this.studentGroup.id !== undefined) {
        axios
          .get(`/groups/${this.studentGroup.id}`)
          .then(response => {
            this.studentGroup = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    goToSpecialtyPage () {
      this.$router.replace(`/specialties/${this.studentGroup.specialtyId}`)
    },
    goToDepartmentPage () {
      this.$router.replace(`/departments/${this.studentGroup.specialty.departmentId}`)
    },
    goToFacultyPage () {
      this.$router.replace(`/faculties/${this.studentGroup.specialty.department.facultyId}`)
    }
  },

  mounted () {
    this.getStudentGroups()
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
  .right-section-item-link {
    text-align: left;
    font-size: 13px;
    cursor: pointer;
    color: #000;
  }
  .right-section-item-link:hover {
    text-decoration: underline;
    color: #737373;
    /*color: #3399ff;*/
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
