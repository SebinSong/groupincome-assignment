<template>
  <div id="app">
    <div id="main-content">
      <button
            id="opensettings" @click.stop="openModal"
            :style="{
              backgroundColor: currentColorSet.mainbg,
              borderColor: currentColorSet.mainbg
            }"
      >Open Settings</button>
      <div class="textinfo"
           :style="{ fontSize: baseFontSize }"
      >
        <p>Current theme is
          <span id="themename"
                :style="{ backgroundColor: currentColorSet.mainbg }"
          >{{ currentTheme }}</span></p>
        <p>Current base font size is
          <span id="fontsize"
                :style="{ backgroundColor: currentColorSet.mainbg }"
          >{{ baseFontSize }}</span></p>
      </div>
    </div>
    <Mainpage v-if="!modalOn" />

      <transition name="modaltransition">
        <Modal v-show="modalOn"
               @closeModal="closeModal"
        />
      </transition>

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
  computed: {
    currentTheme(){ return this.$root.$data.state.theme; },
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
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
