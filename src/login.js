import Vue from 'vue';
import LoginApp from './LoginApp';
import './assets/threeEf';
import Axios from './AxiosRequest';
Vue.prototype.Axios = Axios;
new Vue({
  el: '#app',
  components: {
    LoginApp
  },
  template: '<LoginApp/>'
});
