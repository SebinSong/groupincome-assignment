import Vue from 'vue'
import App from './App'

// source of Truth.
const store = {
  state: {
    message: 'Hello!',
    theme: 'Blue',
    colorSet: { 'navbarBg': '#E0F4FC', 'text': '#3A3F40',
                'menuActive': '#5DC8F0', 'contentBg': '#fff', 'mainbg': '#5DC8F0' },
    currentBaseFontSize: '13px'
  },
  changeTheme(selected){

    const colorSets = {
      'Blue': { 'navbarBg': '#E0F4FC', 'text': '#3A3F40', 'menuActive': '#5DC8F0', 'contentBg': '#fff', 'mainbg': '#5DC8F0' },
      'Green': { 'navbarBg': '#F4F8E7', 'text': '#3A3F40', 'menuActive': '#90BD0D', 'contentBg': '#fff', 'mainbg': '#90BD0D'  },
      'Orange': { 'navbarBg': '#FEF4E6', 'text': '#3A3F40', 'menuActive': '#F89302', 'contentBg': '#fff', 'mainbg': '#F89302'  },
      'Silver': { 'navbarBg': '#F5F5F5', 'text': '#3A3F40', 'menuActive': '#F89302', 'contentBg': '#fff', 'mainbg': '#999999'  },
      'Dark': { 'navbarBg': '#3D3D3D', 'text': '#F5F5F5', 'menuActive': '#5DC8F0', 'contentBg': '#4E4E4E', 'mainbg': '#3D3D3D'  }
    };

    this.state.theme = selected;
    this.state.colorSet = colorSets[selected];
  },
  changeBaseFontSize(selected){
    console.log("base font size changed!");
    this.state.currentBaseFontSize = selected;
  }
}

// Vue setting
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: store,
  components: { App },
  template: '<App/>'
})
