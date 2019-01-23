<template>
 <!-- :class="{chouseOnePluss:Screentyle=='Second'}" -->
    <div class="chouseOne">
        <div v-show="false">
            <img src="http://img.guoanfamily.com/duanwu/1-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/2-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/3-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/4-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/5-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/6-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/7-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/8-1-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/1-01.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/1-02.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/2-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/2-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/3-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/4-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/5-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/6-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/7-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/8-1.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/3-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/4-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/5-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/6-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/7-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/8-2.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/b01.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/b02.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/b03.png" alt="">
            <img src="http://img.guoanfamily.com/duanwu/b04.png" alt="">

        </div>
        <div class="chousePlaces">
            <div class="chouseresult">
                <!-- 包进去的馅 -->
                <div class="result" :class="{result2:item.val>3}" v-for="(item,index) in GarnishDataArr" :key="index" :style="item.sty" @click="Toremove(item,index)">
                </div>
            </div>
            <div class="Garnish" v-for="(item,index) in chouseData" :key="index" :style="item.sty" @click="AddGarnish(item,index)">
                <!-- <span class="titleName" :style="item.name.sty">{{item.name.val}}</span> -->
                <div v-if="GarnishValArr.indexOf(item.val)!=-1" class="Garnish_box" :style="`background:url('${item.newurl}') center no-repeat; background-size:100% 100%;` "></div>
                <div v-else class="Garnish_box" :style="`background:url('${item.url}') center no-repeat;background-size:contain;` "></div>
            </div>
            <!-- 运动的盒子 -->
            <div class="Garnish Garnish2" :class="{moved:(tomoved&&GarnishData.left),moved2:(tomoved&&!GarnishData.left)}" v-if="moveshow" :style="GarnishData.sty">
                <div class="Garnish_box" :style="` background:url('${GarnishData.mvurl}') center no-repeat;background-size:contain;` "></div>
            </div>
        </div>
        <!-- 粽子叶 -->
        <div class="skin_box">
            <span class="skin" :class="{choused:index==skinIndex}" v-for="(item,index) in skinArr" :key="index" @click="skinClick(item)">
                <span class="skinOpaction" v-show="index==skinIndex"  :style="`background: url('${item.NewUrl}')  center  no-repeat; background-size:80%;`"></span>
                <span  class="skinOpaction"  v-show="index!=skinIndex"  :style="`background: url('${item.url}')  center  no-repeat; background-size:80%;`"></span>
            </span>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                // 开始添加陷
                beginAdd:false,
                Screentyle:false,
                moveshow:false,//点击的结果显示
                tomoved:false,
                GarnishData:{},//点击的结果
                GarnishDataArr:[],//结果
                GarnishValArr:[],//馅结果

                chouseData:[
                    {
                        url:"http://img.guoanfamily.com/duanwu/1-01.png",
                        newurl:"http://img.guoanfamily.com/duanwu/1-02.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/1-1-1.png",
                        sty:"top:35px;left:23%;",
                        bleong:"A",

                        val:0
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/2-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/2-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/2-1-1.png",
                        sty:"top:110px;left:12%;",
                        bleong:"A",

                        val:1
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/3-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/3-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/3-1-1.png",
                        sty:"top:185px;left:12%;",
                        bleong:"B",
                        name:{
                            val:"蜜枣",
                            sty:"left:-80%"
                        },
                        val:2
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/4-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/4-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/4-1-1.png",
                        sty:"top:260px;left:23%;",
                        bleong:"B",

                        val:3
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/5-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/5-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/5-1-1.png",
                        sty:"top:35px;right:23%;",
                        bleong:"B",

                        val:4
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/6-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/6-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/6-1-1.png",
                        sty:"top:110px;right:12%;",
                       bleong:"A",
                        val:5
                    }, {
                         url:"http://img.guoanfamily.com/duanwu/7-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/7-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/7-1-1.png",
                        sty:"top:185px;right:12%;",
                        bleong:"B",
                        val:6
                    }, {
                        url:"http://img.guoanfamily.com/duanwu/8-1.png",
                        newurl:"http://img.guoanfamily.com/duanwu/8-2.png",
                        mvurl:"http://img.guoanfamily.com/duanwu/8-1-1.png",
                        sty:"top:260px;right:23%;",
                        bleong:"A",
                        val:7
                    }
                ],
                skinArr:[
                    {
                        url:"http://img.guoanfamily.com/duanwu/b11.png",
                        NewUrl:"http://img.guoanfamily.com/duanwu/b01.png",
                        value:0
                    },
                     {
                        url:"http://img.guoanfamily.com/duanwu/b12.png",
                        NewUrl:"http://img.guoanfamily.com/duanwu/b02.png",
                        value:1
                    },
                     {
                        url:"http://img.guoanfamily.com/duanwu/b13.png",
                        NewUrl:"http://img.guoanfamily.com/duanwu/b03.png",
                        value:2
                    },
                     {
                        url:"http://img.guoanfamily.com/duanwu/b14.png",
                        NewUrl:"http://img.guoanfamily.com/duanwu/b04.png",
                        value:3
                    }
                ],
                skinIndex:1000,
                result:[],//选择的结果
                showOpaction:[],//决定高亮项
            }

        },
        methods:{
            // 处理选择结果
            chouseOpact(its){
                let index = this.showOpaction.indexOf(its.value)
                if(index==-1){
                    if(this.showOpaction.length>=3){
                        return false
                    }
                    this.showOpaction.push(its.value);
                    index = this.showOpaction.indexOf(its.value);
                    this.result[index] = its.From;
                }else{
                    this.showOpaction.splice(index,1);
                    this.result.splice(index,1);
                }
                this.$emit('ChouseRes',this.result)
            },
            Toremove(item,index){
                this.chouseData.forEach(its=>{
                    if(item.val==its.val){

                        item.sty=`${its.sty} background:url('${its.mvurl}') center no-repeat; background-size:cotain; transform:translateX(0) ;transition: all .4s linear;`
                    }
                })
                var timer6 = setTimeout(()=>{
                    this.GarnishDataArr.splice(index,1);
                     this.$emit('ChouseRes',this.GarnishDataArr,2);
                    this.GarnishValArr.splice(index,1);

                    window.clearTimeout(timer6)
                },500)
                if(this.GarnishDataArr.length==2&&index==0){
                    let its= this.GarnishDataArr[1];
                    var timer7 = setTimeout(()=>{
                        if(its.val<=3){
                            its.sty = `top:100px; left:50%; background:url('${its.mvurl}') center no-repeat; background-size:contain;`
                        }else{
                            its.sty = `top:100px; right:50%; background:url('${its.mvurl}') center no-repeat; background-size:contain;`
                        }
                        // its.sty = `${its.sty}background:url('${its.url}') center no-repeat; background-size:110%;transform:translateX(0) ;transition: all .4s linear;`
                    },200)
                }

                // item.sty=''
            },
            onSwipeLeft(data){

            },
            skinClick(item){
                this.skinIndex = item.value;
                this.$emit("ChouseRes",this.skinIndex,1)


            },
            AddGarnish(item,index){
                if(this.beginAdd){
                    return false;
                }
                if(this.GarnishDataArr.length==2){
                    return false;
                }

                this.beginAdd = true;

                this.tomoved = this.moveshow =false;

                this.GarnishData={};


                Object.assign(this.GarnishData,item);
                this.moveshow =  true;
                this.GarnishValArr.push(item.val);
                this.$emit('ChouseRes',this.GarnishValArr,2);

                let timer4=setTimeout(()=>{
                    if(index<=3){
                        if(this.GarnishDataArr.length==0){
                            this.GarnishData.sty=`top:85px;left:50%;`;
                            this.GarnishData.left = true;
                        }else if(this.GarnishDataArr.length==1){
                            this.GarnishData.sty=`top:185px;left:50%;`;
                            this.GarnishData.left = true;
                        }
                    }else{
                        if(this.GarnishDataArr.length==0){
                            this.GarnishData.sty=`top:85px;right:50%;`;
                            this.GarnishData.left = false;

                        }else if(this.GarnishDataArr.length==1){
                            this.GarnishData.sty=`top:185px;right:50%;`;
                            this.GarnishData.left = false;
                        }
                    }

                    this.tomoved = this.moveshow;
                    window.clearTimeout(timer4)
                },100)

                // 过度结束
                let timer5=setTimeout(()=>{
                    this.moveshow = this.tomoved = false;
                    let obj = {}
                    Object.assign(obj,item)
                    if(this.GarnishDataArr.length==0){
                        if(item.val<=3){
                            obj.sty=`top:85px;left:50%;background:url('${item.mvurl}') center no-repeat; background-size:contain;`
                        }else{
                            obj.sty=`top:85px;right:50%;background:url('${item.mvurl}') center no-repeat; background-size:contain;`

                        }
                    }else if(this.GarnishDataArr.length==1){
                        if(item.val<=3){
                            obj.sty=`top:185px;left:50%;background:url('${item.mvurl}') center no-repeat; background-size:contain;`
                        }else{
                            obj.sty=`top:185px;right:50%;background:url('${item.mvurl}') center no-repeat; background-size:contain;`

                        }
                    }
                    this.beginAdd = false
                    this.GarnishDataArr.push(obj);
                    this.$emit('ChouseRes',this.GarnishDataArr,2);
                    window.clearTimeout(timer5)
                },510)

            }
        },
        mounted(){
            // this.Screentyle = localStorage.getItem("Screentyle");
        }
   }
</script>

<style scoped lang="less">

.chouseOne{
    width: 100%;
    height: 100%;
    padding: 15px;
    background: url("http://img.guoanfamily.com/duanwu/Chouse.jpg")  center no-repeat;
    background-size:cover;
    // &.chouseOnePluss{
    //     background: url("../../assets/img/1420bg/Chouse.png")  center no-repeat;
    //     background-size:contain;
    //     .topic{
    //         margin-top: .8rem;
    //     }
    // }
    *{
        font-size: 14px;
    }
    .topic{
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-top: .3rem;

        border:3px solid green;
    }
    .chousePlaces{
        height: 350px;
        width: 100%;
        position: relative;
        margin-top: 0.7rem;
        padding: 20px;
        .chouseresult{
            height: 100%;
            margin: 0 auto;
            width: 40%;
            background:url("http://img.guoanfamily.com/duanwu/Bigskin.png") center no-repeat;
            background-size: contain;
            .result{
                width: 78px;
                height:  78px;
                position: absolute;
                z-index: 100;
                transform: translateX(-50%);
            }
            .result2{
                width: 78px;
                height: 78px;
                position: absolute;
                z-index: 100;
                transform: translateX(50%);
            }
        }
        .Garnish{
            position: absolute;
            width: 60px;
            height: 60px;
            &.Garnish2{
                width: 78px;
                height: 78px;
            }
            // background-color: blue;
            .Garnish_box{
                width: 100%;
                height: 100%;
            }
            &.moved{
                transform: translateX(-50%);
                transition: all .4s linear
            }
            &.moved2{
                transform: translateX(50%);
                transition: all .4s linear
            }
            .titleName{
                position: absolute;
                top:5px;
                padding : 0 5px;
                height: 20px;
                line-height: 20px;
                color: #fff;
                border-radius: 10px;
                background-color: rgba(0,0,0,0.4);
            }
        }
    }
    .skin_box{
        height: 100px;
        width: 100%;
        padding: 15px;
        background:url("http://img.guoanfamily.com/duanwu/bottomBar.png");
        background-size: 100% 100%;
        .skin{
            float: left;
            block-size: border-box;
            width: 25%;
            height: 100%;
            &.choused{
                background-size: 90%;
            }
            .skinOpaction{
                height: 100%;
                width: 100%;
                background-size: 90%;
                display: block;
            }
        }
    }
}

</style>
