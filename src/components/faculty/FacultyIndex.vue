<template>
<div class="container-fluid">
  <h1 class="h1">Факультеты</h1>
  <b-button size="sm" v-b-modal.createEntityModal class="button-create" v-if="isAdmin">Создать</b-button>
  <hr/>
  <section v-if="errored">
    <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
    <router-link to="/">
      <b-button>На главную</b-button>
    </router-link>
  </section>
  <section v-else>
    <!-- Отображение модального окна добавления факультета -->
    <modal-create-component @created="getFaculties" entityUrlName="faculties" entityInputName="факультета" entityButtonName="факультет"/>
    <!-- Отображение карточек факультетов -->
    <card-component :entitiesList="faculties" entityUrlName="faculties" />
  </section>
</div>
</template>

<script>
import ModalCreateComponent from '@/components/ModalCreateComponent'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'FacultyIndex',

  data () {
    return {
      faculties: null,
      errored: false
    }
  },

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  components: {
    ModalCreateComponent, CardComponent
  },

  methods: {
    getFaculties () {
      this.$http
        .get('/faculties')
        .then(response => {
          this.faculties = response.data.content
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },

  mounted () {
    this.getFaculties()
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
  .mb-3 {
    display: grid;
    grid-template-columns: repeat(2, 5fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    max-width: 1200px;
    margin: 0px auto;
  }
  .text-center {
    font-size: 25px;
  }
  .card-button {
    margin-left: 5px; 
    margin-top: 15px;
  }
  .card-text {
    font-size: 15px;
  }
</style>
