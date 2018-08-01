<template>
  <b-navbar toggleable sticky type="light" variant="light">

    <b-navbar-toggle target="navCollapse"></b-navbar-toggle>

    <b-navbar-brand href="/">Университет</b-navbar-brand>

    <b-collapse is-nav id="navCollapse">

      <b-navbar-nav>

        <!-- Факультеты - выпадающее меню -->
        <!--<b-dropdown-->
          <!--class="m-2"-->
          <!--text="Факультеты"-->
          <!--split-->
          <!--size="sm"-->
          <!--@click="goToFacultiesPage">-->
            <!--<b-dropdown-item-->
              <!--v-for="faculty in faculties"-->
              <!--:key="faculty.id"-->
              <!--:to="'/faculties/' + faculty.id"-->
              <!--class="dropdown-item-text">-->
              <!--{{ faculty.name }}-->
            <!--</b-dropdown-item>-->
        <!--</b-dropdown>-->

        <!-- Факультеты -->
        <b-nav-item to="/faculties/">Факультеты</b-nav-item>

        <!-- Кафедры -->
        <b-nav-item to="/departments/">Кафедры</b-nav-item>

        <!-- Специальности -->
        <b-nav-item to="/specialties/">Специальности</b-nav-item>

        <!-- Студенты -->
        <b-nav-item to="/student-groups/">Группы</b-nav-item>

        <!-- Студенты -->
        <b-nav-item to="/students/">Студенты</b-nav-item>

        <!-- Преподаватели -->
        <b-nav-item to="/teachers/">Преподаватели</b-nav-item>

        <!-- Предметы -->
        <b-nav-item to="/subjects/">Предметы</b-nav-item>

        <!-- Расписание -->
        <b-nav-item to="/schedule/">Расписание</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Navbar'

  // data () {
  //   return {
  //     faculty: {
  //       id: this.$route.params.id,
  //       name: '',
  //       description: ''
  //     },
  //     faculties: []
  //   }
  // },
  //
  // created () {
  //   this.getFaculty()
  // },
  //
  // watch: {
  //   '$route': 'getFaculty'
  // },
  //
  // methods: {
  //   getFaculties () {
  //     axios
  //       .get('/faculties')
  //       .then(response => {
  //         this.faculties = response.data
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   },
  //   goToFacultiesPage () {
  //     this.$router.push('/faculties/')
  //   }
  // },
  //
  // mounted () {
  //   this.getFaculties()
  // }
}
</script>

<style scoped>
</style>
