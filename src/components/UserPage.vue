<template>
  <div class="hello">
    <h1>Welcome to regular users page</h1>
    <h2>{{msg}}</h2>

    <h1>{{user.firstName + ' >>> ' + user.role}}</h1>

    <section v-if="isError">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'The commoners',
      user: '',
      isError: false
    };
  },

  methods: {
    getUser() {
      this.$http.get('/users/' + this.userId)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error);
          this.isError = true;
        });
    }
  },

  computed: {
    userId() {
      return this.$store.getters.userId
    }
  },

  mounted() {
    this.getUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
