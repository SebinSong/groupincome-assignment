<template>
  <div id="mainpage"
       :style="{ backgroundColor: currentColorSet.mainbg }">
    <svg id="svgbg"
         ref="mainAnimation" xmlns="http://www.w3.org/2000/svg"
    >"
    <rect id="bgrect" x="0" y="0" width="100%" height="100%" fill="none" />
    <g id="curvepathWrapper">
      <path id="curvepath" fill="none" stroke="#fff"
            stroke-linecap="round" />
    </g>
    <g id="svgCanvas">
    </g>
    </svg>
  </div>
</template>
<style lang="scss">
  @import '@/assets/scss/children/mainpage.scss';
</style>
<script>
import { bgAnimationSetting, cancelBgAnimation,
         RestartBgAnimation } from '@/assets/js/mainpageAnimationSetting.js';

export default {
  name: 'Mainpage',
  computed: {
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
  methods: {
    resizeHandler(){ RestartBgAnimation.call(this); }
  },
  mounted(){
    bgAnimationSetting.call(this);
    window.addEventListener('resize', this.resizeHandler );
  },
  beforeDestroy(){
    cancelBgAnimation();
    window.removeEventListener('resize', this.resizeHandler );
  }
}
</script>
