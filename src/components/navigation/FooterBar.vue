<template>
    <div class="footer">
      <p>Произведенно с вниманием и любовью.</p>
      <p>
        По всем вопросам обращаться по адрессу
        <a href="mailto:aleksandergolovnya@gmail.com">aleksandergolovnya@gmail.com</a>
      </p>
      <b-button size="sm" href="https://github.com/aleksgolovnya">Github</b-button>
    </div>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
  .footer {
    float: bottom;
    margin-top: 50px;
    margin-bottom: 0px;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #f2f2f2;
  }
</style>
