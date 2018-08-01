<template>
  <b-modal id="createSpecialtyModal"
           ref="modal"
           title="Создание специальности"
           @ok="handleOk"
           size="lg"
           centered>
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-group id="specialtyNameLabel"
                    label="Название специальности:"
                    label-for="specialtyName">
        <b-form-input id="specialtyName"
                      type="text"
                      v-model="specialty.name"
                      required
                      placeholder="Введите название специальности">
        </b-form-input>
      </b-form-group>
      <b-form-group id="specialtyDescriptionLabel"
                    label="Описание специальности:"
                    label-for="specialtyDescription">
        <b-form-textarea id="specialtyDescription"
                         v-model="specialty.description"
                         placeholder="Введите описание специальности"
                         required
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
      </b-form-group>
      <b-form-group id="specialtyListLabel"
                    label="Кафедра:"
                    label-for="specialtyList">
        <b-form-select id="specialtyList"
                       v-model="specialty.departmentId"
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
  name: 'SpecialtyModalCreate',

  props: ['departmentId'],

  data () {
    return {
      specialties: null,
      departments: null,
      specialty: {
        name: '',
        description: '',
        departmentId: '',
        department: {
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
          this.errored = true
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
      if (!this.specialty.name) {
        alert('Пожалуйста введите название специальности.')
      } else if (!this.specialty.description) {
        alert('Пожалуйста введите описание специальности.')
      } else if (!this.specialty.department) {
        alert('Пожалуйста укажите кафедру для данной специальности.')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      axios.post(
        `/specialties`,
        this.specialty
      )
        .catch(error => {
          console.log(error)
          alert('Ошибка при создании специальности.')
        })
        .then(success => {
          this.$emit('createSpecialty')
          this.$refs.modal.hide()
        })
    }
  },

  mounted () {
    this.getDepartments()
    this.getSpecialties()
  }
}
</script>

<style scoped>
  .float-right {
    margin-left: 10px;
  }
</style>
