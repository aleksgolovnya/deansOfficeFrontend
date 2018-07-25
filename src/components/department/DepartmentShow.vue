<template>
  <div class="container-fluid">
    <section v-if="errored" class="errored">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
    <section v-else>
      <div class="jumbotron">
        <div class="page-header">
          <h1>{{ department.name }}</h1>
          <p>{{ department.description }}</p>
          <router-link :to="'/departments/edit/' + department.id">
            <b-button size="sm">Редактировать</b-button>
          </router-link>
        </div>
      </div>
      <hr/>
      <b-button size="sm" v-b-modal.createSpecialtyModal class="button-create">Создать специальность</b-button>
      <specialty-modal-create :departmentId="department.id"/>
      <hr/>
      <!-- Отображение кафедр данного факультета -->
      <specialty-cards :departmentId="department.id"/>
      <hr/>
      <router-link :to="'/faculties/' + department.facultyId">
        <b-button class="back-button">Назад</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import SpecialtyCards from '@/components/specialty/SpecialtyCards'
import SpecialtyModalCreate from '@/components/specialty/SpecialtyModalCreate'

export default {
  name: 'DepartmentShow',

  data () {
    return {
      department: {
        id: this.$route.params.id,
        name: '',
        description: '',
        facultyId: '',
        faculty: {
          name: '',
          description: ''
        }
      },
      specilaties: null,
      errored: false
    }
  },

  components: {
    SpecialtyCards,
    SpecialtyModalCreate
  },

  methods: {
    getDepartment () {
      if (this.department.id !== undefined) {
        axios
          .get(`/departments/${this.department.id}`)
          .then(response => {
            this.department = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },

  mounted () {
    this.getDepartment()
  }
}
</script>

<style scoped>
  .errored {
    margin: 25px;
    font-size: 20px;
  }
  .jumbotron {
    background-color: #f7f7f7;
    padding: 20px;
    margin-top: 25px;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
