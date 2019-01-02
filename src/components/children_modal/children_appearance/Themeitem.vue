<template>
  <div id="themeitem">
    <svg width="113" height="113"
         viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg"
         @click.stop="selectTheme"
         @mouseenter="animateElements"
         @mouseleave="cancelAnimation"
         ref="svgImage"
    >

      <!-- outer border -->
      <path d="M1 0.5
               H111
               C111.012 0.5 111.555 0.692751 111.933 0.981206
               C112.309 1.2693 112.5 1.63189 112.5 1.99412
               V111
               C112.5 111.368 112.309 111.731 111.933 112.019
               C111.555 112.307 111.012 112.5 110.392 112.5
               H3
               C1.98753 112.5 1.44466 112.307 1.06745 112.019
               C0.690715 111.731 0.5 111.368 0.5 111.006
               V0
               C0.5 1.63189 0.690715 1.2693 1.06745 0.981206
               C1.44466 0.692751 1.98753 0.5 2.60769 0.5Z"
            :fill="colorSet[color].bg" stroke-width="1"
            :stroke="colorSet[color].border"
      />

      <!-- Navbar Background -->
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2 1 H48 V112 H2 V3 Z"
            :fill="colorSet[color].navbarBg" />

      <!-- left half background -->
      <g :fill="colorSet[color].navbarRect">
        <rect x="2" y="30" width="46" height="36" fill-opacity="0.2"/>
        <!-- rect at the bottom -->
        <rect x="2" y="102" width="46" height="12" fill-opacity="0.2"/>
      </g>

      <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
            d="M8 8 H41 V12 H8 V9 Z" fill="white"
            data-num="1" />

      <g :fill="colorSet[color].text">
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="3" d="M16 18 H41 V22 H16 V19 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="5" d="M16 46 H32 V50 H16 V47 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="7" d="M16 37 H42 V41 H16 V38 37Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="9" d="M16 55 H42 V59 H16 V56 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="11" d="M16 72 H41 V76 H16 V73 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="13" d="M16 82 H41 V86 H16 V83 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="15" d="M16 92 H41 V96 H16 V93 Z" />
      </g>

      <!-- red square -->
      <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
            data-num="16" d="M37 46H40C40.0789 46 41 46.447 41 47V50C41 50.553 40.0789 51 40 51H36.9609C36.8821 51 36 50.553 36 50V47C36 46.447 36.9211 46 37 46Z" fill="#FE6E61"/>

      <!-- square on each line -->
      <g :fill="colorSet[color].square">
        <path  class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="2" d="M7 18 H12 V22 H7 V19 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="4" d="M7 37 H12 V41 H7 V38 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="6" d="M7 46 H12 50 H7 V47 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="8" d="M7 55 H12 V59 H7 V56 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="10" d="M7 72 H12 V76 H7 V73 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
              data-num="12" d="M7 82 H12 V86 H7 V83 Z" />
        <path class="ani" fill-rule="evenodd" clip-rule="evenodd"
               data-num="14" d="M7 92 H12 V96 H7 V93 Z" />
      </g>

    </svg>

    <p class="label"
       :class="{ active: themeActive }"
       :style="{ color: currentColorSet.text }"
       @click.stop="selectTheme"
       @mouseenter="animateElements"
       @mouseleave="cancelAnimation"
    >
      <span class="label-circle"></span>
      <span class="label-text"
            :style="{ fontSize: baseFontSize }"
      >{{ color }}</span>
    </p>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/children/themeitem.scss';
</style>
<script>
export default {
  name: 'Themeitem',
  data(){
    return {
      colorSet: {
        'Blue': { border: '#5DC8F0', navbarBg: '#E0F4FC', navbarRect: '#5DC8F0',
                  square: '#5DC8F0', text: '#DBDBDB', bg: '#fff' },
        'Green': { border: '#90BD0D', navbarBg: '#F4F8E7', navbarRect: '#90BD0D',
                  square: '#90BD0D', text: '#DBDBDB', bg: '#fff' },
        'Orange': { border: '#F89302', navbarBg: '#FEF4E6', navbarRect: '#F89302',
                  square: '#F89302', text: '#DBDBDB', bg: '#fff' },
        'Silver': { border: '#999999', navbarBg: '#F5F5F5', navbarRect: '#999999',
                  square: '#F89302', text: '#DBDBDB', bg: '#fff' },
        'Dark': { border: '#000000', navbarBg: '#4E4E4E', navbarRect: '#F4F3F4',
                  square: '#5DC8F0', text: '#F4F3F4', bg: 'rgba(78,78,78,0.7)' }
      },

      themeActive: false,
      elementsToAnimate: null,
      animate: { ID: null, currIndex: 0, interval: 100 }
    };
  },
  computed: {
    currentTheme(){ return this.$root.$data.state.theme; },
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
  props: [ 'color' ],
  methods: {
    selectTheme(){
      this.$root.$data.changeTheme(this.color);
    },
    sortThingsToAnimate(){

      this.elementsToAnimate = [].slice.call(
                      this.$refs.svgImage.querySelectorAll('.ani')
                    );

      this.elementsToAnimate.sort((a,b) => {
        let num_a, num_b;

        num_a = parseInt( a.dataset.num, 10 );
        num_b = parseInt( b.dataset.num, 10 );

        return num_a - num_b;
      });

    },

    animateElements(){

      this.elementsToAnimate.forEach( e => {
        e.setAttribute('opacity', 0);
      });

      this.animate.ID = window.setInterval(() => {

        if(this.animate.currIndex == this.elementsToAnimate.length){
            this.animate.currIndex = 0;

            this.elementsToAnimate.forEach( e => { e.setAttribute('opacity', 0); });
        }

        this.elementsToAnimate[
              this.animate.currIndex++
            ].setAttribute('opacity', 1);

      }, this.animate.interval);

    },

    cancelAnimation(){
      window.clearInterval(this.animate.ID);

      // initialize all values
      this.animate.currIndex = 0;
      this.elementsToAnimate.forEach(e => { e.setAttribute('opacity', 1); });
    }
  },
  watch: {
    currentTheme(newVal, oldVal){
      if(newVal === this.color) this.themeActive = true;
      else this.themeActive = false;
    }
  },
  created(){
    if(this.color === this.currentTheme) this.themeActive = true;
  },
  mounted(){
    this.sortThingsToAnimate();

  }
};
</script>
