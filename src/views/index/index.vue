<template>

   <div class="index">
      <!-- :class="{bgImg:Screentyle=='Second'}"  -->
     <div class="bgImg_box" :class="{shown:shown}" @click="Tonext">

       <!-- <button class="begain" @click="Tonext">准 备</button> -->
     </div>
   </div>
</template>

<script>
  export default {
    data() {
        return {
          // Screentyle:""
          shown:false,
        }

    },
    mounted(){
      let timer1 =  setTimeout(()=>{
        this.shown = true;
      },100)

      // this.Screentyle = localStorage.getItem("Screentyle");
    },
    methods:{
      Tonext(){
        this.$router.replace({name:"first"})
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="less">
.index{
   width: 100%;
  height: 100%;
  position: relative;
}
.bgImg_box{
  opacity: 0;
  width: 100%;
  height: 100%;
  background: url("http://img.guoanfamily.com/duanwu/indexbg.jpg") center no-repeat;
  background-size: 100%;
  &.shown{
    opacity: 1;
    transition: opacity 0.8s linear;
  }
  // &.bgImg{
  //   background: url("../../assets/img/1420bg/indexbg.jpg") center no-repeat;
  //   background-size: 100%;
  // }
  .begain{
    width: 100px;
    height: 40px;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>
