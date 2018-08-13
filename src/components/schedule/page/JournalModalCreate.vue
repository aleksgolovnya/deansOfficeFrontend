<template>
  <div>
    <!-- Модальное окно добавления записи в журнал -->
    <b-modal id="createJournalModal"
             ref="modal"
             title="Создание новой записи в журнале"
             @ok="createJournalRecord"
             size="lg"
             centered>
      <b-form @submit.stop.prevent="createJournalRecord">
        <!-- Предмет -->
        <b-form-group id="scheduleRecordLabel"
                      label="Предмет:"
                      label-for="scheduleRecord">
          <b-form-input id="scheduleRecord"
                        type="text"
                        v-model="journal.scheduleId"
                        required
                        disabled>
          </b-form-input>
        </b-form-group>

        <!-- Студенты -->
        <b-form-group id="studentListLabel"
                      label="Студент:"
                      label-for="studentList">
          <b-form-select id="studentList"
                         v-model="journal.studentId"
                         required>
            <option
              v-for="student in students"
              :key="student.id"
              :value="student.id">
              {{ student.firstName + ' ' + student.lastName }}
            </option>
          </b-form-select>
        </b-form-group>

        <!-- Отметка -->
        <b-form-group id="markListLabel"
                      label="Отметка:"
                      label-for="markList">
          <b-form-select id="markList"
                         v-model="journal.mark">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>н</option>
          </b-form-select>
        </b-form-group>
      </b-form>

      <!-- Кнопки: сохранить и отменить -->
      <div slot="modal-footer" class="w-100">
        <b-btn type="submit" size="sm" class="float-right" variant="primary" @click="createJournalRecord">
          Сохранить
        </b-btn>
        <b-btn type="reset" size="sm" class="float-right" variant="danger" @click="closeModalWindow">
          Закрыть
        </b-btn>
      </div>
    </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Journal',

  props: ['scheduleRecordId', 'studentGroupId'],

  data () {
    return {
      students: [],
      scores: [],
      journal: {
        mark: '',
        scheduleId: this.scheduleRecordId,
        studentId: ''
      },
      error: ''

    }
  },

  methods: {
    getJournalRecordsForScheduleRecord () {
      if (this.scheduleRecordId !== undefined) {
        axios
          .get('/schedule/' + this.scheduleRecordId + '/journal' + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.scores = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    /**
     * Receiving students from the student group
     * At first request method receives schedule record by id,
     * to get the id of the student group that we use in second request
     * to receives all students from the student group
     *
     * @param scheduleRecordId id of the one record in the schedule
     * @param studentsGroupId id of the student group
     * @param students list of all students that belongs to the student group
     */
    getStudentGroupStudents () {
      if (this.scheduleRecordId !== undefined) {
        axios
          .get('/schedule/' + this.scheduleRecordId + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            return axios
              .get('/groups/students/' + response.data.studentsGroupId + '?token=' + this.getCookie("Auth-Token"))
              .then(response => {
                this.students = response.data
              })
              .catch(error => {
                console.log('Ошибка при выполнении функции getStudentGroupStudents', error)
                this.error = true
              })
          })
          .catch(error => {
            console.log('Ошибка при выполнении функции getStudentGroupStudents', error)
            this.error = true
          })
      } else {
        console.log('Error: schedule record id is undefined')
        this.error = true
      }
    },

    closeModalWindow () {
      this.$refs.modal.hide()
    },
    createJournalRecord (event) {
      event.preventDefault()
      if (!this.journal.scheduleId) {
        alert('Пожалуйста укажите запись рассписания.')
      } else if (!this.journal.studentId) {
        alert('Пожалуйста укажите студента.')
      } else if (!this.journal.mark) {
        alert('Пожалуйста укажите отметку.')
      } else {
        axios
          .post('/journal', this.journal)
          .catch(error => {
            console.log('Error while creating record of journal', error)
            alert('Ошибка при создании записи журнала.')
          })
          .then(success => {
            this.$emit('createJournal')
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

  created () {
    this.getJournalRecordsForScheduleRecord()
    this.getStudentGroupStudents()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
