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

    <!--Таблица: отображение оценок -->
    <b-table show-empty
             stacked="md"
             :items="marks"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             hover
    >
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
    {{marks}}
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'StudentMarks',

  props: ['studentId'],

  data () {
    return {
      fields: {
        'schedule.subject.name': {
          label: 'Название предмета',
          sortable: true
        },
        'schedule.date': {
          label: 'Дата',
          formatter: (date) => {
            return moment(String(date)).format('DD/MM/YYYY')
          },
          sortable: true
        },
        mark: {
          label: 'Отметка',
          sortable: true
        }
      },
      marks: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null

    }
  },

  methods: {
    getStudentMarks () {
      if (this.studentId !== undefined) {
        axios
          .get(`/journal/scores/${this.studentId}`)
          .then(response => {
            this.marks = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  // filters: {
  //   formatDate: function (date) {
  //     if (date) {
  //       return moment(String(date)).format('DD/MM/YYYY')
  //     }
  //   }
  // },

  mounted () {
    this.getStudentMarks()
  }
}
</script>

<style scoped>
  .list-group-item {
    color: #000;
    text-align: left;
  }
  .form-select-number-items {
    max-width: 400px;
  }
  .table-interface-control {
    margin-bottom: 15px;
    margin-left: 0px;
  }
</style>
