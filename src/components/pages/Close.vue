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

            <div class="item_list" >
                <div class='nav acea-row row-middle title-padding'>
                    <div class='title acea-row row-middle title-height'>

                        <div class='acea-row row-middle'>
                            <div class="article-title">
                                <span>非常抱歉，您的某些条件不符合本次调查要求，感谢您的参与！</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Close",
        methods:{
            setTime:function() //设置定时器
            {
                this.clearTimeSet=setInterval(() => {
                    this.webSocketClientOnopen();
                }, 3000);
            },
            clearTime:function() //清除定时器
            {
                clearInterval(this.clearTimeSet);
            }
        },
        mounted : function () //页面加载完毕就开始加载定时器
        {
            this.setTime();
        },

        beforeDestroy() {    //页面关闭时清除定时器
            clearInterval(this.clearTimeSet);
        },

    }
</script>

<style scoped>

</style>