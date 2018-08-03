# deans-office-vue-js

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

##Heroku
Рабочая версия приложения на heroku [university-spa](https://university-spa .herokuapp.com/)

Тестовые пользователи:
1. login: admin, pass: admin
2. login: student, pass: student
3. login: teacher, pass: teacher
4. В гостевом режиме доступна только главная страница.

Сервер для приложения должен быть запущен на порту 8080. Если вы используете другой порт для сервера, вам необходимо поменять axios.defaults.baseURL в main.js

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
