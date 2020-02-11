<template>

  <div class='user'>
    <div class='header bg-color acea-row row-between-wrapper-first '>
      <div class='header-have-arrow'>
        <div class="header-out-style">
          <div class='picTxt acea-row row-between-wrapper header-display '>
            <div class='text'>
              <div class='acea-row row-middle name-css'>
                <div class='titlehead'>我的量表得分</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class='wrapper'>

      <div class='nav acea-row row-middle title-padding'>

        <!--创建一个echarts的容器-->
        <div id="echartContainer" style="width:100%; height:400px"></div>
      </div>
<!--      <div class="item_list">-->
<!--        <div class='myService'>-->
<!--          <div class='title acea-row row-middle title-height'>-->
<!--            <span class="question-css">1.您是医护人员吗？</span></div>-->
<!--          <div class='serviceList acea-row row-middle'>-->

<!--            <div class="suggess-css">-->
<!--              <van-radio-group v-model="radio" >-->
<!--                <div class="answer-css">-->
<!--                  <van-radio name="是的" icon-size="28px" label-class="answertext"  v-on:click="onChange(1)">是的</van-radio>-->
<!--                </div>-->
<!--                <div class="answer-css">-->
<!--                  <van-radio name="不是" icon-size="28px" label-class="answertext"  v-on:click="onChange(2)">不是</van-radio>-->
<!--                </div>-->
<!--              </van-radio-group>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
// import axios from "axios";
var echarts = require("echarts");
export default {
  name: "my",
  mounted() {
    this.drawline();
  },
  methods: {
    drawline:function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echartContainer"));
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: { text: "综合得分" },
        tooltip: {},
        legend: {
          data: ["得分"]
        },

        xAxis: {
          data: [
            "抑郁症筛查量表",
            "广泛性焦虑障碍量表",
            "失眠严重指数",
            "事件影响量表"
          ],

          axisLabel:{
            formatter:function(value){
              return value.split("").join('\n');
            },
            fontSize:16,
          }
        },
        yAxis: { max: 80 },
        series: [
          {
            name: "得分",
            type: "bar",
            barWidth : 30,//柱图宽度
            data: [5, 20, 36, 10]
          }
        ],
        itemStyle: {
          color: "#7EC0EE"
        },

      });
      // (window).resize(function() {
      //   myChart.resize();
      // });
      // myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

      var names = []; //类别数组（实际用来盛放X轴坐标值）
      var nums = []; //销量数组（实际用来盛放Y坐标值）

      // $.ajax({
      //     type: "post",
      //     async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
      //     url: "ncov/getresults",    //请求发送到后台controller的地址

      //     dataType: "json",        //返回数据形式为json
      //     success: function (results) {
      //         //请求成功时执行该函数内容，result即为服务器返回的json对象
      //         if (results!=null) {

      //             for (var i = 0; i < results.length; i++) {

      //                 names.push(results[i].name);    //挨个取出类别并填入类别数组
      //             }
      //             for (var i = 0; i < results.length; i++) {
      //                 nums.push(results[i].value);    //挨个取出销量并填入销量数组
      //             }
      //             myChart.hideLoading();    //隐藏加载动画
      //             myChart.setOption({        //加载数据图表
      //                 xAxis: {
      //                     data: names
      //                 },
      //                 yAxis:{
      //                     data: nums
      //                 },

      //             });

      //         }

      //     },
      //     error: function (errorMsg) {
      //         //请求失败时执行该函数
      //         alert("图表请求数据失败!");
      //         myChart.hideLoading();
      //     }
      // })
      var urlNew = this.globalData.Url.testResult
      var newopenid = this.globalData.openid
      var newSession_key = this.globalData.sessionkey
      console.log(newopenid)
      console.log(newSession_key)
      newSession_key = newSession_key.replace(/ +/g, '%2B')
      newopenid = newopenid.replace(/ +/g, '%2B')
      var that = this
      this.$axios.post(urlNew,{
        openid: newopenid,
        session_key: newSession_key,
      }).then(function (response) {
        console.log('成功');
        console.log(response);
        that.$toast.success('刷新成功！')
        if(response.status=="200"){

          var scaleResults = response.data.scaleResults
          setTimeout(() => {
            //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时

            if (scaleResults != null) {
              for (var i = 0; i < scaleResults.length; i++) {
                names.push(scaleResults[i].title); //挨个取出类别并填入类别数组
                nums.push(scaleResults[i].score); //挨个取出销量并填入销量数组
              }
              myChart.hideLoading(); //隐藏加载动画
              myChart.setOption({
                //加载数据图表
                xAxis: {
                  data: names
                },
                series: {
                  data: nums
                }
              });
            }
          }, 2000);
        }
      }).catch(function (error) {
        console.log('失败');
        console.log(error);
        that.$toast.success('刷新失败！请检查网络')
        // that.send(message)
      });
      // axios.get("http://jsonplaceholder.typicode.com/users").then(res => {
      //   setTimeout(() => {
      //     //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
      //     if (res != null) {
      //       for (var i = 0; i < res.length; i++) {
      //         names.push(res[i].name); //挨个取出类别并填入类别数组
      //       }
      //       for (var j = 0; j < res.length; j++) {
      //         nums.push(res[j].id); //挨个取出销量并填入销量数组
      //       }
      //       myChart.hideLoading(); //隐藏加载动画
      //       myChart.setOption({
      //         //加载数据图表
      //         xAxis: {
      //           data: names
      //         },
      //         yAxis: {
      //           data: nums
      //         }
      //       });
      //     }
      //   }, 2000);
      // });
    }
  }
};
</script>

<style scoped>
.echartContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  font-size: 35px;
  color: #333;
  font-family: Helvetica, Arial, "Helvetica Neue", "Droid Sans",
    "Microsoft YaHei", sans-serif;
  display: inline-block;
  vertical-align: middle;
}
</style>