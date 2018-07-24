<template>
<div class="container">
  <h1 class="h1">Факультеты</h1>
  <b-button size="sm" v-b-modal.createFacultyModal class="button-create">Создать</b-button>
  <section v-if="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>Название</th>
      <th>Описание</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="faculty in faculties" :key="faculty.id">
        <td>
          <router-link :to="'/faculties/' + faculty.id">{{ faculty.name }}</router-link>
        </td>
        <td>{{ faculty.description }}</td>
        <td>
          <router-link :to="'/faculties/edit/' + faculty.id">
            <b-button size="sm">Редактировать</b-button>
          </router-link>
          <b-button size="sm" variant="danger" @click="deleteFaculty">Удалить</b-button>
        </td>
    </tr>
    </tbody>
  </table>
  </section>
  <b-modal id="createFacultyModal"
           ref="modal"
           title="Создание факультета"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="facultyNameLabel"
                    label="Название факультета:"
                    label-for="facultyName">
        <b-form-input id="facultyName"
                      type="text"
                      v-model="faculty.name"
                      required
                      placeholder="Введите название факультета">
        </b-form-input>
      </b-form-group>
      <b-form-group id="facultyDescriptionLabel"
                    label="Описание факультета:"
                    label-for="facultyDescription">
        <b-form-textarea id="facultyDescription"
                         v-model="faculty.description"
                         placeholder="Введите описание факультета"
                         required
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
      </b-form-group>
    </b-form>
    <div slot="modal-footer" class="w-100">
      <b-btn type="submit" size="sm" class="float-right" variant="primary" @click="handleOk">
        Сохранить
      </b-btn>
      <b-btn type="reset" size="sm" class="float-right" variant="danger" @click="handleClose">
        Закрыть
      </b-btn>
    </div>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FacultyIndex',

  data () {
    return {
      faculties: null,
      errored: false,
      faculty: {
        name: '',
        description: ''
      }
    }
  },

  methods: {
    getFaculties () {
      axios
        .get('/faculties')
        .then(response => {
          this.faculties = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },
    deleteFaculty () {
      axios
        .delete(`/faculties/${this.faculty.id}`)
        .then(response => {
          console.log(response.data)
          window.location.reload()
          alert('Успешно удаленно')
        })
        .catch(error => {
          console.log(error)
          alert('Удаление не было выполнено')
        })
    },
    handleClose () {
      this.$refs.modal.hide()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.faculty.name) {
        alert('Пожалуйста введите название факультета.')
      } else if (!this.faculty.description) {
        alert('Пожалуйста введите описание факультета.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        `/faculties`,
        this.faculty
      )
        .catch(err => console.error(err))
      this.$refs.modal.hide()
      this.getFaculties()
    }
  },

  mounted () {
    this.getFaculties()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 25px;
  }
  .float-right {
    margin-left: 10px;
  }
  .button-create {
    margin-bottom: 20px;
  }
</style>
