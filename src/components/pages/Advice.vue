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
                        <div class=' line1 questionTitle'>{{title}}</div>
                    </div>
                </div>
            </div>
            <text class='iconfont icon-shezhi' data-url='/pages/user_info/index' bindtap='goPages'></text>
        </div>
        <div class='wrapper'>

            <div class="item_list">
                <div class='myService'>
                    <div class='title acea-row row-middle title-height'>
                        <span class="question-css">{{question}}</span>
                    </div>
                    <div class='serviceList acea-row row-middle'>
                        <div class="suggess-css">
                                <div class="input-clsss">
                                    <van-cell-group>
                                        <van-field  v-model="answer" type="textarea" placeholder="可不填" autosize id="questionShowIndex" />
                                    </van-cell-group>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 最后一题 -->
            <div class="warn-text">
                <span >* 疫情真实感受回答完毕，请点击提交</span>
            </div>

            <div class="btn-bottom">
                <div class="btn-css">
                    <van-button color="#1296DB" type="primary" custom-class="btn-small" size="normal" v-on:click="clickBtnNext">提交</van-button>
                </div>
            </div>
        </div>
        <van-toast id="van-toast" />
    </div>

</template>


<script>
    export default {
        name: "Advice",
        data(){
            return{
                title:'真实感受',
                question:'请简单描述您对本次疫情的真实感受：',
                answer:''
            }
        },
        methods:{
            inputOthers:function (event) {
                console.log(event)
            },
            clickBtnNext:function () {
                this.send(this.answer)
            },
            //发送信息
            send: function (message) {
                // this.$router.push('/pages/doctornear')
                console.log('发送的数据：')
                console.log(message)

                var urlNew = this.globalData.Url.submitScale
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
                    questionNaire: 1000,
                    answers: [],
                    text:message
                }).then(function (response) {
                    console.log('成功');
                    if(response.status=="200"){
                        console.log(response);
                        that.$toast.success('提交成功！')
                        that.$router.push('/pages/my')
                    }
                }).catch(function (error) {
                    console.log('失败');
                    console.log(error);
                    that.$toast.success('提交失败！请检查网络')
                    // that.send(message)
                });
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
        }
    }
</script>

<style scoped>
    @import "../../assets/css/common.css";
</style>