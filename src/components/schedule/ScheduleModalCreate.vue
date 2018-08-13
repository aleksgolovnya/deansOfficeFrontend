<template>
  <b-modal id="createScheduleModal"
           ref="modal"
           title="Создание новой записи в расписании"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <!-- Предмет -->
      <b-form-group id="subjectListLabel"
                    label="Предмет:"
                    label-for="subjectGroupList">
        <b-form-select id="subjectGroupList"
                       v-model="scheduleRecord.subjectId"
                       required>
          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id">
            {{ subject.name }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Преподаватель -->
      <b-form-group id="teacherListLabel"
                    label="Преподаватель:"
                    label-for="teacherGroupList">
        <b-form-select id="teacherGroupList"
                       v-model="scheduleRecord.teacherId"
                       required>
          <option
            v-for="teacher in teachers"
            :key="teacher.id"
            :value="teacher.id">
            {{ teacher.firstName + ' ' + teacher.lastName }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Группа студентов -->
      <b-form-group id="studentGroupListLabel"
                    label="Группа студентов:"
                    label-for="studentGroupList">
        <b-form-select id="studentGroupList"
                       v-model="scheduleRecord.studentsGroupId"
                       required>
          <option
            v-for="studentGroup in studentGroups"
            :key="studentGroup.id"
            :value="studentGroup.id">
            {{ studentGroup.groupName }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Дата -->
      <b-form-group id="scheduleRecordDateLabel"
                    label="Дата:"
                    label-for="scheduleRecordDate">
        <b-form-input id="scheduleRecordDate"
                      type="date"
                      v-model="scheduleRecord.date"
                      required>
        </b-form-input>
      </b-form-group>

      <!-- Номер пары -->
      <b-form-group id="classNumberListLabel"
                    label="Номер пары:"
                    label-for="classNumberList">
        <b-form-select id="classNumberList"
                       v-model="scheduleRecord.classNumber"
                       required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </b-form-select>
      </b-form-group>
    </b-form>

    <!-- Кнопки: сохранить и отменить -->
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
      scheduleRecords: null,
      studentGroups: null,
      subjects: null,
      teachers: null,
      scheduleRecord: {
        subjectId: '',
        teacherId: '',
        studentsGroupId: '',
        date: '',
        classNumber: '',
        studentsGroup: {
          groupName: ''
        },
        teacher: {
          firstName: '',
          lastName: ''
        },
        subject: {
          name: ''
        }
      }
    }
  },

  methods: {
    getScheduleRecords () {
      axios
        .get('/schedule' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.scheduleRecords = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSubjects () {
      axios
        .get('/subjects' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.subjects = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTeachers () {
      axios
        .get('/teachers' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.teachers = response.data
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
      if (!this.scheduleRecord.subject) {
        alert('Пожалуйста укажите предмет.')
      } else if (!this.scheduleRecord.teacher) {
        alert('Пожалуйста укажите преподавателя.')
      } else if (!this.scheduleRecord.studentsGroup) {
        alert('Пожалуйста укажите учебную группу.')
      } else if (!this.scheduleRecord.date) {
        alert('Пожалуйста укажите дату.')
      } else if (!this.scheduleRecord.classNumber) {
        alert('Пожалуйста укажите номер занятия.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        '/schedule' + '?token=' + this.getCookie("Auth-Token"),
        this.scheduleRecord
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании записи расписания.')
        })
        .then(success => {
          this.$emit('createSchedule')
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
    this.getScheduleRecords()
    this.getStudentGroups()
    this.getSubjects()
    this.getTeachers()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
