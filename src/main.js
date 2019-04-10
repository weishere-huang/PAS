// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import {
  Icon,
  Button
} from "ant-design-vue";
Vue.config.productionTip = false;

Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
