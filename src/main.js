import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

axios.defaults.baseURL='http://hhh666.in.pubyun.net:22561/'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')