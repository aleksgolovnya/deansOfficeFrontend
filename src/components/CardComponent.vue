<template>
    <div class="mb-3">
        <b-card-group
        deck
        v-for="entity in entitiesList"
        :key="entity.id">
        <b-card :header="entity.name" class="text-center">
            <p class="card-text">{{ entity.description }}</p>
            <router-link :to="'/' + entityUrlName + '/edit/' + entity.id">
            <b-button size="sm" class="card-button" v-if="isAdmin">Редактировать</b-button>
            </router-link>
            <router-link :to="'/' + entityUrlName + '/' + entity.id">
            <b-button size="sm" variant="primary" class="card-button">Подробнее</b-button>
            </router-link>
        </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
  name: 'CardComponent',

  props: ['entitiesList', 'entityUrlName'],

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
}
</script>

<style scoped>
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
