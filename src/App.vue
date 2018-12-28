<template>
  <div id="app">
    <p id="sebin">Sebin Song is doing an experiment with SCSS</p>
  </div>
</template>
<style lang="scss">
  @import './assets/scss/App.scss';
</style>
<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
