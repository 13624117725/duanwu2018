<template>
  <div id="app" class="app">
    <div v-show="false">
      <img src="http://img.guoanfamily.com/duanwu/loading.gif" alt="">
    </div>


    <router-view ></router-view>

    <div class="stopmusic" :class="{'music':play}" @click='onPlay'>
      <a id="mc_play" class="on">
        <audio id="music_play_filter" loop="loop" ref="audioplayer">
          <source src="https://img.guoanfamily.com/duanwu/duanwu.mp3" type="audio/mpeg">
        </audio>
      </a>
    </div>
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      play:false,
    }
  },
  methods: {
    onPlay() {
      this.play = !this.play;
      if (this.play) {
        this.$refs.audioplayer.play();
      } else {
        this.$refs.audioplayer.pause();
      }
    }
  },
  created(){
    let SProportion = window.innerHeight/window.innerWidth;
    let Screentyle = ""
    if(SProportion>=1.65){
      Screentyle = "Second"
    }else{
      Screentyle = "First"
    }
    localStorage.setItem("Screentyle",Screentyle)
  },
}
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  overflow: auto;
  height: 100%;
  background-color: #fff;
  -webkit-overflow-scrolling : touch;
}


.stopmusic{
  width: 0.6rem;
  height: 0.6rem;
  position: fixed;
  border-radius: 50%;
  right: 0.4rem;
  top: 0.25rem;
  background: url("../static/img/mcbg.png") no-repeat;
  background-size: 100%;
  background-position: left bottom;
  z-index: 10;
  &.music {
    background-position: left top;
    animation: rotataZ 1.2s linear infinite;
  }
}
@keyframes reverseRotataZ {
0% {
-webkit-transform: rotateZ(0deg);
}
100% {
-webkit-transform: rotateZ(-360deg);
}
}
@keyframes rotataZ {
0% {
-webkit-transform: rotateZ(0deg);
}
100% {
-webkit-transform: rotateZ(360deg);
}
}
</style>
