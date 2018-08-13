<template>
  <div>
    <div class="hero">
      <div>
        <h1 class="display-3">Добро пожаловать в университет!</h1>
        <p class="lead">Надеюсь, что вам все понравится.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
