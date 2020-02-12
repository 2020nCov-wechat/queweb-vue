<template>
    <div class='user'>
        <div class='header bg-color acea-row row-between-wrapper'>
            <div class='header-have-arrow'>
                <div class='arrow'>
                    <van-icon name="arrow-left" size="25px" @click="backClick" />
                </div>
            </div>
            <div class='picTxt acea-row row-between-wrapper'>
                <div class=' tittle-css'>
                    <div class='acea-row row-middle'>
                        <div class=' line1 questionTitle'>{{scaleTitle}}</div>
                    </div>
                </div>
            </div>

        </div>
        <div class='wrapper'>
            <div class='nav acea-row row-middle'>
                <div class='item' data-url='/pages/user_money/index'>
                    <div class="btn-color brief-css">{{scaleBrief}}</div>
                </div>

            </div>

            <div class="item_list">
                <div class='myService'>
                    <div class='title acea-row row-middle title-height'>
                        <span class="question-css">{{questionShow.question}}</span>
                    </div>
                    <div class='serviceList acea-row row-middle'>

                        <div class="suggess-css">
                            <van-radio-group v-model="radio" v-on:change="onChange">
                                <div v-for="item in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                    <van-radio icon-size="28px" :name="item.value" label-class="answertext">
                                        {{item.answer}}
                                    </van-radio>
                                </div>
                            </van-radio-group>
                        </div>

                    </div>

                </div>
            </div>
            <!-- 最后一题 -->
            <div class="warn-text" v-if="questionShowIndex == questionNum - 1">
                <span>* "{{scaleTitle}}"回答完毕，请点击提交</span>
            </div>
            <div class="btn-bottom">
                <div class="btn-css">
                    <van-button color="#1296DB" type="primary" custom-class="btn-small" size="normal" v-on:click="clickBtnLast">上一题</van-button>
                </div>
                <div class="btn-css">
                    <van-button color="#1296DB" type="primary" custom-class="btn-small" size="normal" v-on:click="clickBtnNext">{{nextBtnText}}</van-button>
                </div>
            </div>
            <div class="btn-bottom">
                <div class="btn-css">
                    <span>{{questionShowIndex+1}}/{{questionNum}}</span>
                </div>
            </div>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>

<script>
    //获取应用实例
    import questionsOut from '../../../assets/js/queDoctor.js'
    export default {
        name: "scale",
        data() {
            return {
                radio: '',

                scaleTitle: '',
                scaleBrief: '',
                nextBtnText: "下一题",
                curScaleIndex: 1, //当前正在做的问卷序号
                questionHadAns: 0,
                questionShowIndex: 0,
                questionNum: 0,
                questionShow: {
                    "question": "1.入睡困难，睡不安稳或睡眠过多",
                    "answers": [{
                        "answer": "完全不会",
                        "value": 0
                    },
                        {
                            "answer": "好几天",
                            "value": 1
                        },
                        {
                            "answer": "一半以上的天数",
                            "value": 2
                        },
                        {
                            "answer": "几乎每天",
                            "value": 3
                        },
                    ]
                },
                questions: [],
                answers: []
            }
        },
        methods: {
            initQuestion: function () {
                this.questions = questionsOut.que1.questions
                this.questionShow = questionsOut.que1.questions[0]
                this.scaleTitle = questionsOut.que1.scaleTitle
                this.scaleBrief = questionsOut.que1.scaleBrief
                this.questionNum = questionsOut.que1.qNum
            },
            nextQuestionPage: function () {
                if (this.curScaleIndex == 1) {
                    //开始做第二套
                    this.questions = questionsOut.que2.questions
                    this.questionShow = questionsOut.que2.questions[0]
                    this.scaleTitle = questionsOut.que2.scaleTitle
                    this.scaleBrief = questionsOut.que2.scaleBrief
                    this.questionNum = questionsOut.que2.qNum
                    this.curScaleIndex = 2
                    this.questionHadAns = 0
                    this.questionShowIndex = 0
                    this.answers = []
                    this.nextBtnText = "下一题"
                    this.radio = ''
                } else if (this.curScaleIndex == 2) {
                    //开始做第三套
                    this.questions = questionsOut.que3.questions
                    this.questionShow = questionsOut.que3.questions[0]
                    this.scaleTitle = questionsOut.que3.scaleTitle
                    this.scaleBrief = questionsOut.que3.scaleBrief
                    this.questionNum = questionsOut.que3.qNum
                    this.curScaleIndex = 3
                    this.questionHadAns = 0
                    this.questionShowIndex = 0
                    this.answers = []
                    this.nextBtnText = "下一题"
                    this.radio = ''
                } else if (this.curScaleIndex == 3) {
                    //开始做第四套
                    this.questions = questionsOut.que4.questions
                    this.questionShow = questionsOut.que4.questions[0]
                    this.scaleTitle = questionsOut.que4.scaleTitle
                    this.scaleBrief = questionsOut.que4.scaleBrief
                    this.questionNum = questionsOut.que4.qNum
                    this.curScaleIndex = 4
                    this.questionHadAns = 0
                    this.questionShowIndex = 0
                    this.answers = []
                    this.nextBtnText = "下一题"
                    this.radio = ''
                } else if (this.curScaleIndex == 4) {
                    //开始做第五套
                    this.questions = questionsOut.que5.questions
                    this.questionShow = questionsOut.que5.questions[0]
                    this.scaleTitle = questionsOut.que5.scaleTitle
                    this.scaleBrief = questionsOut.que5.scaleBrief
                    this.questionNum = questionsOut.que5.qNum
                    this.curScaleIndex = 5
                    this.questionHadAns = 0
                    this.questionShowIndex = 0
                    this.answers = []
                    this.nextBtnText = "下一题"
                    this.radio = ''
                } else if (this.curScaleIndex == 5) {
                    //结束
                    this.$toast.success('量表回答完毕')
                    this.$router.push('/pages/servicedemandV2')
                }
            },
            onChange: function (dataMsg) {
                console.log("onchange")
                console.log(dataMsg)

                if (dataMsg==null || dataMsg === "" ) {
                    console.log("空的")
                    return
                }
                console.log(this.questionHadAns + '  ' + this.questionShowIndex + '  ' + (this.questionNum - 1))
                if (this.questionHadAns > this.questionShowIndex) {
                    console.log("回答过了")
                    var ansNew = this.answers;
                    ansNew[this.questionShowIndex] = dataMsg

                    this.answers = ansNew

                    //--------
                    this.radio = dataMsg
                    console.log(this.answers)
                    // setTimeout(function () {
                    //     if (that.data.questionShowIndex == that.data.questionNum - 2) {
                    //         that.setData({
                    //             nextBtnText: "完成"
                    //         })
                    //     }
                    //     if (that.data.questionShowIndex == that.data.questionNum - 1) {
                    //         //回答完毕
                    //         console.log("finish")
                    //         that.setData({
                    //             nextBtnText: "完成"
                    //         })
                    //     } else {
                    //         console.log(that.data.radio)
                    //         //如果后面的回答过了，就显示后面的题目
                    //         var ra = ''
                    //         if (that.data.questionHadAns > that.data.questionShowIndex) {
                    //             ra = that.data.answers[that.data.questionShowIndex + 1]
                    //             console.log("ra::" + ra)
                    //         }
                    //         that.setData({
                    //             questionShow: that.data.questions[that.data.questionShowIndex + 1],
                    //             questionShowIndex: that.data.questionShowIndex + 1,
                    //             radio: ra
                    //         });
                    //     }
                    // }, 500)

                    //---------
                } else {
                    console.log("还没回答过，第一次回答这道题目")
                    this.answers.push(dataMsg)

                    this.radio = dataMsg
                    console.log(this.answers)
                    var that = this
                    setTimeout(function () {
                        if (that.questionShowIndex == that.questionNum - 2) {
                            that.nextBtnText = "完成"
                        }
                        if (that.questionShowIndex == that.questionNum - 1) {
                            //回答完毕
                            console.log("finish")
                            that.questionHadAns = that.questionHadAns + 1
                            that.nextBtnText = "完成"
                        } else {
                            console.log(that.radio)
                            //如果后面的回答过了，就显示后面的题目
                            var ra = ''
                            if (that.questionHadAns > that.questionShowIndex) {
                                ra = that.answers[that.questionShowIndex + 1]
                                console.log("ra::" + ra)
                            }
                            that.questionShow = that.questions[that.questionShowIndex + 1]
                            that.questionShowIndex = that.questionShowIndex + 1
                            that.questionHadAns = that.questionHadAns + 1
                            that.radio = ra
                        }
                    }, 500)

                }

                // if (this.data.questionShowIndex == this.data.questionNum - 1) {
                //   //回答完毕
                //   console.log("finish")
                // } else {
                //   console.log(this.data.radio)
                //   this.setData({
                //     questionShow: this.data.questions[this.data.questionShowIndex + 1],
                //     questionShowIndex: this.data.questionShowIndex + 1,
                //     radio: ''
                //   });
                // }
            },
            clickBtnLast() {
                if (this.questionShowIndex != 0) {
                    console.log(this.questions[this.questionShowIndex])
                    this.nextBtnText = "下一题"
                    this.questionShow = this.questions[this.questionShowIndex - 1]
                    this.radio = this.answers[this.questionShowIndex - 1]
                    this.questionShowIndex = this.questionShowIndex - 1
                } else {
                    console.log("first one")
                }
            },
            clickBtnNext() {
                console.log(this.questionHadAns + '  ' + this.questionShowIndex + '     ' + (this.questionNum - 1))
                if (this.questionHadAns <= this.questionShowIndex) {
                    console.log("还没答完当前题目")
                    this.$toast.fail('请先回答当前问题');
                } else {
                    if (this.questionShowIndex == this.questionNum - 1) {
                        //回答完毕
                        console.log("last one")
                        this.nextBtnText = "完成"
                        this.sendAnswer(this.curScaleIndex)
                    } else {
                        console.log(this.questionShowIndex)
                        if (this.questionShowIndex == this.questionNum - 2) {
                            //是最后一道题
                            if (this.questionHadAns <= this.questionShowIndex + 1) {
                                //下一题还没回答
                                this.nextBtnText = "完成"
                                this.questionShow = this.questions[this.questionShowIndex + 1]
                                this.radio = ''
                                this.questionShowIndex = this.questionShowIndex + 1
                            } else {
                                this.nextBtnText = "完成"
                                this.questionShow = this.questions[this.questionShowIndex + 1]
                                this.radio = this.answers[this.questionShowIndex + 1]
                                this.questionShowIndex = this.questionShowIndex + 1
                            }

                        } else {
                            //不是最后一道题
                            if (this.questionHadAns <= this.questionShowIndex + 1) {
                                //下一题还没回答
                                this.questionShow = this.questions[this.questionShowIndex + 1]
                                this.radio = ''
                                this.questionShowIndex = this.questionShowIndex + 1
                            } else {
                                this.questionShow = this.questions[this.questionShowIndex + 1]
                                this.radio = this.answers[this.questionShowIndex + 1]
                                this.questionShowIndex = this.questionShowIndex + 1
                            }

                        }
                    }

                }
            },
            //提交答案
            sendAnswer: function (index) {

                console.log(index)
                // this.$router.push('/pages/doctornear')

                var urlNew = this.globalData.Url.submitScale
                var newopenid = this.globalData.openid
                var newSession_key = this.globalData.sessionkey
                if(index==5){
                    //第五个量表，用提交基本信息的那个接口结构
                    urlNew = this.globalData.Url.subminScale5
                    newSession_key = newSession_key.replace(/ +/g, '%2B')
                    newopenid = newopenid.replace(/ +/g, '%2B')
                    console.log('准备发送')
                    console.log(newopenid)
                    console.log(newSession_key)
                    console.log({
                        openid: newopenid,
                        session_key: newSession_key,
                        message: this.answers
                    })
                    var that = this
                    this.$axios.post(urlNew,{
                        openid: newopenid,
                        session_key: newSession_key,
                        message: that.answers
                    }).then(function (response) {
                        console.log('成功');
                        if(response.status=="200"){
                            console.log(response.data);
                            that.$toast.success('提交成功！')
                            that.nextQuestionPage()
                        }
                    }).catch(function (error) {
                        console.log('失败');
                        console.log(error);
                        that.$toast.success('提交失败！请检查网络')
                        // that.send(message)
                    });
                }else{
                    //其他四个量表
                    newSession_key = newSession_key.replace(/ +/g, '%2B')
                    newopenid = newopenid.replace(/ +/g, '%2B')
                    console.log('准备发送')
                    console.log(newopenid)
                    console.log(newSession_key)
                    console.log({
                        openid: newopenid,
                        session_key: newSession_key,
                        questionNaire: index,
                        answers: this.answers
                    })
                    var that1 = this
                    this.$axios.post(urlNew,{
                        openid: newopenid,
                        session_key: newSession_key,
                        questionNaire: index,
                        answers: that1.answers
                    }).then(function (response) {
                        console.log('成功');
                        if(response.status=="200"){
                            console.log(response.data);
                            that1.$toast.success('提交成功！')
                            that1.nextQuestionPage()
                        }
                    }).catch(function (error) {
                        console.log('失败');
                        console.log(error);
                        that1.$toast.success('提交失败！请检查网络')
                        // that.send(message)
                    });

                }

                // wx.request({
                //     //获取openid接口
                //     url: getApp().globalData.submitScale,
                //     data: {
                //         openid: newopenid,
                //         session_key: newSession_key,
                //         questionNaire: index,
                //         answers: that.data.answers
                //     },
                //     method: 'POST',
                //     success: function (res) {
                //         console.log(res.data)
                //         if (res.data.errorCode == 200) {
                //             console.log("发送成功")
                //             console.log(that.data.answers)

                //             //Toast.success('成功提交');

                //             //获取得分与结果
                //             that.nextQuestionPage()

                //         } else {
                //             //登录过期
                //             console.log("登录过期")
                //             //更新openid
                //             getApp().updateOpenid()
                //             that.sendAnswer(index)
                //         }

                //     },
                // })
            },
            //其他函数
            backClick: function () {
                var that = this
                this.$dialog.confirm({
                    title: '退出答题',
                    message: '确认要退出答题吗？'
                }).then(() => {
                    // on confirm
                    that.$router.push('/pages/firstV2')
                }).catch(() => {
                    // on cancel
                    console.log('点击取消回调')
                });

            },

        },
        created() {
            this.initQuestion()
        }
    }
</script>

<style scoped>
    @import "../../../assets/css/common.css";
</style>
