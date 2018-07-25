<template>
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'FacultyModalCreate',

  data () {
    return {
      faculties: null,
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
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании факультета.')
        })
        .finally(this.getFaculties())
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
  .float-right {
    margin-left: 10px;
  }
</style>
