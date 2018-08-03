<template>
<div class="container-fluid">
  <h1 class="h1">Расписание</h1>
  <!-- Модальное окно для создания новой записи расписания -->
  <schedule-modal-create @createSchedule="getScheduleRecords"></schedule-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createScheduleModal class="button-create">Создать</b-button>

  <!-- Управление таблицей: поиск и количество элементов на странице -->
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

   <!--Таблица: отображение расписания-->
  <b-table show-empty
           stacked="md"
           :items="scheduleRecords"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           hover
  >
      <template slot="actions"
                slot-scope="row">
        <b-button size="sm"
          :to="'/schedule/edit/' + row.item.id">
          Редактировать
        </b-button>
        <b-button size="sm"
                  :to="'/schedule/' + row.item.id">
          Журнал
        </b-button>
      </template>
    <template slot="teacherFullName" slot-scope="data">
      {{ data.item.teacher.firstName + ' ' + data.item.teacher.lastName }}
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
import moment from 'moment'
import ScheduleModalCreate from '@/components/schedule/ScheduleModalCreate'

export default {
  name: 'ScheduleIndex',

  data () {
    return {
      fields: {
        'subject.name': {
          label: 'Предмет',
          sortable: true
        },
        'teacherFullName': {
          label: 'Преподаватель',
          sortable: true
        },
        'studentsGroup.groupName': {
          label: 'Группа',
          sortable: true
        },
        'date': {
          label: 'Дата',
          formatter: (date) => {
            return moment(String(date)).format('DD.MM.YYYY')
          },
          sortable: true
        },
        'classNumber': {
          label: 'Номер пары',
          sortable: true
        },
        'actions': {
          key: 'actions',
          label: 'Действия'
        }
      },
      scheduleRecords: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      errored: false
    }
  },

  methods: {
    getScheduleRecords () {
      axios
        .get(`/schedule`)
        .then(response => {
          this.scheduleRecords = response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            alert('К сожалению вы не имеете доступа к этой странице, ' +
              'пожалуйста авторизируйтесь.')
            this.$router.replace('/login')
          }
          console.log(error)
        })
    }
  },

  components: {
    ScheduleModalCreate
  },

  mounted () {
    this.getScheduleRecords()
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
