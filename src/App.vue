<template>
  <div id="app">
    <button id="opensettings" @click.stop="openModal" >Open Settings</button>
    <Mainpage />
    <keep-alive>
      <Modal v-show="modalOn"
             @closeModal="closeModal"
      />
    </keep-alive>
  </div>
</template>
<style lang="scss">
  @import './assets/scss/init.scss';
  @import './assets/scss/app.scss';
</style>
<script>
import Modal from './components/Modal';
import Mainpage from './components/Mainpage';

export default {
  name: 'App',
  components: { Modal, Mainpage },
  data(){
    return {
      modalOn: false
    };
  },
  methods: {
    openModal(){
      this.modalOn = true;
    },
    closeModal(){
      this.modalOn = false;
    }
  }
}
</script>
