<template>
  <!-- Main page for Schedule component, displays all records of schedule in table format,
       includes CRUD operations and router link to journal for schedule record -->
  <div class="wrapper">
    <div class="container-fluid">

      <h1 class="h1">Расписание</h1>
      <hr>

      <!-- Modal window of creating new schedule record -->
      <b-button size="sm" v-b-modal.createScheduleModal class="button-create">Создать</b-button>

      <!-- Table management: search and the number of elements on the page -->
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
        <!--<b-col md="6">-->
          <!--<b-form-group horizontal label="Поиск по датам" class="form-group-control">-->
            <!--<b-input-group>-->
              <!--<b-form-input type="date" v-model="startDate" size="sm"/>-->
              <!--<b-form-input type="date" v-model="endDate" size="sm"/>-->
              <!--<b-input-group-append>-->
                <!--<b-btn :disabled="!dateFilter" @click="startDate = '', endDate = ''" size="sm">Очистить</b-btn>-->
              <!--</b-input-group-append>-->
            <!--</b-input-group>-->
          <!--</b-form-group>-->
        <!--</b-col>-->
        <b-col md="6">
          <b-form-group horizontal label="На странице" class="form-group-control">
            <b-form-select :options="pageOptions" v-model="perPage" size="sm" class="form-select-number-items"/>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Table: displaying schedule -->
      <b-table show-empty stacked="md" :items="scheduleRecords" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" hover>

        <!-- Column in table 'Действия' -->
        <template slot="actions" slot-scope="row">
          <!-- Edit button -->
          <b-button size="sm" v-b-modal.editScheduleModal @click.stop="setScheduleRecord(row.item)" variant="outline-warning">Изменить</b-button>
          <!-- Delete button -->
          <b-button size="sm" @click.stop="deleteScheduleRecord(row.item.id)" variant="outline-danger">Удалить</b-button>
        </template>

        <!-- Column in table 'Журнал' -->
        <template slot="journal" slot-scope="row">
          <!-- Router link to journal -->
          <b-button size="sm" :to="'/schedule/' + row.item.id" variant="outline-secondary">Журнал</b-button>
        </template>

        <!-- Column in table 'Преподаватель' -->
        <template slot="teacherFullName" slot-scope="data">
          {{ data.item.teacher.firstName + ' ' + data.item.teacher.lastName }}
        </template>

      </b-table>

      <!-- Pagination -->
      <b-row>
        <b-col md="12">
          <b-pagination :per-page="perPage" v-model="currentPage" align="center" prev-text="Сюда" next-text="Туда"></b-pagination>
        </b-col>
      </b-row>
      <hr>

      <!-- Connecting modal window for creating new schedule record -->
      <schedule-modal-create @createSchedule="getScheduleRecords"></schedule-modal-create>
      <!-- Connecting modal window for editing new schedule record -->
      <schedule-modal-edit @editSchedule="getScheduleRecords" :scheduleRecord="scheduleRecord"></schedule-modal-edit>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import ScheduleModalCreate from '@/components/schedule/ScheduleModalCreate'
  import ScheduleModalEdit from '@/components/schedule/ScheduleModalEdit'

  export default {
    name: 'ScheduleIndex',
    components: { ScheduleModalCreate, ScheduleModalEdit },

    data () {
      return {
        fields: {
          'subject.name': { label: 'Предмет', sortable: true },
          'teacherFullName': { label: 'Преподаватель', sortable: true },
          'studentsGroup.groupName': { label: 'Группа', sortable: true },
          'date': {
            label: 'Дата',
            sortable: true,
            formatter: (date) => {
              return moment(String(date)).format('DD.MM.YYYY')
            }
          },
          'classNumber': { label: 'Номер пары', sortable: true },
          'journal': { key: 'journal', label: 'Журнал' },
          'actions': { key: 'actions', label: 'Действия' }
        },
        currentPage: 1,
        perPage: 5,
        pageOptions: [ 5, 10, 15 ],
        startDate: '',
        endDate: '',
        filter: null,
        error: false,
        scheduleRecords: [],
        scheduleRecord: {
          subjectId: '',
          teacherId: '',
          studentsGroupId: '',
          date: '',
          classNumber: '',
          studentsGroup: {
            groupName: ''
          },
          teacher: {
            firstName: '',
            lastName: ''
          },
          subject: {
            name: ''
          }
        }
      }
    },

    methods: {

      /**
       * Method changes date format using momentum library
       * @param date
       * @returns {string}
       */
      formatDate (date) {
        return moment(String(date)).format('YYYY-MM-DD')
      },

      /**
       * Method is setting properties of schedule record
       * from item in the schedule to send object 'scheduleRecord'
       * to ScheduleModalEdit component - modal window for editing schedule record
       * @param item of the table
       */
      setScheduleRecord (item) {
        this.scheduleRecord.id = item.id
        this.scheduleRecord.subjectId = item.subjectId
        this.scheduleRecord.teacherId = item.teacherId
        this.scheduleRecord.studentsGroupId = item.studentsGroupId
        this.scheduleRecord.studentsGroup = item.studentsGroup
        this.scheduleRecord.teacher = item.teacher
        this.scheduleRecord.subject = item.subject
        this.scheduleRecord.date = this.formatDate(item.date)
        this.scheduleRecord.classNumber = item.classNumber
      },

      /**
       * Method receives all records of schedule from API
       */
      getScheduleRecords () {
        axios
          .get('/schedule' + '?token=' + this.getCookie("Auth-Token"))
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
      },

      /**
       * Method deletes schedule record after confirming action
       * and reloads schedule table
       */
      deleteScheduleRecord (id) {
        if (confirm('Вы уверены что хотите удалить занятие в расписании?' + id)) {
          axios
            .delete('/schedule/' + id + '?token=' + this.getCookie("Auth-Token"))
            .then(response => {
              this.getScheduleRecords()
            })
            .catch(error => {
              console.log(error)
              alert('Возникла ошибка при удалении')
            })
        }
      },
      getCookie () {
        let name = "Auth-Token"
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
      }
    },

    mounted () {
      this.getScheduleRecords()
    }
  }
</script>

<style scoped>
  .h1 {
    font-size: 50px;
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
  }
  .container-fluid {
    padding: 30px;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 800px;
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
