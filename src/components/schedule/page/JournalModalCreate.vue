<template>
  <div>
    <!-- Модальное окно добавления записи в журнал -->
    <b-modal id="createJournalModal"
             ref="modal"
             title="Создание новой записи в журнале"
             @ok="handleOk"
             size="lg"
             centered>
      <b-form @submit.stop.prevent="handleSubmit">
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
        <b-btn type="submit" size="sm" class="float-right" variant="primary" @click="handleOk">
          Сохранить
        </b-btn>
        <b-btn type="reset" size="sm" class="float-right" variant="danger" @click="handleClose">
          Закрыть
        </b-btn>
      </div>
      <h1>studentGroupId - {{this.studentGroupId}}</h1>
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
      }

    }
  },

  methods: {
    getJournalRecordsForScheduleRecord () {
      if (this.scheduleRecordId !== undefined) {
        axios
          .get(`/schedule/${this.scheduleRecordId}/journal`)
          .then(response => {
            this.scores = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    /**
     * Получение студентов группы
     */
    getStudentGroupStudents () {
      if (this.studentGroupId !== undefined) {
        axios
          .get(`/groups/students/${this.studentGroupId}`)
          .then(response => {
            this.students = response.data
          })
          .catch(error => {
            console.log('Ошибка в выполнении запроса getStudentGroupStudents')
            console.log('Id группы студентов: ' + this.studentGroupId)
            console.log(error)
          })
      }
    },
    handleClose () {
      this.$refs.modal.hide()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.journal.scheduleId) {
        alert('Пожалуйста укажите запись рассписания.')
      } else if (!this.journal.studentId) {
        alert('Пожалуйста укажите студента.')
      } else if (!this.journal.mark) {
        alert('Пожалуйста укажите отметку.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        '/journal',
        this.journal
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании записи журнала.')
        })
        .then(success => {
          this.$emit('createJournal')
          this.$refs.modal.hide()
        })
    }
  },

  mounted () {
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
