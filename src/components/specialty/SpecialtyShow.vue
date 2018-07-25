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
        <h1>{{ specialty.name }}</h1>
        <p>{{ specialty.description }}</p>
        <router-link :to="'/specialties/edit/' + specialty.id">
          <b-button size="sm">Редактировать</b-button>
        </router-link>
      </div>
    </div>
    <!--<hr/>-->
    <!--<b-button size="sm" v-b-modal.createSpecialtyModal class="button-create">Создать группу студентов</b-button>-->
    <!--<specialty-modal-create :specialtyId="specialty.id"/>-->
    <!--<hr/>-->
    <!--&lt;!&ndash; Отображение кафедр данного факультета &ndash;&gt;-->
    <!--<specialty-cards :specialtyId="specialty.id"/>-->
    <!--<hr/>-->
    <router-link :to="'/departments/' + specialty.departmentId">
      <b-button>Назад</b-button>
    </router-link>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SpecialtyShow',

  data () {
    return {
      specialty: {
        id: this.$route.params.id,
        name: '',
        description: '',
        departmentId: '',
        department: {
          name: '',
          description: ''
        }
      },
      studentGroups: null,
      errored: false
    }
  },

  methods: {
    getSpecialty () {
      if (this.specialty.id !== undefined) {
        axios
          .get(`/specialties/${this.specialty.id}`)
          .then(response => {
            this.specialty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getSpecialtyStudentGroups () {
      if (this.specialty.id !== undefined) {
        axios
          .get(`/specialties/${this.specialty.id}/student-groups`)
          .then(response => {
            this.studentGroups = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  mounted () {
    this.getSpecialty()
    this.getSpecialtyStudentGroups()
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
