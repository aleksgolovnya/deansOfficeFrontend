<template>
  <b-modal id="createSubjectModal"
           ref="modal"
           title="Создание нового предмета"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
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
  name: 'SubjectModalCreate',

  data () {
    return {
      // teachers: null,
      subjects: null,
      subject: {
        name: '',
        description: '',
        teacherId: []
      }
    }
  },

  methods: {
    getSubjects () {
      axios
        .get('/subjects')
        .then(response => {
          this.subjects = response.data
        })
        .catch(error => {
          console.log(error)
        })
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
    handleClose () {
      this.$refs.modal.hide()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.subject.name) {
        alert('Пожалуйста введите название предмета.')
      } else if (!this.subject.description) {
        alert('Пожалуйста введите описание предмета.')
      // } else if (!this.subject.teacherId) {
      //   alert('Пожалуйста укажите преподавателей для данного предмета.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        `/subjects`,
        this.subject
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании предмета.')
        })
        .then(success => {
          this.$emit('createSubject')
          this.$refs.modal.hide()
        })
    }
  },

  mounted () {
    this.getSubjects()
    // this.getTeachers()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
