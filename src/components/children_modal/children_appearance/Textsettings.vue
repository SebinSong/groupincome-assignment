<template>
<div id="textsettings">
  <div class="slider"
       :style="{ color: currentColorSet.text }"
       ref="slider"
  >
    <div class="track">
      <span class="mark _1"></span><span class="mark _2"></span>
      <span class="mark _3"></span><span class="mark _4"></span>
      <span class="filled"
            :style="{ backgroundColor: currentColorSet.menuActive }"
      ></span>
      <span class="object"
            :style="{ backgroundColor: currentColorSet.menuActive }"
            @click.stop.prevent
      ></span>
    </div>
    <span class="text _1">Aa</span><span class="text _2">Aa</span>
    <span class="text _3">Aa</span><span class="text _4">Aa</span>
  </div>

  <p id="textpreview-title"
     :style="{
       color: currentColorSet.text,
       fontSize: baseFontSize
     }"
  >Text size preview</p>
  <p id="textpreview-content"
     :style="{
       color: currentColorSet.text,
       fontSize: baseFontSize
     }"
  >Group Income (n) is an efficient, fair, decentralized Basic Income system for you and your friends.</p>

</div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/children/textsettings.scss';
</style>
<script>
import sliderSetting from '@/assets/js/sliderSetting.js';

export default {
  name: 'Textsettings',
  data(){
    return {

    };
  },
  computed: {
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; },
  },
  mounted(){
    sliderSetting.call(this, this.$refs.slider);
  }
};
</script>
