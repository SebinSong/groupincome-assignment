<template>
  <ul id="navbar" class="blue"
      :style="{ fontSize: baseFontSize }"
  >
    <template v-for="(menu, index) in navBarList">
      <li v-if="menu.type === 'title'"
          :key="`navbarItem-${index}`"
          :class="menu.type"
      >{{ menu.text }}</li>
      <li v-else-if="menu.type === 'item'"
          :key="`navbarItem-${index}`"
          :class="{ 'item': true, 'active': menu.on }"
          :style="{ color: (menu.on)? '#fff' : currentColorSet.text }"
          @click.stop="navigateTo(menu.text)"
      >{{ menu.text }}</li>
      <li v-else
          :key="`navbarItem-${index}`"><hr/></li>
    </template>
  </ul>
</template>
<style lang="scss" scoped>
  @import '@/assets/scss/children/navbar.scss';
</style>
<script>
export default {
  name: 'Navbar',
  data(){
    return {
      navBarList: [
        { 'type': 'title', 'text': 'User Settings'},
        { 'type': 'item', 'text': 'My Accounts' , 'on': false },
        { 'type': 'item', 'text': 'Privacy & Safety', 'on': false },
        { 'type': 'title', 'text': 'App Settings'},
        { 'type': 'item', 'text': 'Notifications', 'on': false },
        { 'type': 'item', 'text': 'Appearance', 'on': true },
        { 'type': '', 'text': null},
        { 'type': 'item', 'text': 'Changelog', 'on': false },
        { 'type': 'item', 'text': 'Log Out', 'on': false }
      ],

      itemList: null
    };
  },
  computed: {
    currentTheme(){ return this.$root.$data.state.theme; },
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
  methods: {
    navigateTo(goTo){
      // emit a 'navigateTo' event to Modal.vue with the wanted page name
      this.$emit('navigateTo', goTo);

      // add a class 'active' to the selected menu item, while removing it from
      // the one that was previously selected.
      this.itemList.forEach( item => {
        if(item.text === goTo) item.on = true;
        else item.on = false;
      });

    }
  },
  watch: {
    currentTheme(newVal, oldVal){
      this.$el.classList.remove( oldVal.toLowerCase() );
      this.$el.classList.add( newVal.toLowerCase() );
    }
  },
  created(){
    // filter the element whose 'type' is 'item'. These will be used in navigateTo()
    this.itemList =
        this.navBarList.filter( d => d.type === 'item');
  },
  mounted(){
  }
};
</script>
