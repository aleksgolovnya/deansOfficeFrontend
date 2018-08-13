<template>
  <div class="container-fluid">
    <div class="table-wrapper">
      <v-card>
        <v-card-title>
          Студенты
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Введите для поиска"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          class="v-datatable"
        >
          <template slot="headers" slot-scope="props">
            <td class="th-items">Имя</td>
            <td class="th-items">Фамилия</td>
            <td class="th-items">Курс</td>
            <td class="th-items">Группа</td>
          </template>

          <template slot="items" slot-scope="props">
            <td class="td-items">{{ props.item.firstName }}</td>
            <td class="td-items">{{ props.item.lastName }}</td>
            <td class="td-items">{{ props.item.course }}</td>
            <td class="td-items">{{ props.item.studentsGroup.groupName }}</td>
          </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Ваш поиск "{{ search }}" не дал никаких результатов.
          </v-alert>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

    export default {
        name: "StudentIndex",

      data () {
        return {
          students: [],
          error: false,
          search: '',
          headers: [
            { text: 'Имя', value: 'firstName' },
            { text: 'Фамилия', value: 'lastName' },
            { text: 'Курс', value: 'course' },
            { text: 'Группа', value: 'studentsGroup.groupName' }
          ]
        }
      },

      methods: {
        /**
         * Method receives all students
         */
        getStudents () {
          axios
            .get('/students' + '?token=' + this.getCookie("Auth-Token"))
            .then(response => {
              this.students = response.data
            })
            .catch(error => {
              console.log('Ошибка при выполнении функции getStudents: ', error)
              this.error = true
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

      created () {
        this.getStudents()
      }
    }
</script>

<style scoped>
  .td-items {
    font-size: 14px;
    text-align: left;
  }
  .th-items {
    font-size: 18px;
    text-align: left;
  }
  .table-wrapper {
    background-color: #fff;
  }
  .container-fluid {
    background-color: whitesmoke;
    padding: 30px;
  }
</style>
