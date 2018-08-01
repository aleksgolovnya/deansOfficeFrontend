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
      Header: название и описание факультета,
      кнопка редактирования в отдельной секции
    -->
      <div class="header-section">
        <h1>{{ faculty.name }}</h1>
        <router-link :to="'/faculties/edit/' + faculty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>
      <b-row>
        <b-col class="body-section">
          <p class="body-section-text">
            {{ faculty.description }}
          </p>
          <p class="body-section-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
          <p class="body-section-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
        </b-col>
        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Кафедры</h3>
            <hr>
            <faculty-departments :facultyId="this.faculty.id"></faculty-departments>
          </div>
          <div class="right-section-item">
            <h3 class="h3">Контакты</h3>
            <hr>
            <h5 class="h5">Адресс института</h5>
            <p class="right-section-item-text">
              г. Севастополь, ул. Университетская, 33
            </p>
            <h5 class="h5">Директор института</h5>
            <p class="right-section-item-text">
              Бондарев Владимир Николаевич
              <br>
              <a href="mailto:bondarev@sevsu.ru">bondarev@sevsu.ru</a>
            </p>

            <h5 class="h5">Заместитель директора по учебной и воспитательной работе</h5>
            <p class="right-section-item-text">
              Кожаев Ефим Александрович
              <br>
              <a href="mailto:kozhaev@sevsu.ru">kozhaev@sevsu.ru</a>
            </p>
            <h5 class="h5">Заместитель директора по учебно-научной работе</h5>
            <p class="right-section-item-text">
              Мирянова Вера Николаевна
              <br>
              <a href="mailto:vnmiryanova@sevsu.ru">vnmiryanova@sevsu.ru</a>
            </p>
          </div>
        </b-col>
      </b-row>
    <hr>
    <!-- Кнопка возврата на предыдущую страницу -->
    <b-button to="/faculties">Назад</b-button>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import FacultyDepartments from '@/components/faculty/page/FacultyDepartments'

export default {
  name: 'FacultyShow',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      departments: [],
      errored: false
    }
  },

  components: {
    FacultyDepartments
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
    getFacultyDepartments () {
      if (this.faculty.id !== undefined) {
        axios
          .get('/faculties/' + this.faculty.id + '/departments')
          .then(response => {
            this.departments = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },

  mounted () {
    this.getFaculty()
    this.getFacultyDepartments(this.faculty.id)
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
  .h5 {
    color: #000;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
  /* Конец правой секции */

  /* Styles for Department Cards */
  .mb-3 {
    display: inline-block;
    width: 48%;
    margin: 10px;
    max-width: 600px;
  }
  .text-center {
    font-size: 25px;
  }
  .card-text {
    font-size: 15px;
  }
  .card-button {
    margin-top: 15px;
  }
  .faculty-text {
    margin: auto;
    font-size: 12px;
    background-color: lightgray;
    max-width: 50%;
  }
  /* End of styles for Department Cards */
</style>
