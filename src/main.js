import Vue from 'vue';
import BootstrapVue, {BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue';
import store from './store.js'
import './assets/styles.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);


new Vue({
	store,
  render: h => h(App),
}).$mount('#app')
