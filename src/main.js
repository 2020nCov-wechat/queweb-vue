import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import VueRouter from "vue-router";

Vue.use(VueRouter)
Vue.config.productionTip = false

import First from "./components/pages/First";
import My from "./components/pages/My";
var router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/pages/first', component: First },
    { path: '/pages/my',component: My}
  ]
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
