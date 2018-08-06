# university-spa-frontend

> A Vue.js project for REST API

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

Сервер для приложения должен быть запущен на порту 8080. Если вы используете другой порт для сервера, вам необходимо поменять axios.defaults.baseURL в main.js

Также можно использовать сервер развернутый на Heroku, для этого укажите:
axios.defaults.baseURL = 'https://university-spa-backend.herokuapp.com/api'

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Heroku
Рабочая версия приложения на heroku [university-spa](https://university-spa.herokuapp.com/)

Тестовые пользователи:
1. login: admin, pass: admin
2. login: student, pass: student
3. login: teacher, pass: teacher
4. В гостевом режиме доступна только главная страница.

## Баги
На данный момент в версии 1.2 может возникать плавающая ошибка с подгрузкой студентов группы при добавлении новой записи журнала в модальном окне на странице записи расписания.
Компонент JournalModalCreate или ScheduleShow, метод getStudentGroupStudents() возвращает статус 400. В метод может не передаваться параметр studentGroupId, что приводит к этой ошибке и невозможности получить студентов группы.
