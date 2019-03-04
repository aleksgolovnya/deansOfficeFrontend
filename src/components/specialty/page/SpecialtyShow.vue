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
        Header: название и описание специальности,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h1>{{ specialty.name }}</h1>
        <router-link :to="'/specialties/edit/' + specialty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>

      <b-row>
        <b-col class="body-section">
          <!-- Секция описания -->
          <div class="body-description">
            <!-- Описание кафедры -->
            <h3 class="h3">О специальности</h3>
            <hr>
            <p class="body-section-text">
              {{ specialty.description }}
            </p>
          </div>

          <!-- Секция содержимого -->
          <!--<div class="body-section-items">-->
            <!--&lt;!&ndash; Список преподавателей кафедры &ndash;&gt;-->
            <!--<h3 class="h3">Преподаватели</h3>-->
            <!--<hr>-->
            <!--<department-teachers :departmentId="this.department.id"></department-teachers>-->
          <!--</div>-->
        </b-col>

        <b-col class="right-section" cols="3">
          <div class="right-section-item">
            <h3 class="h3">Группы студентов</h3>
            <hr>
            <specialty-student-groups :specialtyId="this.specialty.id"></specialty-student-groups>
          </div>
          <div class="right-section-item">
            <h3 class="h3">Контакты</h3>
            <hr>
            <h5 class="h5">Руководителей программы</h5>
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
      <b-button :to="'/departments/' + specialty.departmentId">Назад</b-button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import SpecialtyStudentGroups from '@/components/specialty/page/SpecialtyStudentGroups'

export default {
  name: 'SpecialtyShow',

  data () {
    return {
      specialty: {
        id: this.$route.params.id,
        name: '',
        description: '',
        departmentId: ''
      },
      errored: false
    }
  },

  components: {
    SpecialtyStudentGroups
  },

  methods: {
    getSpecialty () {
      if (this.specialty.id !== undefined) {
        axios
          .get(`/specialties/${this.specialty.id}`)
          .then(response => {
            this.specialty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },

  mounted () {
    this.getSpecialty()
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
