<template>
  <!-- Modal window for editing schedule record -->
  <b-modal id="editScheduleModal" ref="modal" title="Редактирование записи расписания" size="lg" centered>

    <!-- Subject for schedule record -->
    <b-row class="modal-row">
      <b-col sm="3">
        <label for="subjectGroupList" class="form-label">Предмет:</label>
      </b-col>
      <b-col sm="9">
        <b-form-select id="subjectGroupList" v-model="scheduleRecord.subjectId" required>
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- Teacher for schedule record -->
    <b-row class="modal-row">
      <b-col sm="3">
        <label for="teacherGroupList" class="form-label">Преподаватель:</label>
      </b-col>
      <b-col sm="9">
        <b-form-select id="teacherGroupList" v-model="scheduleRecord.teacherId" required>
          <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.firstName + ' ' + teacher.lastName }}</option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- Student Group for schedule record -->
    <b-row class="modal-row">
      <b-col sm="3">
        <label for="studentGroupList" class="form-label">Группа студентов:</label>
      </b-col>
      <b-col sm="9">
        <b-form-select id="studentGroupList" v-model="scheduleRecord.studentsGroupId" required>
          <option v-for="studentGroup in studentGroups" :key="studentGroup.id" :value="studentGroup.id">{{ studentGroup.groupName }}</option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- Date for schedule record -->
    <b-row class="modal-row">
      <b-col sm="3">
        <label for="scheduleRecordDate" class="form-label">Дата:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="scheduleRecordDate" type="date" v-model="scheduleRecord.date" required></b-form-input>
      </b-col>
    </b-row>

    <!-- Class number for schedule record -->
    <b-row class="modal-row">
      <b-col sm="3">
        <label for="classNumberList" class="form-label">Номер занятия:</label>
      </b-col>
      <b-col sm="9">
        <b-form-select id="classNumberList" v-model="scheduleRecord.classNumber" required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </b-form-select>
      </b-col>
    </b-row>

    <!-- Modal footer: buttons of saving and closing -->
    <div slot="modal-footer" class="w-100">
      <!-- Save button -->
      <b-btn type="submit" size="md" class="modal-button" @click="editScheduleRecord" variant="outline-secondary">Сохранить</b-btn>
    </div>

  </b-modal>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'StudentGroupModalCreate',
    props: ['scheduleRecord'],

    data () {
      return {
        studentGroups: null,
        subjects: null,
        teachers: null
      }
    },

    methods: {

      /**
       * Method receives all subjects from API for displaying in
       * subjects select input
       */
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

      /**
       * Method receives all teachers from API for displaying in
       * teachers select input
       */
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

      /**
       * Method receives all student groups from API for displaying in
       * student groups select input
       */
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

      /**
       * Method updates schedule record, click event for button 'Сохранить'
       * It checks all properties for not null before updating
       * Also method emits event 'editSchedule' for parent component ScheduleIndex to update schedule table
       * @param event
       */
      editScheduleRecord (event) {
        event.preventDefault()
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
          axios.put('/schedule/' + this.scheduleRecord.id + '?token=' + this.getCookie("Auth-Token"), this.scheduleRecord)
            .catch(error => {
              console.log(error)
              alert('Ошибка при создании записи расписания.')
            })
            .then(success => {
              this.$emit('editSchedule')
              this.$refs.modal.hide()
            })
        }
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
      this.getStudentGroups()
      this.getSubjects()
      this.getTeachers()
    }
  }
</script>

<style scoped>
  .modal-button {
    margin-left: 10px;
    float: right;
  }
  .modal-row {
    text-align: left;
    margin-bottom: 15px;
  }
  .form-label {
    text-align: left;
  }
</style>
