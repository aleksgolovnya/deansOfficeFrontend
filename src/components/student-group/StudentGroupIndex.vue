<template>
<div class="container-fluid">
  <h1 class="h1">Группы студентов</h1>
  <!-- Модальное окно для создания новой группы студентов -->
  <student-group-modal-create @createStudentGroup="getStudentGroups"></student-group-modal-create>
  <!-- Кнопка вызова модального окна -->
  <b-button size="sm" v-b-modal.createStudentGroupModal class="button-create">Создать</b-button>
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

   <!--Таблица: отображение групп студентов-->
  <b-table show-empty
           stacked="md"
           :items="studentGroups"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           hover
  >
      <template slot="actions"
                slot-scope="row">
        <b-button size="sm"
          :to="'/student-groups/' + row.item.id">
          Страница группы
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
import StudentGroupModalCreate from '@/components/student-group/StudentGroupModalCreate'

export default {
  name: 'StudentGroupIndex',

  data () {
    return {
      fields: {
        groupName: {
          label: 'Название группы',
          sortable: true
        },
        'specialty.name': {
          label: 'Специальность',
          sortable: true
        },
        'actions': {
          key: 'actions',
          label: 'Действия'
        }
      },
      studentGroups: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      errored: false
    }
  },

  methods: {
    getStudentGroups () {
      axios
        .get(`/groups`)
        .then(response => {
          this.studentGroups = response.data
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
    StudentGroupModalCreate
  },

  mounted () {
    this.getStudentGroups()
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
