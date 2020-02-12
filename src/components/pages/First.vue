<template>
    <div class='user'>
        <div class='header bg-color acea-row row-between-wrapper-first '>
            <div class='header-have-arrow'>
                <div class="header-out-style">
                    <div class='picTxt acea-row row-between-wrapper header-display '>
                        <div class='text'>
                            <div class='acea-row row-middle name-css'>
                                <div class='titlehead'>2019-nCov心理健康评估</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class='wrapper'>

            <div class='nav acea-row row-middle title-padding'>
                <div v-for="item in hello" v-bind:key="item.content">
                    <div v-html="item.content" class="hellotext">{{item.content}}</div>
                </div>
            </div>
            <div class="item_list">
                <div class='myService'>
                    <div class='title acea-row row-middle title-height'>
                        <span class="question-css">1.您是医护人员吗？</span></div>
                    <div class='serviceList acea-row row-middle'>

                        <div class="suggess-css">
                            <van-radio-group v-model="radio" >
                                <div class="answer-css">
                                    <van-radio name="是的" icon-size="28px" label-class="answertext"  v-on:click="onChange(1)">是的</van-radio>
                                </div>
                                <div class="answer-css">
                                    <van-radio name="不是" icon-size="28px" label-class="answertext"  v-on:click="onChange(2)">不是</van-radio>
                                </div>
                            </van-radio-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


<script>
    export default {

        name: "first",
        data(){
            return{
                radio:1,
                hello:[
                    {
                        content:'尊敬的一线医务工作者：',
                    },
                    {
                        content:'&nbsp;&nbsp;&nbsp;&nbsp;您好，首先感谢您为抗击新型冠状病毒肺炎做出的巨大贡献！',
                    },
                    {
                        content:'&nbsp;&nbsp;&nbsp;&nbsp;病毒无情人有情。您在抗击新型冠状病毒时，我们也在关心着您的心理健康。本次问卷旨在为抗击新型冠状病毒中一线医务工作者提供心理健康评估，并依据结果为您提供个体化心理支持及干预方案，与您携手共度难关！',
                    },
                    {
                        content:'&nbsp;&nbsp;&nbsp;&nbsp;本次调查问卷由武汉大学人民医院精神卫生中心、浙江大学医学院附属第一医院精神卫生中心、西安交通大学第一附属医院精神心理科、北京大学第六医院、华中科技大学计算机学院相关研究团队设计，为匿名问卷，请您按照您的情况如实填写，提交问卷后会有一个初步的报告供参考。您可以在任何时候中止或退出本次问卷调研。',
                    },
                    {
                        content:'&nbsp;&nbsp;&nbsp;&nbsp;谢谢！',
                    },
                ]
            }
        },
        methods:{
            onChange:function(data){
                console.log(data)
                var that = this
                setTimeout(function () {
                    if(data==1){
                        that.$router.push('/pages/doctorinfo')
                    }else if(data==2){
                        that.$router.push('/pages/userinfo')
                    }
                },500)
            },

            GetUrlParam(paraName) {
                var url = window.location.toString();
                var arrObj = url.split("?");

                if (arrObj.length > 1) {
                    var arrPara = arrObj[1].split("&");
                    var arr;

                    for (var i = 0; i < arrPara.length; i++) {
                        arr = arrPara[i].split("=");

                        if (arr != null && arr[0] == paraName) {
                            return arr[1];
                        }
                    }
                    return "";
                }
                else {
                    return "";
                }
            }
        },
        created() {
            var openid =  this.GetUrlParam('openid')
            var sessionkey = this.GetUrlParam('sessionkey')
            var doctortype = this.GetUrlParam('doctortype')
            console.log(openid)
            console.log(sessionkey)
            console.log(doctortype)
            if(openid == null || openid==""){
                window.location.href =this.globalData.Url.wechatInitUrl
            }else{
                // this.openid=openid
                // this.sessionkey=sessionkey
                this.globalData.openid = openid
                this.globalData.sessionkey = sessionkey
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/common.css";
</style>