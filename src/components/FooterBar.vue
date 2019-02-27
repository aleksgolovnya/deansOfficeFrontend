<template>
  <div class="footer">
    <hr>
    <div class="header-text">
      <h2>Электронный университет</h2>
    </div>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style>
.header-text {
  padding: 0px 0px;
  margin: 0px 0px;
  float: left;
}

.header-text h2 {
  font-size: 25px;
  font-weight: 500;
  color: #2c3e50;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 0px auto;
  padding: 0px 20px;
  background: rgb(243, 243, 243);
}
</style>
