<template>
  <div class="Firstpage" :class="{shown:shown}">
    <template>
      <chouseOne @ChouseRes="ChouseRes" class="page" :class="{active:pageShow==0,showed:pageNum==0}"></chouseOne>
      <chouseTwo  class="page" v-if="pageShow==1" :class="{active:pageShow==1,showed:pageNum==1}"></chouseTwo>
      <chouseThree v-if="pageShow==2" :chouseArr="chouseArr"  class="page" :class="{active:pageShow==2,showed:pageNum==2}"></chouseThree>
    </template>
    <div class="mask" v-show="maskShow">
       <!--  -->

      <img src="http://img.guoanfamily.com/duanwu/loading.gif" alt="">
    </div>
    <div class="btn" :class="{btnPluss:Screentyle=='Second'}" v-if="pageShow==0"  @click="chouseNum"></div>

  </div>
</template>

<script>

  import chouseOne from './chouseOne.vue';
  import chouseTwo from './chouseTwo.vue';
  import chouseThree from './chouseThree.vue';
  import { setTimeout } from 'timers';
  chouseOne
  export default {
    data() {
      return {
          Screentyle:"First",
          pageOneData:{
            GarnishValArr:[],
            skinIndex:10000
          },//第一页的选择结果
          maskShow:false,
          btnDown:false,
          pageNum:0,
          pageShow:0,
          Zindex:1,
          chouseArr:[],
          shown:false,
      }

    },
    components: {
      chouseOne,
      chouseTwo,
      chouseThree
    },
    mounted(){
      this.Screentyle = localStorage.getItem("Screentyle")
      let timer0 = setTimeout(()=>{
        this.shown = true;
      },100)

    },
    methods:{
        Totouchstart(){

        },
      chouseNum(){
        // 进行数据判断
        if(this.pageOneData.GarnishValArr.length<2){
          this.$vux.toast.show({
            type: "text",
            text: "两种馅的粽子才够美味！"
          });
          return false;
        }
        if(this.pageOneData.skinIndex==10000){
          this.$vux.toast.show({
            type: "text",
            text: "请选择你喜欢的粽子外形！"
          });
          return false;
        }
        let pageOneData = JSON.stringify(this.pageOneData)
        sessionStorage.setItem("pageOneData",pageOneData)
        this.maskShow = true;
        let timer1= setTimeout(()=>{
          this.pageShow++;
          window.clearTimeout(timer1)
        },80)
        let timer9= setTimeout(()=>{
           this.pageNum=this.pageShow;
          window.clearTimeout(timer9)
        },300);
        let timer2= setTimeout(()=>{
           this.maskShow = false;
          window.clearTimeout(timer2)
        },2080);

      },
      // 暴露选择结果
      ChouseRes(data,n){
        if(n==1){
          this.pageOneData.skinIndex = data;
        }else{
          this.pageOneData.GarnishValArr = data
        };
      }
    }
  }
</script>

<style scoped lang="less">
.Firstpage{
  opacity: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.shown{
    opacity: 1;
     transition: opacity 0.8s linear;
  }
  .btn{
    width: 50%;
    height: 1rem;
    font-size: 0.4rem;
    color: #fff;
    line-height: 1rem;
    text-align: center;
    position: absolute;
    bottom: 25px;
    left: 50%;
    background: url("http://img.guoanfamily.com/duanwu/btn/submit.png") center no-repeat;
    background-size: 100%;
    transform: translateX(-50%);
    &.btnPluss{
      bottom: 120px;
    }
  }
  .swiperTyp,
  .swiper_slideTyp{
    height: 100%;
    width: 100%;
  }
  .page{
    opacity: 0;
    display: none;
    &.active{
      display: block;
    }
    &.showed{
      opacity: 1;
      transition: opacity 0.6s linear;
    }
  }
  .mask{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
    //   background:url("../../assets/img/images/Wait.gif") center no-repeat;
      background-color: rgba(185,196,200,.8);
      z-index: 200;
      img{
        width: 80%;
        margin-top: 220px;
      }
  }
}

</style>
