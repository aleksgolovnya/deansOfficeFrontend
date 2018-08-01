<template>
<div class="container-fluid">
  <h1 class="h1">Специальности университета</h1>
  <b-button size="sm" v-b-modal.createSpecialtyModal class="button-create">Создать</b-button>
  <hr/>
  <section v-if="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <!-- Отображение специальностей -->
    <b-card-group
      deck
      class="mb-3"
      v-for="specialty in specialties"
      :key="specialty.id">
      <b-card :header="specialty.name" class="text-center">
        <p class="card-text">{{ specialty.description }}</p>
        <p class="faculty-text">{{ specialty.department.name }}</p>
        <router-link :to="'/specialties/edit/' + specialty.id">
          <b-button size="sm" class="card-button">Редактировать</b-button>
        </router-link>
        <router-link :to="'/specialties/' + specialty.id">
          <b-button size="sm" variant="primary" class="card-button">Подробнее</b-button>
        </router-link>
      </b-card>
    </b-card-group>
    <!-- Модальное окно для создания новой специальности -->
    <specialty-modal-create @createSpecialty="getSpecialties"></specialty-modal-create>
  </section>
</div>
</template>

<script>
import axios from 'axios'
import SpecialtyModalCreate from '@/components/specialty/SpecialtyModalCreate'

export default {
  name: 'SpecialtyIndex',

  data () {
    return {
      specialties: null,
      errored: false
    }
  },

  components: {
    SpecialtyModalCreate
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
    }
  },

  mounted () {
    this.getSpecialties()
  }
}
</script>

<style scoped>
  .h1 {
    margin-top: 25px;
    font-size: 60px;
  }
  .container-fluid {
    padding: 30px;
  }
  /* Styles for Specialty Cards */
  .mb-3 {
    display: inline-block;
    width: 48%;
    margin: 10px;
    max-width: 600px;
  }
  .text-center {
    font-size: 25px;
  }
  .card-text {
    font-size: 15px;
  }
  .card-button {
    margin-top: 15px;
  }
  .faculty-text {
    margin: auto;
    font-size: 12px;
    background-color: lightgray;
    max-width: 50%;
  }
  /* End of styles for Specialty Cards */
</style>
