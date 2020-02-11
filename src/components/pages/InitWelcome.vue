<template>
    <div>
        <span>
            登录中。。。
        </span>
    </div>
</template>

<script>
    import globalData from "../../assets/js/commom";
    export default {
        name: "InitWelcome",
        data(){

        },
        created() {
            window.location.href =globalData.Url.wechatInitUrl
            // this.$axios.get(globalData.Url.wechatInitUrl)
            // .then(function (response) {
            //     console.log(response)
            //     alert(response)
            // })
            // .catch(function (error) {
            //     console.log(error)
            //     alert(error)
            // })
        }
    }
</script>

<style scoped>

</style>

