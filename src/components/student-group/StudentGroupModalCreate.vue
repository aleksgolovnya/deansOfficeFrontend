<template>
  <b-modal id="createStudentGroupModal"
           ref="modal"
           title="Создание группы студентов"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="studentGroupNameLabel"
                    label="Название группы студентов:"
                    label-for="studentGroupName">
        <b-form-input id="studentGroupName"
                      type="text"
                      v-model="studentGroup.groupName"
                      required
                      placeholder="Введите название группы студентов">
        </b-form-input>
      </b-form-group>
      <b-form-group id="specialtyListLabel"
                    label="Специальность:"
                    label-for="specialtyList">
        <b-form-select id="specialtyList"
                       v-model="studentGroup.specialtyId"
                       required>
          <option
            v-for="specialty in specialties"
            :key="specialty.id"
            :value="specialty.id">
            {{ specialty.name }}
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
      specialties: null,
      studentGroup: {
        groupName: '',
        specialtyId: '',
        specialty: {
          name: '',
          description: ''
        }
      }
    }
  },

  methods: {
    getSpecialties () {
      axios
        .get('/specialties')
        .then(response => {
          this.specialties = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getStudents () {
      axios
        .get('/students')
        .then(response => {
          this.students = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getStudentGroups () {
      axios
        .get(`/groups`)
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
      if (!this.studentGroup.groupName) {
        alert('Пожалуйста введите название группы студентов.')
      } else if (!this.studentGroup.specialty) {
        alert('Пожалуйста укажите специальность для данной группы студентов')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        '/groups',
        this.studentGroup
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании группы студентов.')
        })
        .then(success => {
          this.$emit('createStudentGroup')
          this.$refs.modal.hide()
        })
    }
  },

  mounted () {
    this.getStudentGroups()
    this.getSpecialties()
    this.getStudents()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
