<template>
  <div>
    <b-button size="sm" v-b-modal.createJournalModal class="button-create">Создать</b-button>
    <hr>

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
             :items="scores"
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

     <!--Модальное окно создания новой записи в журнале -->
    <journal-modal-create :studentGroupId="studentGroupId"
                          :scheduleRecordId="scheduleRecordId"
                          @createJournal="getJournalRecordsForScheduleRecord"
    >
    </journal-modal-create>
  </div>
</template>

<script>
import axios from 'axios'
import JournalModalCreate from '@/components/schedule/page/JournalModalCreate'

export default {
  name: 'Journal',
  components: {JournalModalCreate},
  props: ['scheduleRecordId', 'studentGroupId'],

  data () {
    return {
      fields: {
        'student.firstName': {
          label: 'Имя студента',
          sortable: true
        },
        'student.lastName': {
          label: 'Фамилия студента',
          sortable: true
        },
        mark: {
          label: 'Отметка',
          sortable: true
        }
      },
      scores: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      journal: {
        mark: '',
        scheduleId: this.scheduleRecordId,
        studentId: ''
      }
    }
  },

  methods: {
    getJournalRecordsForScheduleRecord () {
      if (this.scheduleRecordId !== undefined) {
        axios
          .get('/schedule/' + this.scheduleRecordId + '/journal' + '?token=' + this.getCookie("Auth-Token"))
          .then(response => {
            this.scores = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    getCookie () {
      let name = "Auth-Token"
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  },

  created () {
    this.getJournalRecordsForScheduleRecord()
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
