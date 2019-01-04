<template>
  <div id="modal">

    <div id="topBg"
         :style="{ backgroundColor: currentColorSet.contentBg }"></div>
    <!-- close Button -->
    <div id="closemodal"
         @click.stop="closeModal"
    >
      <button
        :style="{ color: currentColorSet.text }"
      ><i class="fas fa-times"></i></button>
      <span :style="{ fontSize: baseFontSize }">ESC</span>
    </div>
    <!-- menu Open -->
    <div id="menubar"
         @click.stop="menuOn"
    >
      <button
        :style="{ color: currentColorSet.text }"
      ><i class="fas fa-bars"></i></button>
      <span :style="{ fontSize: baseFontSize }">MENU</span>
    </div>

    <!-- navigation bar -->
    <nav id="modal-nav"
         :style="{ backgroundColor: currentColorSet.navbarBg }"
         :class="{ active: navbarOn }"
    >
      <Navbar @navigateTo="switchPage" />
      <span id="modal-nav-fold"
            @click.stop="navbarOn = false"
            :style="{ color: currentColorSet.text }"
      ><i class="fas fa-times"></i></span>
    </nav>

    <!-- content area -->
    <content id="modal-content"
             :style="{ backgroundColor: currentColorSet.contentBg }"
             ref="modalContent"
    >
      <keep-alive>
        <transition name="modalcontent" >
            <Appearance v-if="currentPage === 'Appearance'" />
            <Placeholder v-else
                         :pageName="currentPage"
            />
        </transition>
      </keep-alive>
      <div id="content-block" v-if="navbarOn"></div>
    </content>

  </div>
</template>
<style lang="scss" scoped>
@import '../assets/scss/children/modal.scss';
</style>
<script>
import Navbar from './children_modal/Navbar';
import Appearance from './children_modal/Appearance';
import Placeholder from './children_modal/Placeholder';

export default {
  name: 'Modal',
  components: { Navbar, Appearance, Placeholder },
  data(){
    return {
      currentPage: 'Appearance',
      navbarOn: false
    };
  },
  computed: {
    currentTheme(){ return this.$root.$data.state.theme; },
    currentColorSet(){ return this.$root.$data.state.colorSet; },
    baseFontSize(){ return this.$root.$data.state.currentBaseFontSize; }
  },
  methods: {
    closeModal(){
      this.$emit('closeModal', null);
    },
    menuOn(){
      this.navbarOn = true;
      this.$refs.modalContent.scrollTop = 0;
    },
    switchPage(goTo){
      this.navbarOn = false;
      this.currentPage = goTo;
    }
  }
};
</script>
