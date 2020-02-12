<template>
  <div id="app">
    <router-view></router-view>
    <Tabbar v-if="tabbarShow" ></Tabbar>
    <div class="empty"></div>
  </div>
</template>

<script>
import Tabbar from '@/components/bottombar/Tabbar.vue'
export default {
  name: 'app',
  created:function(){
    this.$router.push('/')
  },
  components:{
    Tabbar
  },
  data(){
    return{
      tabbarShow:true,
    }
  },
  watch:{
    $route(e){
      if(e.name=="doctorinfo"||e.name=="doctornear"||e.name=="userinfo"||e.name=="usernear"||
              e.name=="scale"||e.name=="servicedemand"||e.name=="videoplay"
      ){
        this.tabbarShow =false;
      }else{
        this.tabbarShow=true;
      }
    }
  }

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
