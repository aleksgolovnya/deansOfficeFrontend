<template>
  <b-navbar toggleable sticky type="light" variant="light">

    <b-navbar-toggle target="navCollapse"></b-navbar-toggle>

    <b-navbar-brand href="/">Университет</b-navbar-brand>

    <b-collapse is-nav id="navCollapse">

      <b-navbar-nav>
        <!-- Факультеты -->
        <b-dropdown
          class="m-2"
          text="Факультеты"
          split
          size="sm"
          @click="goToFacultiesPage">
            <b-dropdown-item
              v-for="faculty in faculties"
              :key="faculty.id"
              :to="'/faculties/' + faculty.id"
              class="dropdown-item-text">
              {{ faculty.name }}
            </b-dropdown-item>
        </b-dropdown>

        <!-- Кафедры -->
        <b-dropdown
          class="m-2"
          text="Кафедры"
          split
          size="sm"
          @click="goToDepartmentsPage">
          <b-dropdown-item
            v-for="department in departments"
            :key="department.id"
            :to="'/departments/' + department.id"
            class="dropdown-item-text">
            {{ department.name }}
          </b-dropdown-item>
        </b-dropdown>

        <!-- Специальности -->
        <b-dropdown
          class="m-2"
          text="Специальности"
          split
          size="sm"
          @click="goToSpecialtiesPage">
          <b-dropdown-item
            v-for="specialty in specialties"
            :key="specialty.id"
            :to="'/specialties/' + specialty.id"
            class="dropdown-item-text">
            {{ specialty.name }}
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',

  data () {
    return {
      faculty: {
        id: this.$route.params.id,
        name: '',
        description: ''
      },
      faculties: null,
      departments: null,
      specialties: null
    }
  },

  created () {
    this.getFaculty()
  },

  watch: {
    '$route': 'getFaculty'
  },

  methods: {
    getFaculty () {
      if (this.faculty.id !== undefined) {
        axios
          .get('faculties/' + this.$route.params.id)
          .then(response => {
            this.faculty = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      }
    },
    getFaculties () {
      axios
        .get('/faculties')
        .then(response => {
          this.faculties = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDepartments () {
      axios
        .get('/departments')
        .then(response => {
          this.departments = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSpecialties () {
      axios
        .get('/specialties')
        .then(response => {
          this.specialties = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    goToFacultiesPage () {
      this.$router.push('/faculties/')
    },
    goToDepartmentsPage () {
      this.$router.push('/departments/')
    },
    goToSpecialtiesPage () {
      this.$router.push('/specialties/')
    }
  },

  mounted () {
    this.getFaculties()
    this.getDepartments()
    this.getSpecialties()
  }
}
</script>

<style scoped>
  .dropdown-item-text {
    font-size: 13px;
  }
  .navbar {
    float: left;
  }
</style>
