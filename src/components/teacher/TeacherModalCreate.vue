<template>
  <b-modal id="createTeacherModal"
           ref="modal"
           title="Создание нового преподавателя"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="teacherFirstNameLabel"
                    label="Имя преподователя:"
                    label-for="teacherFirstName">
        <b-form-input id="teacherFirstName"
                      type="text"
                      v-model="teacher.firstName"
                      required
                      placeholder="Введите имя преподователя">
        </b-form-input>
      </b-form-group>
      <b-form-group id="teacherLastNameLabel"
                    label="Фамилия преподователя:"
                    label-for="teacherLastName">
        <b-form-input id="teacherLastName"
                      type="text"
                      v-model="teacher.lastName"
                      required
                      placeholder="Введите фамилию преподователя">
        </b-form-input>
      </b-form-group>
      <b-form-group id="positionListLabel"
                    label="Должность:"
                    label-for="positiontist">
        <b-form-select id="positionList"
                       v-model="teacher.position"
                       required>
          <option>Ассистент</option>
          <option>Лаборант</option>
          <option>Старший преподаватель</option>
          <option>Кандидат технических наук</option>
          <option>Кандидат физико-математических наук</option>
          <option>Кандидат биологических наук</option>
          <option>Кандидат исторических наук</option>
          <option>Кандидат культорологии</option>
          <option>Кандидат педагогических наук</option>
          <option>Кандидат политических наук</option>
          <option>Кандидат психологических наук</option>
          <option>Кандидат социологических наук</option>
          <option>Кандидат филологических наук</option>
          <option>Кандидат философских наук</option>
          <option>Кандидат химических наук</option>
          <option>Кандидат экономических наук</option>
          <option>Кандидат юридических наук</option>
          <option>Доктор технических наук</option>
          <option>Доктор физико-математических наук</option>
          <option>Доктор биологических наук</option>
          <option>Доктор исторических наук</option>
          <option>Доктор культорологии</option>
          <option>Доктор педагогических наук</option>
          <option>Доктор политических наук</option>
          <option>Доктор психологических наук</option>
          <option>Доктор социологических наук</option>
          <option>Доктор филологических наук</option>
          <option>Доктор философских наук</option>
          <option>Доктор химических наук</option>
          <option>Доктор экономических наук</option>
          <option>Доктор юридических наук</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="departmentListLabel"
                    label="Кафедра:"
                    label-for="departmentList">
        <b-form-select id="departmentList"
                       v-model="teacher.departmentId"
                       required>
          <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id">
            {{ department.name }}
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
  name: 'TeacherModalCreate',

  data () {
    return {
      teachers: null,
      departments: null,
      teacher: {
        firstName: '',
        lastName: '',
        position: '',
        departmentId: '',
        department: {
          name: ''
        }
      }
    }
  },

  methods: {
    getTeachers () {
      axios
        .get('/teachers')
        .then(response => {
          this.teachers = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
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
    handleClose () {
      this.$refs.modal.hide()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.teacher.firstName) {
        alert('Пожалуйста укажите имя преподователя.')
      } else if (!this.teacher.lastName) {
        alert('Пожалуйста введите фамилию преподователя.')
      } else if (!this.teacher.position) {
        alert('Пожалуйста укажите курс обучения преподователя.')
      } else if (!this.teacher.department) {
        alert('Пожалуйста укажите кафедру для преподователя.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        `/teachers`,
        this.teacher
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании преподователя.')
        })
        .then(success => {
          this.$emit('createTeacher')
          this.$refs.modal.hide()
        })
    }
  },

  mounted () {
    this.getTeachers()
    this.getDepartments()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
