import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import Vuex from "vuex";
import store from "./store";
import "./assets/css/global.css"

axios.defaults.baseURL = "https://4wr6987968.yicp.fun/";
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.use(Vuex);
Vue.prototype.$store = store;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
