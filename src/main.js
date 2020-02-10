import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import VueRouter from "vue-router";
import axios from 'axios'

import First from "./components/pages/First";
import My from "./components/pages/My";
import Doctorinfo from "./components/pages/Doctorinfo";
import Userinfo from "./components/pages/Userinfo";
import Doctornear from "./components/pages/Doctornear";
import Usernear from "./components/pages/Usernear";

Vue.prototype.$axios = axios;

Vue.use(VueRouter)
Vue.config.productionTip = false

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

var router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/', redirect:'/pages/doctornear' },
    { path: '/pages/first', component: First },
    { path: '/pages/my',component: My},
    { path: '/pages/doctorinfo', component: Doctorinfo },
    { path: '/pages/doctornear', component: Doctornear },
    { path: '/pages/userinfo', component: Userinfo },
    { path: '/pages/usernear', component: Usernear }
  ]
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
