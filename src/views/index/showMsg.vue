<template>
   <div class="showMsg">
     <div class="bgImg">

       <button class="begain" @click="Tonext">开始游戏</button>
     </div>
   </div>
</template>

<script>
  export default {
    data() {
        return {

        }

    },
    methods:{
      Tonext(){
        this.$router.push({name:"first"})
      }
    },
    components: {

    }
  }
</script>

<style scoped lang="less">
.showMsg{
   width: 100%;
  height: 100%;
  position: relative;
}
.bgImg{
  width: 100%;
  height: 100%;
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
