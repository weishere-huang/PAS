import Vue from 'vue';
import LoginApp from './LoginApp';
import './assets/threeEf';


new Vue({
    el: '#app',
    components: { LoginApp },
    template: '<LoginApp/>'
});