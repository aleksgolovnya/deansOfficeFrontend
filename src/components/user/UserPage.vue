<template>
  <div class="container-fluid">
    <section v-if="isError">
      <p>К сожалению, запрашиваемая информация не доступна в данный момент</p>
      <router-link to="/">
        <b-button>На главную</b-button>
      </router-link>
    </section>
    <section v-else>
      <div class="header-section">
        <h1 class="h1">{{ user.firstName + ' ' + user.middleName + ' ' + user.lastName }}</h1>
        <hr>
      </div>
      <div>
        <b-form
          @submit="onSubmit"
          v-if="show"
          class="form-class"
        >
          <b-form-group
            id="userEmailLabel"
            label="Email:"
            label-for="userEmail"
          >
            <b-form-input
              id="userEmail"
              type="text"
              v-model="user.email"
              required
              placeholder="Введите свой email"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="userFirstNameLabel"
            label="Имя:"
            label-for="userFirstName"
          >
            <b-form-input
              id="userFirstName"
              type="text"
              v-model="user.firstName"
              required
              placeholder="Введите свое имя"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="userMiddleNameLabel"
            label="Отчетсво:"
            label-for="userMiddleName"
          >
            <b-form-input
              id="userMiddleName"
              type="text"
              v-model="user.middleName"
              required
              placeholder="Введите свое отчетсво"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="userLastNameLabel"
            label="Фамилия:"
            label-for="userLastName"
          >
            <b-form-input
              id="userLastName"
              type="text"
              v-model="user.lastName"
              required
              placeholder="Введите свое фамилию"
            >
            </b-form-input>
          </b-form-group>

          <!-- <b-form-group
            id="departmentListLabel"
            label="Кафедра:"
            label-for="departmentList"
          >
            <b-form-select
              id="departmentList"
              v-model="user.departmentId"
              required
            >
              <option
                v-for="department in departments"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </b-form-select>
          </b-form-group> -->
          <b-button
            type="submit"
            variant="primary"
            class="button"
          >Сохранить</b-button>
        </b-form>
      </div>
      <hr />
      <router-link to='/'>
        <b-button>На главную</b-button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DepartmentEdit',

  data() {
    return {
      msg: 'The commoners',
      user: '',
      userRoleText: '',
      isError: false,
      show: true,
      departments: [],
      studentGroups: []
    };
  },

  methods: {
    getUser() {
      this.$http.get('/users/' + this.userId)
        .then(response => {
          this.user = response.data;
          if (this.user.role === 'ROLE_ADMIN') {
            this.userRoleText = 'Администратор'
          } else this.userRoleText = 'Пользователь'
        })
        .catch(error => {
          console.log(error);
          this.isError = true;
        });
    },
    getDepartments() {
      this.$http
        .get(`/departments/`)
        .then(response => {
          this.departments = response.data.content
        })
        .catch(error => {
          console.log(error)
          this.isError = true
        })
    },
    getStudentGroups() {
      this.$http
        .get('/groups')
        .then(response => {
          this.studentGroups = response.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },

    onSubmit(evt) {
      evt.preventDefault()
      this.$http.put(
        `/users/${this.userId}`,
        this.user
      )
        .then(resp => {
          alert('Успешно сохраненно')
        })
        .catch(err => console.error(err))
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.user.firstName = ''
      this.user.middleName = ''
      this.user.lastName = ''
      this.user.email = ''
      this.user.studentGroupID = ''
      this.department.departmentId = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
      // return localStorage.getItem('userId');
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },

  mounted() {
    this.getUser();
    this.getDepartments();
    this.getStudentGroups();
  }
}
</script>

<style scoped>
.form-class {
  max-width: 1000px;
  text-align: left;
  margin: auto;
}
.faculty-text {
  margin: auto;
  font-size: 18px;
  background-color: lightgray;
  max-width: 40%;
}
.container-fluid {
  padding: 0px;
}
.h1 {
  margin-top: 10px;
  font-size: 35px;
  font-weight: 500;
  color: #2c3e50;
}
.button {
  margin-right: 5px;
}
</style>
