<template>
<div class="container-fluid">
  <h1 class="h1">Студенты</h1>
  <!-- Модальное окно для создания новоого студента -->
  <student-modal-create @createStudent="getStudents"></student-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createStudentModal class="button-create">Создать</b-button>

  <!-- Управление таблицей: поиск и количетсов элементов на странице -->
  <b-row class="table-interface-control">
    <b-col md="6">
      <b-form-group horizontal label="Поиск" class="form-group-control">
        <b-input-group>
          <b-form-input v-model="filter" size="sm" placeholder="Введите для поиска" />
          <b-input-group-append>
            <b-btn :disabled="!filter" @click="filter = ''" size="sm">Очистить</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col md="6">
      <b-form-group horizontal label="На странице" class="form-group-control">
        <b-form-select :options="pageOptions" v-model="perPage" size="sm" class="form-select-number-items"/>
      </b-form-group>
    </b-col>
  </b-row>

   <!--Таблица: отображение студентов-->
  <b-table show-empty
           stacked="md"
           :items="students"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           hover
  >
      <template slot="actions"
                slot-scope="row">
        <b-button size="sm"
          :to="'/students/' + row.item.id">
          Личный кабинет
        </b-button>
      </template>
  </b-table>

  <b-row>
    <b-col md="12">
      <b-pagination :per-page="perPage"
                    v-model="currentPage"
                    align="center"
                    prev-text="Сюда"
                    next-text="Туда"
      />
    </b-col>
  </b-row>
  <hr>
</div>
</template>

<script>
import axios from 'axios'
import StudentModalCreate from '@/components/student/StudentModalCreate'

export default {
  name: 'StudentIndex',

  data () {
    return {
      fields: {
        firstName: {
          key: 'firstName',
          label: 'Имя',
          sortable: true
        },
        lastName: {
          key: 'lastName',
          label: 'Фамилия',
          sortable: true
        },
        course: {
          key: 'course',
          label: 'Курс',
          sortable: true
        },
        'studentsGroup.groupName': {
          key: 'studentsGroup.groupName',
          label: 'Группа',
          sortable: true
        },
        'actions': {
          key: 'actions',
          label: 'Действия'
        }
      },
      students: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      errored: false
    }
  },

  methods: {
    getStudents: function () {
      axios
        .get('/students' + '?token=' + this.getCookie("Auth-Token"))
        .then(response => {
          this.students = response.data
        })
        .catch(error => {
          console.log(error)
          if (error.response.status === 401) {
            alert('К сожалению вы не имеете доступа к этой странице, ' +
              'пожалуйста авторизируйтесь.')
            this.$router.replace('/login')
          }
        })
    },
    getCookie () {
      let name = "Auth-Token"
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  },

  components: {
    StudentModalCreate
  },

  mounted () {
    this.getStudents()
  }
}
</script>

<style scoped>
  .h1 {
    font-size: 60px;
  }
  .container-fluid {
    padding: 30px;
  }
  .button-create {
    margin-bottom: 20px;
  }
  .form-select-number-items {
    max-width: 400px;
  }
  .table-interface-control {
    margin-bottom: 15px;
    margin-left: 0px;
  }
</style>
