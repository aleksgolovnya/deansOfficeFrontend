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
        Header: название предмета,
        кнопка редактирования в отдельной секции
      -->
      <div class="header-section">
        <h1>{{ subject.name }}</h1>
        <router-link :to="'/subjects/edit/' + student.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
        <hr>
      </div>
      <b-row>
        <b-col class="body-section">
          <h3 class="h3">Описание предмета</h3>
          <hr>
          {{ subject.description }}
        </b-col>
        <!--<b-col class="right-section" cols="3">-->
          <!--<div class="right-section-item">-->
            <!--<h3 class="h3">Преподаватели</h3>-->
            <!--<hr>-->
            <!--<subject-teachers :subjectId="subject.id"></subject-teachers>-->
          <!--</div>-->
        <!--</b-col>-->
      </b-row>
      <hr>
      <!-- Кнопка возврата на предыдущую страницу -->
      <b-button @click="goBack">Назад</b-button>
    </section>
    {{subject}}
  </div>
</template>

<script>
import axios from 'axios'
// import SubjectTeachers from '@/components/subject/page/SubjectTeachers'

export default {
  name: 'SubjectShow',

  data () {
    return {
      subject: {
        id: this.$route.params.id,
        name: '',
        description: '',
        teacherId: []
      },
      errored: false
    }
  },

  // components: {
  //   SubjectTeachers
  // },

  methods: {
    getSubject () {
      if (this.subject.id !== undefined) {
        axios
          .get(`/subjects/${this.subject.id}`)
          .then(response => {
            this.subject = response.data
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
    this.getSubject()
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
