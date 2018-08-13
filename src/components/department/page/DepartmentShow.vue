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
        Header: название и описание кафедры,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h4 class="h4">{{ department.faculty.name }}</h4>
        <h1>{{ department.name }}</h1>
        <router-link :to="'/departments/edit/' + department.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>

      <b-row>
        <b-col class="body-section">
          <!-- Секция описания -->
          <div class="body-description">
            <!-- Описание кафедры -->
            <h3 class="h3">О кафедре</h3>
            <hr>
            <p class="body-section-text">
              {{ department.description }}
            </p>
          </div>

          <!-- Секция содержимого -->
          <div class="body-section-items">
            <!-- Список преподавателей кафедры -->
            <h3 class="h3">Преподаватели</h3>
            <hr>
            <department-teachers :departmentId="this.department.id"></department-teachers>
          </div>
        </b-col>

        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Специальности</h3>
            <hr>
            <department-specialties :departmentId="this.department.id"></department-specialties>
          </div>
          <div class="right-section-item">
            <h3 class="h3">Контакты</h3>
            <hr>
            <h5 class="h5">Адресс кафедры</h5>
            <p class="right-section-item-text">
              г. Севастополь, ул. Университетская, 33
            </p>
            <h5 class="h5">Заведующий кафедрой</h5>
            <p class="right-section-item-text">
              Бондарев Владимир Николаевич
              <br>
              <a href="mailto:bondarev@sevsu.ru">bondarev@sevsu.ru</a>
            </p>
          </div>
        </b-col>
      </b-row>
      <hr>
      <!-- Кнопка возврата на предыдущую страницу -->
      <b-button :to="'/faculties/' + department.facultyId">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import DepartmentSpecialties from '@/components/department/page/DepartmentSpecialties'
import DepartmentTeachers from '@/components/department/page/DepartmentTeachers'

export default {
  name: 'DepartmentShow',

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
      errored: false
    }
  },

  components: {
    DepartmentSpecialties,
    DepartmentTeachers
  },

  methods: {
    getDepartment () {
      if (this.department.id !== undefined) {
        axios
          .get('/departments/' + this.department.id + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.department = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getCookie () {
      let name = "Auth-Token"
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  },

  mounted () {
    this.getDepartment()
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
    padding: 0px 15px 15px 15px;
    margin-right: 60px;
  }
  .body-section-text {
    color: #000;
    text-align: left;
    font-size: 17px;
  }
  /* Конец главной секции */

  /* Правая секция */
  .right-section {
    float: right;
    padding: 0px 15px 15px;
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
