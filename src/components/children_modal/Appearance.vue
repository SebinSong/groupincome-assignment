<template>
  <div id="appearance">

    <p class="maintitle"
       :style="{ color: currentColorSet.text }"
    >Appearance</p>

    <section>
      <p class="section-title"
         :style="{
           color: currentColorSet.text,
           fontSize: filteredFontSize
         }"
      >Theme</p>
      <div id="choosetheme">
        <Themeitem v-for="(theme, index) in themes"
                   :key="`colorTheme-${index}`"
                   :color="theme"
        />
      </div>
    </section>

    <section>
      <p class="section-title"
         :style="{
           color: currentColorSet.text,
           fontSize: filteredFontSize
         }"
      >Text settings</p>
      <Textsettings />
      
    </section>

  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/children/appearance.scss';
</style>
<script>
import Themeitem from './children_appearance/Themeitem';
import Textsettings from './children_appearance/Textsettings.vue';

export default {
  name: 'Appearance',
  components: { Themeitem, Textsettings },
  data(){
    return {
      themes: ['Blue', 'Green', 'Orange', 'Silver', 'Dark']
    };
  },
  computed: {
    currentTheme(){ return this.$root.$data.state.theme; },
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; },
    filteredFontSize(){
      let filtered;

      switch(this.baseFontSize){
        case '11px':
        case '13px': filtered = '19px'; break;
        case '15px': filtered = '20px'; break;
        case '17px': filtered = '21px'; break;
      }

      return filtered;
    }
  },
  methods: {
  }
};
</script>
