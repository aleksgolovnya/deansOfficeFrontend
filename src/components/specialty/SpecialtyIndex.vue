<template>
<div class="container-fluid">
  <h1 class="h1">Специальности</h1>
  <b-button size="sm" v-b-modal.createSpecialtyModal class="button-create" v-if="isAdmin">Создать</b-button>
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
        <router-link :to="'/specialties/edit/' + specialty.id">
          <b-button size="sm" class="card-button" v-if="isAdmin">Редактировать</b-button>
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
import SpecialtyModalCreate from '@/components/specialty/SpecialtyModalCreate'

export default {
  name: 'SpecialtyIndex',

  data () {
    return {
      specialties: null,
      errored: false
    }
  },

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  components: {
    SpecialtyModalCreate
  },

  methods: {
    getSpecialties () {
      this.$http
        .get('/specialties')
        .then(response => {
          this.specialties = response.data.content
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
    margin-top: 10px;
    font-size: 50px;
    font-weight: 500;
    color: #2c3e50;
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
    margin-left: 5px; 
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
