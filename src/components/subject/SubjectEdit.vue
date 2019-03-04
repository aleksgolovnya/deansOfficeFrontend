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
          <h1>{{ subject.name }}</h1>
          <p class="faculty-text">{{ subject.description }}</p>
        </div>
      </div>
      <div>
        <b-form @submit="onSubmit" v-if="show" class="form-class">
          <b-form-group id="subjectNameLabel"
                        label="Название предмета:"
                        label-for="subjectName">
            <b-form-input id="subjectName"
                          type="text"
                          v-model="subject.name"
                          required
                          placeholder="Введите название предмета">
            </b-form-input>
          </b-form-group>
          <!-- Описание предмета -->
          <b-form-group id="subjectDescriptionLabel"
                        label="Описание предмета:"
                        label-for="subjectDescription">
            <b-form-textarea id="subjectDescription"
                             type="text"
                             v-model="subject.description"
                             required
                             :rows="3"
                             :max-rows="6"
                             placeholder="Введите описание предмета">
            </b-form-textarea>
          </b-form-group>
          <!-- Преподаватели -->
          <!--<b-form-group id="teacherListLabel"-->
                        <!--label="Преподаватели:"-->
                        <!--label-for="teacherList">-->
            <!--<b-form-select id="teacherList"-->
                           <!--v-model="subject.teacherId"-->
                           <!--required-->
                           <!--multiple>-->
              <!--<option-->
                <!--v-for="teacher in teachers"-->
                <!--:key="teacher.id"-->
                <!--:value="teacher.id">-->
                <!--{{ teacher.firstName + ' ' + teacher.lastName}}-->
              <!--</option>-->
            <!--</b-form-select>-->
          <!--</b-form-group>-->

          <!-- Кнопки: сохранить и удалить -->
          <b-button type="submit" variant="primary">Сохранить</b-button>
          <b-button variant="danger" @click="deleteSubject">Удалить</b-button>
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
      teachers: null,
      subject: {
        id: this.$route.params.id,
        name: '',
        description: '',
        teacherId: []
      },
      errored: false,
      show: true
    }
  },

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
    // getTeachers () {
    //   axios
    //     .get('/teachers')
    //     .then(response => {
    //       this.teachers = response.data
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    deleteSubject () {
      axios
        .delete(`/subjects/${this.subject.id}`)
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
      axios.put(
        `/subjects/${this.subject.id}`,
        this.subject
      )
        .then(resp => alert('Успешно сохраненно'))
        .catch(err => console.error(err))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.subject.name = ''
      this.subject.description = ''
      // this.this.subject.teacherId = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    this.getSubject()
    // this.getTeachers()
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
    font-size: 13px;
    max-width: 40%;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
