<template>
  <div id="placeholder">
    <p class="maintitle"
       :style="{ color: currentColorSet.text }"
    >{{ pageName }}</p>

    <p class="logo-text"
       :style="{
         color: currentColorSet.text,
         fontSize: baseFontSize
       }"
    >Placeholder Image</p>

    <svg width="120" height="120"
         viewBox="0 0 120 120"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         id="groupincomelogo" >
    <defs>
      <path id="hook"
            ref="refPath"
            fill="none" stroke-width="4"
            stroke-linejoin="round"
            d="M 0,0 a 25,25 0 1 0 50,0 q -20,-30 -20,-40"
      />
    </defs>
      <g transform="translate(-10,12)">
        <use id="green" xlink:href="#hook" stroke="rgb(160,209,14)"
             transform="translate(68,82) rotate(-40)"
             ref="green" />
        <use id="blue" xlink:href="#hook" stroke="rgb(93,200,240)"
              transform="translate(48,32) rotate(78)"
              ref="blue" />
        <use id="orange" xlink:href="#hook" stroke="rgb(248,146,1)"
              transform="translate(100,40) rotate(-160)"
              ref="orange" />
      </g>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/children/placeholder.scss';
</style>
<script>
export default {
  name: 'Placeholder',
  data(){
    return {
      requestId: null,
      timeoutId: null,

      animating: false,
      elementsToAnimate: null,
      currentIndex: 0,
      timeoutValue: 100
    };
  },
  computed: {
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
  props: [ 'pageName' ],
  methods: {
    animatePaths(dom){
      if(!this.$refs.refPath) return;

      const vue = this;
      let pathLength = this.$refs.refPath.getTotalLength();
      let endValue, currValue, vel = { curr: 2, max: 15, f: 1.04, sign: 1 };

      endValue = 0;
      currValue = pathLength;
      vel.sign = (endValue - currValue > 0)? 1: -1;

      vue.animating = true;
      vue.requestId = window.requestAnimationFrame(animate);

      function animate(){

        currValue = currValue + vel.curr * vel.sign;

        vel.curr *= vel.f;
        if(vel.curr >= vel.max) vel.curr = vel.max;

        if(vel.sign < 0)
          currValue = (currValue <= endValue)? endValue : currValue;
        else
          currValue = (currValue >= endValue)? endValue : currValue;

        dom.setAttribute('stroke-dashoffset', currValue);

        if(currValue === endValue){
          vue.cancelPathAnimations();
          vue.endlessAnimation();
        }
        else
          vue.requestId = window.requestAnimationFrame(animate);
      }
    },
    cancelPathAnimations(){

      this.animating = false;
      window.cancelAnimationFrame(this.requestId);
    },
    endlessAnimation(){

      this.timeoutId = window.setTimeout(()=>{

        if(this.currentIndex === 0){
          this.initAllElements();
          this.timeoutValue = 100;
        }

        this.animatePaths( this.elementsToAnimate[this.currentIndex++] );
      }, this.timeoutValue);

      if(this.currentIndex === this.elementsToAnimate.length)
          this.currentIndex = 0;
    },
    initAllElements(){

      let pathLength = this.$refs.refPath.getTotalLength();

      this.elementsToAnimate.forEach( e => {

        e.setAttribute('stroke-dasharray', `${pathLength},${pathLength}`);
        e.setAttribute('stroke-dashoffset', `${pathLength}`);

      });

    }
  },

  mounted(){
    this.elementsToAnimate = [
      this.$refs.green, this.$refs.blue, this.$refs.orange
    ];

    this.initAllElements();
    this.endlessAnimation();

  },

  beforeDestroy(){ window.clearTimeout(this.timeoutId); }
};
</script>
