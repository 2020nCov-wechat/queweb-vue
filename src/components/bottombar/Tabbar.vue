<template>
    <div class="tabberWarp" >
        <div class="warp">
            <Item :txt='item.txt' :page='item.page' @change='getVal' v-for='item in tabbarDes' :sel='selected' :key="item.txt">

                <img :src="item.normalImg" slot='normalImg'>
                <img :src="item.activeImg" slot='activeImg'>
            </Item>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Item from '@/components/bottombar/Item.vue'
    export default{
        components:{
            Item
        },
        data:function(){
            return{
                selected:'skin',
                tabbarDes:[
                    {
                        txt:'心理评估',
                        page:'pages/first',
                        normalImg:require('../../assets/imgs/bar/first1.png'),
                        activeImg:require('../../assets/imgs/bar/first.png')

                    },
                    {
                        txt:'干预',
                        page:'pages/doctornear',
                        // page:'pages/scale',
                        normalImg:require('../../assets/imgs/bar/intervene1.png'),
                        activeImg:require('../../assets/imgs/bar/intervene.png')
                    },
                    {
                        txt:'我的',
                        page:'pages/my',
                        normalImg:require('../../assets/imgs/bar/my1.png'),
                        activeImg:require('../../assets/imgs/bar/my.png')
                    }
                ]
            }
        },
        methods:{
            getVal:function(res){
                this.selected = res;
            }
        }
    }
</script>
<style type="text/css">
    .warp{
        width: 100%;
        border-top: 1px solid #eee;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0;
    }
    .warp img{
        width: 20px;
        height: 20px;
    }
    .tabberWarp img{
        margin-top: 10px;
        margin-bottom: 5px;

    }
    .tabberWarp{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 60px;
        width: 100%;
        padding-bottom: 5px;
        background: #fff;
    }
</style>