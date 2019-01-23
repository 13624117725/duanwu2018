<style scoped lang="less">
.block {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(#bfbbb5, #bfbbb5);

  .picture {
    width: 100%;
  }

  .save,
  .re-choose {
    position: fixed;
    bottom: 60px;
    width: 20%;
    height: 40px;
    left: 55%;
    z-index: 3;
    background: #72a432;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    -webkit-appearance: none;
  }
  .re-choose1{
    bottom: 100px;
  }
  .re-choose {
    left: 25%;
    text-align: center;
    line-height: 40px;

    .choose-image {
      position: absolute;
      top: 0;
      left:0;
      width: 100%;
      left: 0;
      height: 100%;
      opacity: 0;
    }
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -10;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.4rem;
    border: none;
    color: #fff;
    font-size: 0.3rem;
    animation: fade 5s forwards;
    text-align: center;
    padding: 0.2rem 0.3rem;

    @keyframes fade {
      0% {
        opacity: 1;
        z-index: 4;
      }

      99% {
        opacity: 1;
        z-index: 4;
      }

      100% {
        opacity: 0;
        z-index: -1;
      }
    }
  }

  .palette {
    width: 100%;
    position: absolute;

    &.palette-box {
      z-index: 2;
    }
  }
}
</style>

<template>
    <div class="block">
        <img class="picture" :src="imageUrl" alt="" id="picture" v-if="saved">
        <!-- <img style="position: absolute;
    z-index: 10;
    width: 20%;
    right: 15px;
    bottom: 100px;" src="http://img.guoanfamily.com/duanwu/erWeiMa.png" alt=""> -->
        <div class="toast" v-if="saved">长按保存图片分享</div>

        <div class="toast">请拖放图片到合适位置</div>

        <div v-show="!saved">
            <canvas class="palette" id="palette" :height="wHeight" :width="wWidth"></canvas>
            <canvas class="palette palette-box" id="paletteBox" :height="wHeight" :width="wWidth"></canvas>

            <div class="re-choose" :class="{'re-choose1':isIphoneX}">
                重选
                <input class="choose-image" type="file" id="file" @change="chooseImage">
            </div>

            <button class="save" :class="{'re-choose1':isIphoneX}" @click="saveImage">确定</button>
        </div>
    </div>


</template>

<script>
import PbgMax from "../../../static/img/duanwu1.png";
// import Pbg from '../../static/img/image-bg.png';
import Pbg from "../../../static/img/duanwu.png";

const message = [
  {
    title:"父爱如山",
    msg: [
      "温柔如水",
      "明媚若阳",
      "给父亲一个久违的抱抱，能够包裹住万语千言！"
    ]
  },
  {
    title:"父爱如歌",
    msg: [
      "你的童话王国",
      "被他点亮",
      "和父亲一起去赛龙舟吧，这次你来掌舵！",
    ]
  },
  {
    title:"父爱如海",
    msg: [
      "在爱的绿洲里  欢乐润泽心灵",
      "偷偷加点儿料，想再看老爸出糗的样子！",
    ]
  },
  {
    title:"父爱如河",
    msg: [
      "源远流长",
      "带你去向往的地方",
      "回家，记得给父亲描述他没有到过的远方！",
    ]
  },
  {
    title:"父爱无言",
    msg: [
      "虽然看见的是他表面的冷",
      "但也能感知到他心里的暖",
      "轻轻一句辛苦了，让他感受你的温暖！",
    ]
  },
  {
    title:"父爱若兰",
    msg: [
      "完美",
      "是记忆深处伟岸的身影",
      "一种无可挑剔的味道，就像儿时我们眼里的父亲！",
    ]
  },
  {
    title:"父爱无疆",
    msg: [
      "暖阳无声",
      "大爱无疆",
      "细细品味，慢慢聆听，原来父亲的叮嘱是最深沉的守候！",
    ]
  },
  {
    title:"父爱若峰",
    msg: [
      "高大巍峨",
      "给你攀登的信心和勇气",
      "和父亲再来一次户外探险吧，这次换你保护他！",
    ]
  },];

export default {
  props: {},

  data() {
    return {
      isIphoneX:null,
      wWidth: 0,
      wHeight: 0,
      ctx: null,
      ctxBox: null,

      imageUrl: "",
      lastPoint: null,

      headPosition: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },

      me: null,
      bg: null,

      saved: false
    };
  },

  created() {
    //  history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate', function () {
    //       history.pushState(null, null, document.URL);
    //   });
  },

  mounted() {
    if (this.$isMaxScreen()) {
      // this.wWidth = 720;
      // this.wHeight = 1280;
      this.wWidth = 720 * 2;
      this.wHeight = 1440 * 2;

      this.headPosition = {
        x: 0,
        y: 250,
        w: 0,
        h: 0
      };
    } else {
      // this.wWidth = 720;
      // this.wHeight = 1166;
      this.wWidth = 720 * 2;
      this.wHeight = 1166 * 2;

      this.headPosition = {
        x: 0,
        y: 250,
        w: 0,
        h: 0
      };
    }

    this.init(window.sessionStorage.getItem("IMAGE"));
    let a = localStorage.getItem('Screentyle');
    if(a == 'Second'){
      // console.log('12423',a);
      this.isIphoneX = true;
    }
  },

  methods: {
    chooseImage(e) {
      const fs = new FileReader();
      const file = e.target.files[0];
      const fileName = file.name.toLowerCase();
      if (
        !fileName.includes("png") &&
        !fileName.includes("jpg") &&
        !fileName.includes("jpeg")
      ) {
        alert("请选择图片");
        return;
      }

      async function load() {
        let base64 = fs.result;

        //旋转图片
        base64 = await this.formatImg(file);

        //压缩图片
        if (file.size / (1024 * 1024) > 2) {
          base64 = await this.compressImage(base64);
        }

        this.setSession("IMAGE", base64);
        this.init(window.sessionStorage.getItem("IMAGE"));
        // this.$router.replace(`/save`);
      }

      fs.onload = load.bind(this);
      fs.readAsDataURL(file);
    },

    compressImage(base64) {
      return new Promise(resolve => {
        //调整图片大小
        const image = new Image();
        image.onload = e => {
          const ow = image.width;
          const oh = image.height;
          const nw = 720;
          const nh = parseInt(nw / ow * oh);

          const canvas = document.createElement("canvas");
          canvas.width = nw;
          canvas.height = nh;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, ow, oh, 0, 0, nw, nh);

          resolve(canvas.toDataURL("image/jpeg"));
        };
        image.src = base64;
      });
    },

    //调整图片位置
    formatImg(file) {
      let Orientation;

      EXIF.getData(file, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, "Orientation");
      });

      const rotateImg = this.rotateImg;

      return new Promise(resolve => {
        let oReader = new FileReader();
        oReader.onload = function(e) {
          //let blob = URL.createObjectURL(file);
          //_compress(blob, file, basePath);
          let image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            let expectWidth = this.naturalWidth;
            let expectHeight = this.naturalHeight;

            if (
              this.naturalWidth > this.naturalHeight &&
              this.naturalWidth > 800
            ) {
              expectWidth = 800;
              expectHeight =
                expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (
              this.naturalHeight > this.naturalWidth &&
              this.naturalHeight > 1200
            ) {
              expectHeight = 1200;
              expectWidth =
                expectHeight * this.naturalWidth / this.naturalHeight;
            }
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

            if (Orientation !== "" && Orientation !== 1) {
              switch (Orientation) {
                case 6: //需要顺时针（向左）90度旋转
                  // alert('需要顺时针（向左）90度旋转');
                  rotateImg(this, "left", canvas);
                  break;
                case 8: //需要逆时针（向右）90度旋转
                  // alert('需要顺时针（向右）90度旋转');
                  rotateImg(this, "right", canvas);
                  break;
                case 3: //需要180度旋转
                  // alert('需要180度旋转');
                  rotateImg(this, "right", canvas); //转两次
                  rotateImg(this, "right", canvas);
                  break;
              }
            }
            resolve(canvas.toDataURL("image/jpeg", 0.8));
          };
        };
        oReader.readAsDataURL(file);
      });
    },

    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      let min_step = 0;
      let max_step = 3;
      //let img = document.getElementById(pid);
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      //let step = img.getAttribute('step');
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction === "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },

    async init(Pme) {
      const canvasBox = document.getElementById("paletteBox");
      const ctxBox = canvasBox.getContext("2d");
      this.ctxBox = ctxBox;
      ctxBox.imageSmoothingQuality = "high";
      ctxBox.imageSmoothingEnabled = true;

      const canvas = document.getElementById("palette");
      const ctx = canvas.getContext("2d");
      this.ctx = ctx;
      ctx.imageSmoothingQuality = "high";
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, this.wWidth, this.wHeight);

      const me = await this.loadImage(Pme);
      const bg = await this.loadImage(this.$isMaxScreen() ? PbgMax : Pbg);
      this.me = me;
      this.bg = bg;

      //画头像默认用宽度为标准
      const { x, y } = this.headPosition;
      const w = this.wWidth;
      let h = parseInt(w / me.width * me.height);

      ctx.drawImage(me, 0, 0, me.width, me.height, x, y, w, h);
      this.headPosition = { x, y, w, h };

      ctxBox.drawImage(
        bg,
        0,
        0,
        bg.width,
        bg.height,
        0,
        0,
        this.wWidth,
        this.wHeight
      );

      const index = message.length * Math.random();
      const data = message[parseInt(index)];
       ctxBox.font = "100px 黑体";
      ctxBox.fillStyle = "#177f3b";
      ctxBox.textBaseline = "middle";
      ctxBox.textAlign = "center";
      let titley = "";
      if (this.$isMaxScreen()) {
        titley = 870 * 2;
      }else{
        titley = 740 *2;
      }
      ctxBox.fillText(data.title, 360 * 2, titley, 380 * 2);
      
      data.msg.map((item, i) => {
        ctxBox.font = "60px 黑体";
        ctxBox.fillStyle = "#458e5c";
        ctxBox.textBaseline = "middle";
        ctxBox.textAlign = "center";

        let y;
        // if (data.msg.length === 1) {
        //     y = 850 * 2;
        //   if (this.$isMaxScreen()) {
        //     y = 960 * 2;
        //   }
        // } else 
        if(data.msg.length === 2){
          ctxBox.font = "60px 黑体";
          if (i === 0) {
            y = 815 * 2;
            if (this.$isMaxScreen()) {
              y = 925 * 2;
            }
          } else {
            y = 885 * 2;
            if (this.$isMaxScreen()) {
              y = 995 * 2;
            }
          }
        }else if (data.msg.length === 3){
          ctxBox.font = "60px 黑体";
          if (i === 0) {
            y = 800 * 2;
            if (this.$isMaxScreen()) {
              y = 925 * 2;
            }
          } else if(i == 1) {
            y = 850 * 2;
            if (this.$isMaxScreen()) {
              y = 980 * 2;
            }
          }else if(i == 2) {
            y = 900 * 2;
            if (this.$isMaxScreen()) {
              y = 1030 * 2;
            }
          }
        }
        ctxBox.fillText(item, 360 * 2, y, 380 * 2.8);
      });

      this.touchControl(canvasBox);
    },

    loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function() {
          resolve(image);
        };
        image.src = url;
      });
    },

    touchControl(canvas) {
      canvas.addEventListener(
        "touchstart",
        e => {
          this.lastPoint = null;
        },
        false
      );

      canvas.addEventListener(
        "touchmove",
        e => {
          e.preventDefault();

          const me = this.me;
          const bg = this.bg;
          const ctx = this.ctx;

          //判断是否是双指移动
          if (e.touches.length === 1) {
            const { x, y, w, h } = this.headPosition;
            const { clientX, clientY } = e.touches[0];
            //单指只移动头像位置
            if (this.lastPoint) {
              ctx.clearRect(0, 0, this.wWidth, this.wHeight);
              const { px, py } = this.lastPoint;
              let moveX = clientX - px;
              let moveY = clientY - py;

              if (this.$needSmoothTouch()) {
                moveX = moveX * 4;
                moveY = moveY * 4;
              }

              //计算位移
              ctx.drawImage(
                me,
                0,
                0,
                me.width,
                me.height,
                x + moveX,
                y + moveY,
                w,
                h
              );
              this.headPosition = {
                x: x + moveX,
                y: y + moveY,
                w,
                h
              };
            }
            this.lastPoint = { px: clientX, py: clientY };
          } else if (e.touches.length === 2) {
            const [
              { clientX: clientX1, clientY: clientY1 },
              { clientX: clientX2, clientY: clientY2 }
            ] = e.touches;

            if (this.lastPoint) {
              ctx.clearRect(0, 0, this.wWidth, this.wHeight);
              const { px1, py1, px2, py2 } = this.lastPoint;

              //判断是横向放大还是纵向放大
              let lastDx = Math.abs(px1 - px2);
              let lastDy = Math.abs(py1 - py2);

              let newDx = Math.abs(clientX1 - clientX2);
              let newDy = Math.abs(clientY1 - clientY2);

              let headPosition = this.headPosition;

              //横向变化大于纵向变化
              if (Math.abs(newDx - lastDx) > Math.abs(newDy - lastDy)) {
                headPosition = this.scaleImage(newDx - lastDx, 0, headPosition);
              } else {
                headPosition = this.scaleImage(0, newDy - lastDy, headPosition);
              }

              const { x, y, w, h } = headPosition;
              ctx.drawImage(me, 0, 0, me.width, me.height, x, y, w, h);
              this.headPosition = headPosition;
            }

            this.lastPoint = {
              px1: clientX1,
              py1: clientY1,
              px2: clientX2,
              py2: clientY2
            };
          }

          // ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, this.wWidth, this.wHeight);
          // this.imageUrl = canvas.toDataURL('image/jpeg');
        },
        false
      );

      canvas.addEventListener(
        "touchend",
        e => {
          this.lastPoint = null;
        },
        false
      );
    },

    //等比缩放图片
    scaleImage(xScale, yScale, { x, y, w, h }) {
      if (this.$needSmoothTouch()) {
        xScale = xScale * 4;
        yScale = yScale * 4;
      }

      if (xScale) {
        //横向缩放 计算新的高度
        h = (w + xScale) / w * h;
        w = w + xScale;
      } else if (yScale) {
        //纵向缩放，计算宽度
        w = (h + yScale) / h * w;
        h = h + yScale;
      }

      return { x, y, w, h };
    },

    saveImage() {
      //将两个图层的画面画到一个图层中并生成最终的图片
      const canvas = document.createElement("canvas");
      const ctxPic = canvas.getContext("2d");
      canvas.width = this.wWidth;
      canvas.height = this.wHeight;

      ctxPic.drawImage(
        document.getElementById("palette"),
        0,
        0,
        this.wWidth,
        this.wHeight,
        0,
        0,
        this.wWidth,
        this.wHeight
      );
      ctxPic.drawImage(
        document.getElementById("paletteBox"),
        0,
        0,
        this.wWidth,
        this.wHeight,
        0,
        0,
        this.wWidth,
        this.wHeight
      );
      this.imageUrl = canvas.toDataURL("image/jpeg");
      this.saved = true;
    }
  },

  components: {}
};
</script>
