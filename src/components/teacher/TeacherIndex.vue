<template>
<div class="container-fluid">
  <h1 class="h1">Преподаватели</h1>
  <!-- Модальное окно для создания нового преподавателя -->
  <teacher-modal-create @createTeacher="getTeachers"></teacher-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createTeacherModal class="button-create">Создать</b-button>

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

   <!--Таблица: отображение преподавателй-->
  <b-table show-empty
           stacked="md"
           :items="teachers"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           hover
  >
      <template slot="actions"
                slot-scope="row">
        <b-button size="sm"
          :to="'/teachers/' + row.item.id">
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
import TeacherModalCreate from '@/components/teacher/TeacherModalCreate'

export default {
  name: 'TeacherIndex',

  data () {
    return {
      fields: {
        firstName: {
          label: 'Имя',
          sortable: true
        },
        lastName: {
          label: 'Фамилия',
          sortable: true
        },
        position: {
          label: 'Должность',
          sortable: true
        },
        'department.name': {
          label: 'Кафедра',
          sortable: true
        },
        'actions': {
          key: 'actions',
          label: 'Действия'
        }
      },
      teachers: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      errored: false
    }
  },

  methods: {
    getTeachers () {
      axios
        .get(`/teachers`)
        .then(response => {
          this.teachers = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  components: {
    TeacherModalCreate
  },

  mounted () {
    this.getTeachers()
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
