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
                        <div class=' line1 questionTitle'>基本信息</div>
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
                            <div v-if="questionShow.type==2">
                                <van-radio-group v-model="radio" v-on:change="onChange">
                                    <div v-for="item in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-radio icon-size="28px" :name="item.answer" label-class="answertext">
                                            {{item.answer}}
                                        </van-radio>
                                    </div>
                                    <div class="input-clsss">
                                        <van-cell-group>
                                            <van-field  v-model="messages[questionShowIndex]" type="textarea" placeholder="选择本选项时请输入" autosize  v-bind:input="inputOthers" id="questionShowIndex" />
                                        </van-cell-group>
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
                            <div v-if="questionShow.type==9">
                                <van-radio-group v-model="radio" v-on:change="onChange">
                                    <div v-for="(item,index) in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-radio icon-size="28px" :name="item.answer" label-class="answertext">
                                            {{item.answer}}
                                        </van-radio>
                                        <div class="input-clsss" v-if="index==0" style="margin-top: 20px;">
                                            <van-cell-group>
                                                <van-field  v-model="messages[questionShowIndex]" type="textarea" placeholder="选择本选项时请输入" autosize  v-bind:input="inputOthers" id="questionShowIndex" />
                                            </van-cell-group>
                                        </div>
                                    </div>

                                </van-radio-group>

                            </div>

                            <div v-if="questionShow.type==10">
                                <van-radio-group v-model="radio" v-on:change="onChange">
                                    <div v-for="(item,index) in questionShow.answers" class="answer-css" v-bind:key="item.answer">
                                        <van-radio icon-size="28px" :name="item.answer" label-class="answertext">
                                            {{item.answer}}
                                        </van-radio>
                                        <div class="input-clsss" v-if="index==5" style="margin-top: 20px;">
                                            <van-cell-group>
                                                <van-field  v-model="messages[questionShowIndex]" type="textarea" placeholder="选择本选项时请输入" autosize  v-bind:input="inputOthers" id="questionShowIndex" />
                                            </van-cell-group>
                                        </div>
                                        <div class="input-clsss" v-if="index ==6" style="margin-top: 20px;">
                                            <van-cell-group>
                                                <van-field  v-model="messages[questionShowIndex+1]" type="textarea" placeholder="选择本选项时请输入" autosize  v-bind:input="inputOthers" id="questionShowIndex" />
                                            </van-cell-group>
                                        </div>
                                    </div>

                                </van-radio-group>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div class="warn-text" v-if="questionShowIndex == questionNum - 1">
                <span >* 基本信息回答完毕，请点击提交</span>
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
    import questionsOut from '../../../assets/js/queDoctor.js'
    // import Qs from 'qs'

    export default {
        name: "doctorinfo",
        data(){
            return{

                radio: '',
                nation:'',
                bottom: false,
                scaleTitle: '问卷调查',
                scaleBrief: '问卷调查',
                nextBtnText: "下一题",
                curScaleIndex: 3,//当前正在做的问卷序号
                questionHadAns: 0,
                questionShowIndex: 0,
                questionNum: questionsOut.doctorinfos.qNum,
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
                questions: questionsOut.doctorinfos.questions,
                answers: [],
                nationOption: ["汉族",
                    "蒙古族",
                    "藏族",
                    "苗族",
                    "壮族",
                    "回族",
                    "维吾尔族",
                    "彝族",
                    "布依族",
                    "朝鲜族",
                    "侗族",
                    "白族",
                    "哈尼族",
                    "傣族",
                    "傈僳族",
                    "畲族",
                    "拉祜族",
                    "满族",
                    "瑶族",
                    "土家族",
                    "哈萨克族",
                    "黎族",
                    "佤族",
                    "高山族",
                    "水族",
                    "东乡族",
                    "景颇族",
                    "土族",
                    "仫佬族",
                    "布朗族",
                    "毛南族",
                    "锡伯族",
                    "普米族",
                    "纳西族",
                    "柯尔克孜族",
                    "达斡尔族",
                    "羌族",
                    "撒拉族",
                    "仡佬族",
                    "阿昌族",
                    "塔吉克族",
                    "怒族",
                    "俄罗斯族",
                    "德昂族",
                    "裕固族",
                    "塔塔尔族",
                    "鄂伦春族",
                    "门巴族",
                    "基诺族",
                    "乌孜别克族",
                    "鄂温克族",
                    "保安族",
                    "京族",
                    "独龙族",
                    "赫哲族",
                    "珞巴族"],

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
                    if(dataMsg=="其他"||dataMsg=="其他普通病房或门诊（请填写具体科室）"||dataMsg=="其他（如管理、后勤等）"
                        ||dataMsg=="是，请填写您目前工作单位" || dataMsg == "否（请选择大众版）"){
                        console.log("选择其他");
                        this.questionHadAns= this.questionHadAns + 1
                        if(dataMsg == "否（请选择大众版）"){
                            var thatToast = this
                            this.$dialog.confirm({
                                title: '更改答题',
                                message: '确认要跳转到‘大众版’问卷吗？'
                            }).then(() => {
                                // on confirm
                                thatToast.$router.push('/pages/firstV3')
                            }).catch(() => {
                                // on cancel
                                console.log('点击取消回调')
                            });
                        }
                        return;
                    }

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
                    console.log(this.questions[this.questionShowIndex])
                    this.nextBtnText= "下一题"
                    this.questionShow= this.questions[this.questionShowIndex - 1]
                    this.radio= this.answers[this.questionShowIndex - 1]
                    this.questionShowIndex= this.questionShowIndex - 1
                } else {
                    console.log("first one")
                }
            },
            clickBtnNext() {
                if(this.radio == "否（请选择大众版）"){
                    var thatToast = this
                    this.$dialog.confirm({
                        title: '更改答题',
                        message: '确认要跳转到‘大众版’问卷吗？'
                    }).then(() => {
                        // on confirm
                        thatToast.$router.push('/pages/first')
                    }).catch(() => {
                        // on cancel
                        console.log('点击取消回调')
                    });
                    return
                }
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
                console.log(message)
                // this.$router.push('/pages/doctornear')
                message = this.addOthersMsgWhenSend(message)
                var urlNew = this.globalData.Url.submitInfoUrl
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
                    if(response.status=="200"){
                        console.log('成功');
                        console.log(response);
                        that.$toast.success('提交成功！')
                        that.$router.push('/pages/doctornearV2')
                    }
                }).catch(function (error) {
                    console.log('失败');
                    console.log(error);
                    that.$toast.success('提交失败！请检查网络')
                    // that.send(message)
                });

                // var that = this
                //
                //
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

            //民族显示
            showBottom:function() {
                this.bottom=true
            },
            hideBottom:function() {
                this.bottom=false
            },
            onCancelNation:function(){
                this.hideBottom()
            },
            onConfirmNation: function (value) {
                console.log(value)
                this.nation = value
                this.hideBottom()
                this.onChange(value)
            },

            inputOthers: function (event) {
                console.log("input")
                console.log(event)
                var mesNew = this.saveMes(this.messages, this.questionShowIndex, event)
                this.messages = mesNew
                console.log(this.messages)
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

            //需要输入“其他”信息的函数
            addOthersMsgWhenSend: function (msgArrays) {
                var len = this.messages.length
                for (var i = 0; i < len; i++) {
                    if (this.messages[i]!=null && this.messages[i] != " ") {
                        if(i==(this.questionNum-1)){
                            msgArrays[i-1] = msgArrays[i-1] + " | " + this.messages[i]
                        }else{
                            msgArrays[i] = msgArrays[i] + " | " + this.messages[i]
                        }
                    }
                }
                console.log(msgArrays)
                return msgArrays
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
    @import "../../../assets/css/common.css";
</style>