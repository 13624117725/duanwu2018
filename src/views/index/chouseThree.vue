<template>
    <div class="chouseThree">
        <CreatedShopPoster
            v-if="canvasIsShow"
            :cardData='cardData'
            :bgcImg="bgcImg"
            @makeImg="makeImg"
        >
        </CreatedShopPoster>
        <img class="imgsize" v-if="imgUrl" :src="imgUrl" alt="">
    </div>
</template>
<script>
import CreatedShopPoster from "../../components/CreateSnapshot/CreatedShopPoster"
import { setTimeout } from 'timers';
export default {
    props:["chouseArr"],
    data() {
        return {
            cardData:{},
            bgcImg:"https://img.guoanfamily.com/f1aa08d6-50d1-4a0e-a9ae-b4caa0c7dd2d.jpg",
            imgUrl:"",
            canvasIsShow:false,
            cardDataArr:[
                {
                    typeName:"天马行空型",
                    msg:"献给爸爸独一无二的爱，虽然口味有点怪~",
                    erWeiMaData:"123"
                },{
                    typeName:"社会人型",
                    msg:"爸爸坚硬的外表下，还有一颗天真的心~",
                    erWeiMaData:"123"
                },{
                    typeName:"古灵精怪型",
                    msg:"给平凡生活加点料，这个父亲节有点不一样~",
                    erWeiMaData:"123"
                },{
                    typeName:"循规蹈矩型",
                    msg:"抓起手机，给爸爸说一声：父亲节快乐！",
                    erWeiMaData:"123"
                }
            ]
            // NumOfA:0//A选项的个数
        }

    },
    mounted(){
        this.MakeCardData(this.chouseArr);

    },
    methods:{
        makeImg(url){
            this.imgUrl = url
        },
        // 判断chouseArr的选项结构
        MakeCardData(arr){
            let NumOfA = 0;
            arr.forEach(item => {
                if(item=="A"){
                    NumOfA++;
                }
            });
            console.log(NumOfA)
            this.cardData = this.cardDataArr[NumOfA];
            console.log(123,this.cardData)
            let timer2= setTimeout(()=>{
                this.canvasIsShow = true;
                window.clearTimeout(timer2);
            },0)
        }

    },
    components: {
        CreatedShopPoster
    }
}
</script>
<style scoped lang="less">
.imgsize{
    width: 100%;
    height: 100%;
}

</style>
