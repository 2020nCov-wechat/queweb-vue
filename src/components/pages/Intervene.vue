<template>
    <div class='user'>
        <div class='header bg-color acea-row row-between-wrapper'>
            <span class='iconfont icon-shezhi' data-url='/pages/user_info/index' bindtap='goPages'></span>
        </div>
        <div class='wrapper'>
            <div class='myService'>
                <div class='title acea-row row-middle'>指导意见</div>
                <div class="serviceList">
                    <div class="serviceList">
                        <div class="suggess-css" v-for="item in chart" v-bind:key="item">
                            <span>{{item.title}}：{{item.level}}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="bottom-view ">
            <div class='wrapper'>
                <div class='copy-view'>
                    <div class="copy-item">Software Support @ Huazhong</div>
                    <div class="copy-item">University ofScience and Technology,</div>
                    <div class="copy-item">Embedded and Pervasive Computing (EPIC) Lab</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "intervene",
        data() {
            return {

                chartTitle: '综合得分',
                percent: 30,//进度条
                videoId: "01",//结果视频编号
                isMainChartDisplay: true,
                catego:'抑郁症筛查量表',
                level: '无抑郁',
                score: 11,
                suggestion: '早睡早起',
                imgPath: '../../imgs/result/noResult.png',
                chart: null,
                chartData: {
                    main: {
                        title: '综合得分',
                        data: [15, 17, 10, 42],
                        categories: ['抑郁症筛查量表', '广泛性焦虑障碍量表', '失眠严重指数', '事件影响量表']
                    },
                },
                advice: [
                    '状态不错，吃好喝好，继续保持!',
                    '多出去走走，晒晒太阳，听听音乐，约上几个朋友聊聊天!',
                    '尽量不要一个人待着，注意作息规律，身处逆境时需要善待自己哦~',
                    '小艾希望你尽快向医生朋友们寻求一下帮助，他们可以让你更加开心快乐!'
                ],
                result: '',
                max: 0.1
            };
        },
        methods: {
            setResult: function (result) {
                var da = this.data.result + '\n' + result
                this.setData({
                    result: da
                })
            },


            updateChartClick: function () {
                this.updateChart()
            },
            //更新chart
            updateChart: function () {

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

                        that.setData({
                            // chart: response.data.data,
                            // level: response.data.level,
                            // score: response.data.score,
                            chart: response.data.scaleResults,
                        })
                        //更新建议
                        that.updateSuggession(response.data.scaleResults)
                        that.updateAllChart()
                        console.log(that.data.chart.length)
                        for (var i = 0; i < that.data.chart.length; i++) {
                            console.log(that.data.chart[i])
                            // that.data.chartData.sub[i].  data = that.data.chart[i].data
                            // that.data.chartData.sub[i].title = that.data.chart[i].day
                            that.data.chartData.main.categories[i] = that.data.chart[i].title
                            that.data.chartData.main.data[i] = that.data.chart[i].score
                            if (that.data.chart[i].score > that.data.max) {
                                that.data.max = that.data.chart[i].score;
                            }
                            else {
                                that.data.max = 0.1;
                            }

                        }
                    }

                }).catch(function (error) {
                    console.log('失败');
                    console.log(error);
                    that.$toast.success('刷新失败！请检查网络')
                });

            },
            //更新建议
            updateSuggession: function (level) {
                console.log("suggession update")
                var sugges = ''
                if (level == '无抑郁倾向') {
                    sugges = '状态不错，吃好喝好，继续保持!'
                }
                if (level == '轻度抑郁') {
                    sugges = '多出去走走，晒晒太阳，听听音乐，约上几个朋友聊聊天!'
                }
                if (level == '中度抑郁') {
                    sugges = '尽量不要一个人待着，注意作息规律，身处逆境时需要善待自己哦~'
                }
                if (level == '重度抑郁') {
                    sugges = '小艾希望你尽快向医生朋友们寻求一下帮助，他们可以让你更加开心快乐!'
                }
                this.setData({
                    suggestion: sugges,
                    imgPath: '../../imgs/result/haveResult.png'
                })
            },
            goMyInfo: function () {
            },
            updateAllChart() {
                this.updateData()
            },

        }
        // created() {
        //     this.setResult()
        // }

    };



</script>
