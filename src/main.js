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
      name:'firstindex',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/index', component:InitWelcome },
    { path: '/pages/first', component: First ,
      name:'first',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/my',component: My,
      name:'my',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/doctorinfo', component: Doctorinfo ,
      name:'doctorinfo',
      meta: {
        title: '医护人员基本信息'
      }},
    { path: '/pages/doctornear', component: Doctornear ,
      name:'doctornear',
      meta: {
        title: '医护人员近况'
      }},
    { path: '/pages/userinfo', component: Userinfo ,
      name:'userinfo',
      meta: {
        title: '用户基本信息'
      }},
    { path: '/pages/usernear', component: Usernear ,
      name:'usernear',
      meta: {
        title: '用户近况'
      }},
    { path: '/pages/scale', component: Scale ,
      name:'scale',
      meta: {
      title: '量表'
    }},
    { path: '/pages/servicedemand', component: ServiceDemand,
      name:'servicedemand',
      meta: {
        title: '心理健康服务需求'
    }},
    { path: '/pages/intervene', component: Intervene ,
      name:'intervene',
      meta: {
        title: '干预'
      }},
    { path: '/pages/videoplay', component: VideoPlay ,
      name:'videoplay',
      meta: {
        title: '视频播放'
      }},
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
