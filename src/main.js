import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from "axios";
// 配置请求的跟路径
axios.defaults.baseURL = "http://vue.mengxuegu.com/pro-api";
// 挂载
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
