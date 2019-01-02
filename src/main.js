import Vue from 'vue'
import App from './App'

// source of Truth.
const store = {
  state: {
    message: 'Hello!',
    theme: 'Blue',
    colorSet: { 'navbarBg': '#E0F4FC', 'text': '#3A3F40',
                'menuActive': '#5DC8F0', 'contentBg': '#fff' },
    currentBaseFontSize: '13px'
  },
  changeTheme(selected){

    const colorSets = {
      'Blue': { 'navbarBg': '#E0F4FC', 'text': '#3A3F40', 'menuActive': '#5DC8F0', 'contentBg': '#fff' },
      'Green': { 'navbarBg': '#F4F8E7', 'text': '#3A3F40', 'menuActive': '#90BD0D', 'contentBg': '#fff' },
      'Orange': { 'navbarBg': '#FEF4E6', 'text': '#3A3F40', 'menuActive': '#F89302', 'contentBg': '#fff' },
      'Silver': { 'navbarBg': '#F5F5F5', 'text': '#3A3F40', 'menuActive': '#F89302', 'contentBg': '#fff' },
      'Dark': { 'navbarBg': '#3D3D3D', 'text': '#F5F5F5', 'menuActive': '#5DC8F0', 'contentBg': '#4E4E4E' }
    };

    this.state.theme = selected;
    this.state.colorSet = colorSets[selected];
  },
  changeBaseFontSize(selected){
    console.log("base font size changed!");
    this.state.currentBaseFontSize = selected;
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: store,
  components: { App },
  template: '<App/>'
})
