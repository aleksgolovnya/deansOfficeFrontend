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
        <h1>{{ faculty.name }}</h1>
        <p>{{ faculty.description }}</p>
        <router-link :to="'/faculties/edit/' + faculty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
      </div>
    </div>
    <hr/>
    <b-button size="sm" v-b-modal.createDepartmentModal class="button-create">Создать кафедру</b-button>
    <department-modal-create :facultyId="faculty.id"/>
    <hr/>
    <!-- Отображение кафедр данного факультета -->
    <department-cards :facultyId="faculty.id"></department-cards>
    <hr/>
    <router-link to="/faculties">
      <b-button class="back-button">Назад</b-button>
    </router-link>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import DepartmentCards from '@/components/department/DepartmentCards'
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'

export default {
  name: 'FacultyShow',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      errored: false
    }
  },

  components: {
    DepartmentCards,
    DepartmentModalCreate
  },

  methods: {
    getFaculty () {
      if (this.faculty.id !== undefined) {
        axios
          .get(`/faculties/${this.faculty.id}`)
          .then(response => {
            this.faculty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    }
  },

  mounted () {
    this.getFaculty()
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
  .back-button {
    margin-bottom: 25px;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
