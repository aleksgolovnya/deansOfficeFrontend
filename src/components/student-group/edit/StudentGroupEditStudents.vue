<template>
  <div>
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
    <!-- Подключение модального окна редактирования студента -->
    <!--<student-modal-edit :studentId="studentId" @editStudent="getStudentGroupStudents"></student-modal-edit>-->

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
                  class="button-create"
                  :to="'/students/edit/' + row.item.id"
        >
          <!-- Действия для модального окна -->
          <!--@click="getId(row.item.id)"-->
          <!--v-b-modal.createStudentModal-->
          Редактировать
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
  </div>
</template>

<script>
import axios from 'axios'
// import StudentModalEdit from '@/components/student-group/edit/StudentModalEdit'

export default {
  name: 'StudentGroupStudents',

  props: ['studentGroupId'],

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
        course: {
          label: 'Курс',
          sortable: true
        },
        'actions': {
          label: 'Действия'
        }
      },
      students: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      studentId: ''
    }
  },

  // components: {
  //   StudentModalEdit
  // },

  methods: {
    getStudentGroupStudents () {
      if (this.studentGroupId !== undefined) {
        axios
          .get(`/groups/${this.studentGroupId}/students`)
          .then(response => {
            this.students = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
    // getId (value) {
    //   this.studentId = value
    // }
  },

  mounted () {
    this.getStudentGroupStudents()
  }
}
</script>

<style scoped>
  .form-select-number-items {
    max-width: 400px;
  }
  .table-interface-control {
    margin-bottom: 15px;
    margin-left: 0px;
  }
</style>
