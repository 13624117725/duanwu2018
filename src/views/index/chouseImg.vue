<template>
   <div class="chouseImg"  :class="{shown:shown}">

   </div>
</template>

<script>
   export default {
       data() {
           return {
               shown:false,
           }

       },
       components: {

       },
       mounted(){
           let timer0 = setTimeout(()=>{
               this.shown = true;
           },100)
       }
   }
</script>

<style scoped lang="less">
.chouseImg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    background:url("../../assets/img/images/chouseImg.jpg") center no-repeat;
    background-size: 100%;
    &.shown{
        opacity: 1;
        transition: opacity 0.8s linear;
    }
}

</style>
