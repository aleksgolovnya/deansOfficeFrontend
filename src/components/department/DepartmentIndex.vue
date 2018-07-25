<template>
<div class="container-fluid">
  <h1 class="h1">Кафедры</h1>
  <b-button size="sm" v-b-modal.createDepartmentModal class="button-create">Создать</b-button>
  <hr/>
  <section v-if="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <!-- Отображение кафедр -->
    <department-cards/>
    <!-- Модальное окно для создания новой кафедры -->
    <department-modal-create/>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import DepartmentCards from '@/components/department/DepartmentCards'
import DepartmentModalCreate from '@/components/department/DepartmentModalCreate'

export default {
  name: 'DepartmentIndex',

  data () {
    return {
      departments: null,
      errored: false
    }
  },

  components: {
    DepartmentCards,
    DepartmentModalCreate
  },

  methods: {
    getDepartments () {
      axios
        .get('/departments')
        .then(response => {
          this.departments = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },

  mounted () {
    this.getDepartments()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 25px;
    font-size: 60px;
  }
  .container-fluid {
    padding: 0px;
  }
</style>
