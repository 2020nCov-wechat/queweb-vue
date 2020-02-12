<template>
    <div class='user'>
        <div class='header bg-color acea-row row-between-wrapper'>
            <div class='header-have-arrow'>
                <div class='arrow'>
                    <van-icon name="arrow-left" size="25px" @click="backClick"  />
                </div>
            </div>
            <div class='picTxt acea-row row-between-wrapper'>
                <div class=' tittle-css'>
                    <div class='acea-row row-middle'>
                        <div class=' line1 questionTitle'>最近一周居住与工作状况</div>
                    </div>
                </div>
            </div>
        </div>
        <div class='wrapper'>

            <div class="item_list">
                <div class='myService'>
                    <div class='title acea-row row-middle title-height'>
                        <span class="question-css">{{questionShow.question}}</span>
                    </div>
                    <div class='serviceList acea-row row-middle'>

                        <div class="suggess-css">
                            <div v-if="questionShow.type==1">

                                <van-radio-group v-model="radio" v-on:change="onChange">
                                    <div v-for="item in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-radio icon-size="28px" :name="item.answer" label-class="answertext">
                                            {{item.answer}}
                                        </van-radio>
                                    </div>
                                </van-radio-group>
                            </div>
                            <div v-if="questionShow.type==5">
                                <div  class="answer-css" v-on:click="showBottom">
                                    <span style="font-size:20px;">{{nation || "请点击我以选择民族"}}</span>
                                </div>
                                <van-popup  v-model="bottom" position="bottom" custom-style="height: 40%" bind:close="hideBottom">
                                    <van-picker show-toolbar title="请选择民族" :columns="nationOption"   @cancel="onCancelNation"
                                                @confirm="onConfirmNation" />
                                </van-popup>
                            </div>

                            <div v-if="questionShow.type==6">
                                <div class="answer-css" v-on:click="showCityBottom">
                                    <span style="font-size:20px;">{{address || "请点击我以选择地址"}}</span>
                                </div>
                                <van-popup v-model="cityBottom" position="bottom" custom-style="height: 40%" bind:close="hideCityBottom">
                                    <van-area v-model="value"  :area-list="areaList"
                                              @cancel="onCancelCity"
                                              @confirm="onConfirmCity"/>
                                </van-popup>
                            </div>


                            <div v-if="questionShow.type==3">
                                <van-checkbox-group v-model="answers[questionShowIndex]"  v-on:change="onManyChange">
                                    <div v-for="item in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-checkbox icon-size="28px" :name="item.answer" shape="square" label-class="answertext">
                                            {{item.answer}}
                                        </van-checkbox>
                                    </div>
                                </van-checkbox-group>
                            </div>

                            <div v-if="questionShow.type==4">
                                <van-checkbox-group  v-model="answers[questionShowIndex]"  v-on:change="onManyChange">
                                    <div v-for="item in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-checkbox icon-size="28px" :name="item.answer" shape="square" label-class="answertext">
                                            {{item.answer}}
                                        </van-checkbox>
                                    </div>
                                </van-checkbox-group>
                                <div class="input-clsss">
                                    <van-cell-group>
                                        <van-field  v-model="messages[questionShowIndex]" type="textarea" placeholder="选择'其他'时请输入" autosize  v-bind:input="inputOthers" id="questionShowIndex" />
                                    </van-cell-group>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="warn-text" v-if="questionShowIndex == questionNum - 1">
                <span >* 最近一周居住与工作状况回答完毕，请点击提交</span>
            </div>
            <!-- 多选 -->
            <div class="warn-text" v-if="questionShow.type>=3&&questionShow.type<=4">
                <span >* 本多选题回答完毕，请点击下一题</span>
            </div>
            <div class="warn-text" v-if="questionShow.type==2">
                <span >* 本题回答完毕，请点击下一题</span>
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
    import questionsOut from '../../assets/js/questions.js'
    import area from '../../assets/js/area'
    // import globalData from '../../assets/js/commom.js'
    export default {
        name: "doctorinfo",
        data(){
            return{
                manyRadio:[],
                address: '',
                cityBottom: false,

                radio: '',
                nation:'',
                bottom: false,
                scaleTitle: '问卷调查',
                scaleBrief: '问卷调查',
                nextBtnText: "下一题",
                curScaleIndex: 3,//当前正在做的问卷序号
                questionHadAns: 0,
                questionShowIndex: 0,
                questionNum: questionsOut.doctornear.qNum,
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
                questions: questionsOut.doctornear.questions,
                answers: [],
                manyChooseHasAnswer:false,

                //地址
                loading: false,
                value: '420000',
                areaList: {
                    province_list: area.city.province_list ,
                    city_list: area.city.city_list,
                    county_list: area.city.county_list
                },
                //保存多选结果
                manyAnswers:[],

                //其他信息
                othersInput: '',
                message: '',
                messages: [],
            }
        },
        methods:{
            onChange:function(dataMsg) {
                console.log("onchange")
                console.log(dataMsg)
                if(dataMsg==""){
                    console.log("空的")
                    return
                }
                console.log(this.questionHadAns + '  ' + this.questionShowIndex + '  ' + (this.questionNum - 1))
                if (this.questionHadAns > this.questionShowIndex) {
                    console.log("回答过了")
                    var ansNew = this.answers;
                    ansNew[this.questionShowIndex] = dataMsg

                    this.answers=ansNew

                    //--------
                    this.radio= dataMsg
                    console.log(this.answers)
                    //对于h5,在选择上一题后，会自动刷新radio，同时也会触发一次onchange，此时就不要自动跳到下一题了，让用户自己选择下一题
                    // setTimeout(function () {
                    //     if (this.questionShowIndex == this.questionNum - 2) {
                    //         this.nextBtnText= "完成"
                    //     }
                    //     if (this.questionShowIndex == this.questionNum - 1) {
                    //         //回答完毕
                    //         console.log("finish")
                    //         this.nextBtnText= "完成"
                    //     } else {
                    //         console.log(this.radio)
                    //         //如果后面的回答过了，就显示后面的题目
                    //
                    //
                    //
                    //         var ra = ''
                    //         if (this.questionHadAns > this.questionShowIndex) {
                    //             ra = this.answers[this.questionShowIndex + 1]
                    //             console.log("ra::" + ra)
                    //         }
                    //         this.questionShow= this.questions[this.questionShowIndex + 1]
                    //         this.questionShowIndex= this.questionShowIndex + 1
                    //         this.radio= ra
                    //     }
                    // }, 500)

                    //---------
                } else {
                    console.log("还没回答过，第一次回答这道题目")
                    this.answers.push(dataMsg)


                    this.radio= dataMsg
                    var that = this
                    setTimeout(function () {
                        if (that.questionShowIndex == that.questionNum - 2) {
                            that.nextBtnText= "完成"
                        }
                        if (that.questionShowIndex == that.questionNum - 1) {
                            //回答完毕
                            console.log("finish")
                            that.questionHadAns= that.questionHadAns + 1
                            that.nextBtnText= "完成"
                        } else {
                            console.log(that.radio)
                            //如果后面的回答过了，就显示后面的题目
                            var ra = ''
                            if (that.questionHadAns > that.questionShowIndex) {
                                ra = that.answers[that.questionShowIndex + 1]
                                console.log("ra::" + ra)
                            }
                            that.questionShow= that.questions[that.questionShowIndex + 1]
                            that.questionShowIndex= that.questionShowIndex + 1
                            that.questionHadAns=that.questionHadAns + 1
                            that.radio= ra

                        }
                    }, 500)

                }
            },
            clickBtnLast() {
                if (this.questionShowIndex != 0) {
                    console.log(this.answers)
                    console.log("上一题")
                    this.nextBtnText= "下一题"
                    this.questionShow= this.questions[this.questionShowIndex - 1]
                    this.radio= this.answers[this.questionShowIndex - 1]
                    this.questionShowIndex= this.questionShowIndex - 1
                } else {
                    console.log("first one")
                }
            },
            clickBtnNext() {
                if (this.questionHadAns <= this.questionShowIndex) {
                    console.log("还没答完当前题目")
                    this.$toast.fail('请先回答当前问题');
                } else {
                    if (this.questionShowIndex == this.questionNum - 1) {
                        //回答完毕
                        console.log("last one")
                        this.nextBtnText= "完成"
                        this.send(this.answers)
                    } else {
                        console.log(this.questionShowIndex)
                        if (this.questionShowIndex == this.questionNum - 2) {
                            //是最后一道题
                            if (this.questionHadAns <= this.questionShowIndex + 1) {
                                //下一题还没回答

                                this.nextBtnText= "完成"
                                this.questionShow= this.questions[this.questionShowIndex + 1]
                                this.radio= ''
                                this.questionShowIndex=this.questionShowIndex + 1
                            } else {
                                this.nextBtnText= "完成"
                                this.questionShow= this.questions[this.questionShowIndex + 1]
                                this.radio= this.answers[this.questionShowIndex + 1]
                                this.questionShowIndex=this.questionShowIndex + 1

                            }

                        } else {
                            //不是最后一道题
                            if (this.questionHadAns <= this.questionShowIndex + 1) {
                                //下一题还没回答
                                this.questionShow= this.questions[this.questionShowIndex + 1]
                                this.radio= ''
                                this.questionShowIndex= this.questionShowIndex + 1
                            } else {
                                this.questionShow= this.questions[this.questionShowIndex + 1]
                                this.radio= this.answers[this.questionShowIndex + 1]
                                this.questionShowIndex= this.questionShowIndex + 1
                            }

                        }
                    }
                }
            },

            //发送信息
            send: function (message) {

                message = this.sendManyQuestionDeal(message)

                message = this.addOthersMsgWhenSend(message)
                // this.$router.push('/pages/doctornear')
                console.log('发送的数据：')
                console.log(message)

                var urlNew = this.globalData.Url.submitRecentUrl
                var newopenid = this.globalData.openid
                var newSession_key = this.globalData.sessionkey
                console.log(newopenid)
                console.log(newSession_key)
                newSession_key = newSession_key.replace(/ +/g, '%2B')
                newopenid = newopenid.replace(/ +/g, '%2B')
                console.log('准备发送')
                console.log(newopenid)
                console.log(newSession_key)
                var that = this
                this.$axios.post(urlNew,{
                    openid: newopenid,
                    session_key: newSession_key,
                    message: message
                }).then(function (response) {
                    console.log(response);
                    if(response.status=="200"){
                        console.log('成功');
                        that.$toast.success('提交成功！')
                        that.$router.push('/pages/scale')
                    }
                }).catch(function (error) {
                    console.log('失败');
                    console.log(error);
                    that.$toast.success('提交失败！请检查网络')
                    // that.send(message)
                });



                // var urlNew = globalData.Url.submitInfoUrl
                // this.$axios.get(urlNew, {
                //     params: {
                //         ID: 12345
                //     }
                // }).then(function (response) {
                //         console.log(response);
                // }).catch(function (error) {
                //         console.log(error);
                // });
                //
                // var newopenid = app.globalData.openid
                // var newSession_key = app.globalData.session_key
                // newSession_key = newSession_key.replace(/ +/g, '%2B')
                // newopenid = newopenid.replace(/ +/g, '%2B')
                // var that = this
                // ah.request({
                //     //获取openid接口
                //     url: '',
                //     data: {
                //         openid: newopenid,
                //         session_key: newSession_key,
                //         message: message
                //     },
                //     method: 'POST',
                //     success: function (res) {
                //         console.log(res.data)
                //         if (res.data.errorCode == 200) {
                //             this.$router.push('/pages/doctornear')
                //
                //         } else {
                //             //登录过期
                //             if (res.data.errCode != 200) {
                //                 console.log("提交失败")
                //                 //更新openid
                //                 Toast.loading({
                //                     mask: true,
                //                     message: '加载中...',
                //                     duration: 100
                //                 });
                //                 this.send(message)
                //             }
                //         }
                //
                //     },
                // })

            },



            //地址显示
            showCityBottom: function () {
                this.cityBottom=true
            },
            hideCityBottom: function () {
                this.cityBottom=false
            },
            onCancelCity: function () {
                this.hideCityBottom()
            },
            onConfirmCity: function (value) {
                console.log(value)
                var ad = value[0].name + ' ' + value[1].name + ' ' + value[2].name

                this.value= value[0].code
                this.address=ad
                this.hideCityBottom()
                this.onChange(ad)
            },
            //=======================多选
            //数组转字符串
            arrayToString:function(array){
                var returnResult=''
                for(var str in array){
                    returnResult=returnResult+array[str]+', '
                }
                return returnResult
            },
            inputOthers: function (event) {
                console.log("input")
                console.log(event)
                var mesNew = this.saveMes(this.messages, this.questionShowIndex, event)
                this.messages = mesNew
                console.log(this.messages)
            },
            ifOthers: function (event) {
                //这里对于类型是3的题目，是没有用的代码，只有对于类型是2的题目有用
                if (event == "其他" && this.questionShow.type == 3) {
                    console.log("is others")
                    //此时就不要跳转
                    if (this.questionHadAns > this.questionShowIndex) {
                        console.log("回答过了")
                        var ansNew = this.answers;
                        ansNew[this.questionShowIndex] = event.detail

                        this.answers=ansNew
                        //--------

                        this.radio = event.detail
                        console.log(this.answers)
                        var that = this
                        setTimeout(function () {
                            if (that.questionShowIndex == that.questionNum - 2) {
                                this.nextBtnText="完成"
                            }
                            if (that.questionShowIndex == that.questionNum - 1) {
                                //回答完毕
                                console.log("finish")
                                this.nextBtnText="完成"
                            } else {
                                console.log(that.radio)

                            }
                        }, 500)
                        //---------
                    } else {
                        console.log("还没回答过，第一次回答这道题目")
                        this.answers.push(event.detail)

                        this.setData({
                            radio: event.detail
                        })
                        console.log(this.answers)
                        var that1 = this
                        setTimeout(function () {
                            if (that1.questionShowIndex == that1.questionNum - 2) {
                                this.nextBtnText="完成"
                            }
                            if (that1.questionShowIndex == that1.questionNum - 1) {
                                //回答完毕
                                console.log("finish")
                                this.questionHadAns = that1.questionHadAns + 1
                                this.nextBtnText="完成"
                            } else {
                                console.log(that.radio)
                                //如果后面的回答过了
                                this.questionHadAns = that1.questionHadAns + 1
                            }
                        }, 500)

                    }



                    return true
                }
                //此时需要跳转
                return false
            },
            //多选题
            onManyChange:function(event){
                console.log("on many change")
                console.log(event)
                if(event==""){
                    console.log("多选是空的")
                    return;
                }
                console.log(this.questionHadAns + '  ' + this.questionShowIndex + '  ' + (this.questionNum - 1))
                // if(this.manyChooseHasAnswer==false){
                //   this.setData({
                //     questionHadAns: this.questionHadAns + 1,
                //   })
                // }
                if (this.ifOthers(event)) {
                    return
                }
                if (this.questionHadAns > this.questionShowIndex) {
                    console.log("回答过了")
                    var ansNew = this.answers//this.saveManyAnswer(this.manyAnswers,this.questionShowIndex,event.detail)
                    ansNew[this.questionShowIndex] = event
                    console.log(ansNew)

                    this.answers= ansNew
                    this.manyChooseHasAnswer=true

                } else {
                    console.log("还没回答过，第一次回答这道题目")
                    // this.answers.push(event)
                    this.questionHadAns= this.questionHadAns + 1
                }
                console.log(this.answers)
            },

            sendManyQuestionDeal(messages){
                console.log(messages)
                var len = messages.length
                console.log("处理多选题的消息,长度："+len)
                for(var i=0;i<len;i++){
                    var judge = messages[i]
                    if (this.isArray(judge)){
                        messages[i]=this.arrayToString(messages[i])
                    }
                }
                console.log(messages)
                return messages
            },
            isArray:function (obj){
                return obj.constructor == Array
            },
            //需要输入“其他”信息的函数
            addOthersMsgWhenSend: function (msgArrays) {
                var len = this.messages.length
                for (var i = 0; i < len; i++) {
                    if (this.messages[i]!=null && this.messages[i] != " ") {
                        msgArrays[i] = msgArrays[i] + " , " + this.messages[i]
                    }
                }
                console.log(msgArrays)
                return msgArrays
            },
            saveMes: function (mesArrays, index, msg) {
                var len = mesArrays.length
                if (len == 0) {
                    mesArrays = []
                }
                console.log(mesArrays + " " + index + " " + msg + " " + len)
                index = parseInt(index)
                if (index > len - 1) {
                    var p = index - len
                    while (p != 0) {
                        p--
                        mesArrays.push(' ')
                    }
                    mesArrays.push(msg)
                    console.log("mesn")
                    console.log(mesArrays)
                    return mesArrays
                } else {
                    mesArrays[index] = msg
                    return mesArrays
                }
            },

            //其他函数
            backClick: function () {
                var that = this
                this.$dialog.confirm({
                    title: '退出答题',
                    message: '确认要退出答题吗？'
                }).then(() => {
                    // on confirm
                    that.$router.push('/pages/first')
                }).catch(() => {
                    // on cancel
                    console.log('点击取消回调')
                });
                // var that = this;
                // wx.showModal({
                //     title: '退出答题',
                //     content: '确认要退出答题吗？',
                //     success: function (res) {
                //         if (res.confirm) {
                //             console.log('点击确认回调');
                //
                //             var time = setTimeout(function () {
                //                 wx.switchTab({
                //                     url: "/pages/que2/first/first",
                //                     success() {
                //                         var page = getCurrentPages().pop();
                //                         if (page == undefined || page == null) return;
                //
                //                     }
                //                 });
                //             }, 1000)
                //
                //         } else {
                //             console.log('点击取消回调')
                //         }
                //     }
                // })
            },
            readQuestion:function() {
                this.questionShow = this.questions[0]
                console.log(this.questionShow)
                console.log(this.questionNum)
            }
        },
        created() {
            this.readQuestion()
        }
    }
</script>

<style scoped>
    @import "../../assets/css/common.css";
</style>