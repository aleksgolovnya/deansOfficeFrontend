<template>
  <b-modal id="createStudentModal"
           ref="modal"
           title="Создание нового студента"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="studentFirstNameLabel"
                    label="Имя:"
                    label-for="studentFirstName">
        <b-form-input id="studentFirstName"
                      type="text"
                      v-model="student.firstName"
                      required
                      placeholder="Введите имя студента">
        </b-form-input>
      </b-form-group>
      <b-form-group id="studentLastNameLabel"
                    label="Фамилия:"
                    label-for="studentLastName">
        <b-form-input id="studentLastName"
                      type="text"
                      v-model="student.lastName"
                      required
                      placeholder="Введите фамилию студента">
        </b-form-input>
      </b-form-group>
      <b-form-group id="courseListLabel"
                    label="Курс:"
                    label-for="courseList">
        <b-form-select id="courseList"
                       v-model="student.course"
                       required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="studentGroupListLabel"
                    label="Группа студентов:"
                    label-for="studentGroupList">
        <b-form-select id="studentGroupList"
                       v-model="student.groupId"
                       required>
          <option
            v-for="studentGroup in studentGroups"
            :key="studentGroup.id"
            :value="studentGroup.id">
            {{ studentGroup.groupName }}
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
  name: 'StudentGroupModalCreate',

  data () {
    return {
      students: null,
      studentGroups: null,
      student: {
        firstName: '',
        lastName: '',
        course: '',
        groupId: '',
        studentsGroup: {
          groupName: ''
        }
      }
    }
  },

  methods: {
    getStudents () {
      axios
        .get('/students' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.students = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getStudentGroups () {
      axios
        .get('/groups' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.studentGroups = response.data
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
      if (!this.student.firstName) {
        alert('Пожалуйста введите имя студента.')
      } else if (!this.student.lastName) {
        alert('Пожалуйста введите фамилию студента.')
      } else if (!this.student.course) {
        alert('Пожалуйста укажите курс обучения студента.')
      } else if (!this.student.studentsGroup) {
        alert('Пожалуйста укажите учебную группу для студента.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        '/students' + '?token=' + this.getCookie("Auth-Token"),
        this.student
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании студента.')
        })
        .then(success => {
          this.$emit('createStudent')
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
    this.getStudents()
    this.getStudentGroups()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
