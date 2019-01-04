<template>
<div id="textsettings">
  <div class="slider"
       :style="{ color: currentColorSet.text }"
       ref="slider"
  >
    <div class="track">
      <span class="mark _1"></span><span class="mark _2"></span>
      <span class="mark _3"></span><span class="mark _4"></span>
      <span ref="filler" class="filled"
            :style="{ backgroundColor: currentColorSet.menuActive }"
      ></span>
      <span ref="obj" class="object"
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
  methods: {
    moveSliderObject(){
      const map = {
        '11px': '2%', "13px": '34%', "15px": '66%', '17px': '98%'
      };

      this.$refs.obj.style.left = map[ this.baseFontSize ];
      this.$refs.filler.style.width = map[ this.baseFontSize ];
    }
  },
  computed: {
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; },
  },
  mounted(){
    sliderSetting.call(this, this.$refs.slider);

    // make it still remember where it was when it's regenerated.
    this.moveSliderObject();
  }
};
</script>
