import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import VueRouter from "vue-router";
import axios from 'axios'
import Vconsole from 'vconsole'
import globalData from './assets/js/commom'

import First from "./components/pages/First";
import My from "./components/pages/My";
import Doctorinfo from "./components/pages/Doctorinfo";
import Userinfo from "./components/pages/Userinfo";
import Doctornear from "./components/pages/Doctornear";
import Usernear from "./components/pages/Usernear";
import Scale from "./components/pages/Scale";
import ServiceDemand from "./components/pages/ServiceDemand";
import Intervene from "./components/pages/Intervene";
import VideoPlay from "./components/pages/VideoPlay";
import InitWelcome from "./components/pages/InitWelcome";

axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios;
Vue.prototype.globalData = globalData;
Vue.use(VueRouter)
Vue.config.productionTip = false
let vConsole = new Vconsole()
Vue.use(vConsole)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

var router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/', redirect:'/pages/first',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/index', component:InitWelcome },
    { path: '/pages/first', component: First ,
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/my',component: My},
    { path: '/pages/doctorinfo', component: Doctorinfo ,
      meta: {
        title: '医护人员基本信息'
      }},
    { path: '/pages/doctornear', component: Doctornear ,
      meta: {
        title: '医护人员近况'
      }},
    { path: '/pages/userinfo', component: Userinfo },
    { path: '/pages/usernear', component: Usernear },
    { path: '/pages/scale', component: Scale },
    { path: '/pages/servicedemand', component: ServiceDemand },
    { path: '/pages/intervene', component: Intervene },
    { path: '/pages/videoplay', component: VideoPlay }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})
var sessionkey=''
var openid=''
new Vue({
  render: h => h(App),
  router,
  sessionkey,
  openid,
}).$mount('#app')
