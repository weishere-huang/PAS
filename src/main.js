// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import store from './store'
import router from './router';
import base from "./base.js";
import Axios from './AxiosRequest';

import {
  Icon,
  Button,
  message
} from "ant-design-vue";
Vue.config.productionTip = false;
Vue.prototype.Axios = Axios;
Vue.use(Vuex)
Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);
Vue.prototype.$message = message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
