<template>
<div class="container-fluid">
  <h1 class="h1">Предметы</h1>
  <!-- Модальное окно для создания новоого предмета -->
  <subject-modal-create @createSubject="getSubjects"></subject-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createSubjectModal class="button-create">Создать</b-button>

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

   <!--Таблица: отображение предметов-->
  <div class="items-section">
    <b-table show-empty
             stacked="md"
             :items="subjects"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             hover
    >
      <template slot="actions"
                slot-scope="row">
        <b-button size="sm"
                  :to="'/subjects/edit/' + row.item.id">
          Редактировать
        </b-button>
      </template>
    </b-table>
  </div>

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
import SubjectModalCreate from '@/components/subject/SubjectModalCreate'

export default {
  name: 'SubjectIndex',

  data () {
    return {
      fields: {
        name: {
          label: 'Имя',
          sortable: true
        },
        'actions': {
          key: 'actions',
          label: 'Действия'
        }
      },
      subjects: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      errored: false
    }
  },

  methods: {
    getSubjects () {
      axios
        .get(`/subjects`)
        .then(response => {
          this.subjects = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  components: {
    SubjectModalCreate
  },

  mounted () {
    this.getSubjects()
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
  .items-section {
    max-width: 1000px;
    margin: auto;
  }
</style>
