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
import Close from "./components/pages/Close";

import FirstV2 from "./components/pages/doctor/FirstV2";
import DoctorinfoV2 from "./components/pages/doctor/DoctorinfoV2";
import DoctornearV2 from "./components/pages/doctor/DoctornearV2";
import ScaleV2 from "./components/pages/doctor/ScaleV2";
import ServiceDemandV2 from "./components/pages/doctor/ServiceDemandV2";

import FirstV3 from "./components/pages/user/FirstV3";
import UserinfoV3 from "./components/pages/user/UserinfoV3";
import UsernearV3 from "./components/pages/user/UsernearV3";
import ScaleV3 from "./components/pages/user/ScaleV3";
import ServiceDemandV3 from "./components/pages/user/ServiceDemandV3";

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
    { path: '/', redirect:'/pages/firstV2',
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
    { path: '/pages/close', component: Close ,
      name:'close',
      meta: {
        title: '2019-nCov心理健康评估'
      }},


    //医护人员第二版
    { path: '/pages/firstV2', component: FirstV2 ,
      name:'firstV2',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/doctorinfoV2', component: DoctorinfoV2 ,
      name:'doctorinfoV2',
      meta: {
        title: '医护人员基本信息'
      }},
    { path: '/pages/doctornearV2', component: DoctornearV2 ,
      name:'doctornearV2',
      meta: {
        title: '医护人员近况'
      }},
    { path: '/pages/scaleV2', component: ScaleV2 ,
      name:'scaleV2',
      meta: {
        title: '量表'
      }},
    { path: '/pages/servicedemandV2', component: ServiceDemandV2,
      name:'servicedemandV2',
      meta: {
        title: '心理健康服务需求'
      }},

    //大众版
    { path: '/pages/firstV3', component: FirstV3 ,
      name:'firstV3',
      meta: {
        title: '2019-nCov心理健康评估'
      }},
    { path: '/pages/userinfoV3', component: UserinfoV3 ,
      name:'userinfoV3',
      meta: {
        title: '用户基本信息'
      }},
    { path: '/pages/usernearV3', component: UsernearV3 ,
      name:'usernearV3',
      meta: {
        title: '用户近况'
      }},
    { path: '/pages/scaleV3', component: ScaleV3 ,
      name:'scaleV3',
      meta: {
        title: '量表'
      }},
    { path: '/pages/servicedemandV3', component: ServiceDemandV3,
      name:'servicedemandV3',
      meta: {
        title: '心理健康服务需求'
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
