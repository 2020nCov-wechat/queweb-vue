<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <div id="echartContainer" style="width:500px; height:500px"></div>
  </div>
</template>

<script>
import axios from "axios";
var echarts = require("echarts");
export default {
  name: "my",
  mounted() {
    this.drawline();
  },
  methods: {
    drawline() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echartContainer"));
      // 绘制图表
      myChart.setOption({
        grid: {},
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
          axisLabel: {
            interval: 0
          }
        },
        yAxis: { max: 80 },
        series: [
          {
            name: "得分",
            type: "bar",
            data: [5, 20, 36, 10]
          }
        ],
        itemStyle: {
          color: "#7EC0EE"
        }
      });

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

      axios.get("http://jsonplaceholder.typicode.com/users").then(res => {
        setTimeout(() => {
          //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
          if (res != null) {
            for (var i = 0; i < res.length; i++) {
              names.push(res[i].name); //挨个取出类别并填入类别数组
            }
            for (var j = 0; j < res.length; j++) {
              nums.push(res[j].id); //挨个取出销量并填入销量数组
            }
            myChart.hideLoading(); //隐藏加载动画
            myChart.setOption({
              //加载数据图表
              xAxis: {
                data: names
              },
              yAxis: {
                data: nums
              }
            });
          }
        }, 2000);
      });
    }
  }
};
</script>

<style scoped>
.echartContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  font-size: 35rpx;
  color: #333;
  font-family: Helvetica, Arial, "Helvetica Neue", "Droid Sans",
    "Microsoft YaHei", sans-serif;
  display: inline-block;
  vertical-align: middle;
}
</style>