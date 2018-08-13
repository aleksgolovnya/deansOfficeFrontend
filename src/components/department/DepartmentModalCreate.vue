<template>
  <b-modal id="createDepartmentModal"
           ref="modal"
           title="Создание кафедры"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="departmentNameLabel"
                    label="Название кафедры:"
                    label-for="departmentName">
        <b-form-input id="departmentName"
                      type="text"
                      v-model="department.name"
                      required
                      placeholder="Введите название кафедры">
        </b-form-input>
      </b-form-group>
      <b-form-group id="departmentDescriptionLabel"
                    label="Описание кафедры:"
                    label-for="departmentDescription">
        <b-form-textarea id="departmentDescription"
                         v-model="department.description"
                         placeholder="Введите описание кафедры"
                         required
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
      </b-form-group>
      <b-form-group id="facultyListLabel"
                    label="Факультет:"
                    label-for="facultyList">
        <b-form-select id="facultyList"
                       v-model="department.facultyId"
                       required>
          <option
            v-for="faculty in faculties"
            :key="faculty.id"
            :value="faculty.id">
            {{ faculty.name }}
          </option>
        </b-form-select>
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
  name: 'DepartmentModalCreate',

  props: ['facultyId'],

  data () {
    return {
      departments: null,
      faculties: null,
      department: {
        name: '',
        description: '',
        facultyId: '',
        faculty: {
          name: '',
          description: ''
        }
      }
    }
  },

  methods: {
    getDepartments () {
      axios
        .get('/departments')
        .then(response => {
          this.departments = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getFaculties () {
      axios
        .get('/faculties')
        .then(response => {
          this.faculties = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleClose () {
      this.$refs.modal.hide()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.department.name) {
        alert('Пожалуйста введите название кафедры.')
      } else if (!this.department.description) {
        alert('Пожалуйста введите описание кафедры.')
      } else if (!this.department.faculty) {
        alert('Пожалуйста укажите факультет для данной кафедры.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        '/departments' + '?token=' + this.getCookie("Auth-Token"),
        this.department
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании кафедры.')
        })
        .then(success => {
          this.$emit('createDepartment')
          this.$refs.modal.hide()
        })
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
    this.getFaculties()
    this.getDepartments()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
