import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import './app';
import 'element-ui/lib/theme-chalk/index.css'
import ElBigdataTable from './vue-element-bigdata-table/index';
Vue.use(ElBigdataTable);
Vue.use(ElementUI);
let vm = new Vue({
  render: h => h(App),
}).$mount('#app')

