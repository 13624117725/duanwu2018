<template>
   <div class="chouseTwo">
       <div class="Ricedumpling" :class="{RicedumpMin:Screentyle=='First'}">
           <div class="lcity">
               <img v-if="imgObj.city" :src="imgObj.city" alt="">
           </div>
           <div class="Rzongzi">
               <img v-if="imgObj.zongzi" :src="imgObj.zongzi" alt="">
           </div>
       </div>
       <div class="info">
           <div class="tsxtDbox" :class="{tsxtDboxPluss:Screentyle=='Second'}">

               <img :src="imgObj.text" alt="">
           </div>
           <canvas style="display:none;"  class="palette" id="palette" :height="wHeight" :width="wWidth"></canvas>
           <canvas style="display:none;" class="palette palette-box" id="paletteBox" :height="wHeight" :width="wWidth"></canvas>

           <!-- <div class="btn" @click="chouseFile"> -->
           <div class="btn">
                <input class="choose-image" type="file" id="file" @change="chooseImage">

               <!-- 按钮 -->
           </div>
       </div>
   </div>
</template>

<script>

   export default {

       data() {
            return {
                Screentyle:'First',

                bjShow:true,
                wWidth: 0,
                wHeight: 0,
                ctx: null,
                ctxBox: null,
                marketShow:true,
                arrowShow:true,
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

                saved: false,
                buttonShow:false,

                // 选择结果
                pageOneData:{},
                chouseIndex:0,

                imgObj:{
                    zongzi:"",
                    city:"",
                    text:""
                },
                imgArr:[
                    {
                        zongzi:"http://img.guoanfamily.com/duanwu/fengmi/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/fengmi/city.png",
                        text:"http://img.guoanfamily.com/duanwu/fengmi/text.png"
                    },{
                        zongzi:"http://img.guoanfamily.com/duanwu/jiaxing/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/jiaxing/city.png",
                        text:"http://img.guoanfamily.com/duanwu/jiaxing/text.png"
                    }, {
                        zongzi:"http://img.guoanfamily.com/duanwu/jingbo/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/jingbo/city.png",
                        text:"http://img.guoanfamily.com/duanwu/jingbo/text.png"
                    },{
                        zongzi:"http://img.guoanfamily.com/duanwu/taiwan/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/taiwan/city.png",
                        text:"http://img.guoanfamily.com/duanwu/taiwan/text.png"
                    },{
                        zongzi:"http://img.guoanfamily.com/duanwu/beijing/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/beijing/city.png",
                        text:"http://img.guoanfamily.com/duanwu/beijing/text.png"
                    }, {
                        zongzi:"http://img.guoanfamily.com/duanwu/guangdong/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/guangdong/city.png",
                        text:"http://img.guoanfamily.com/duanwu/guangdong/text.png"
                    }, {
                        zongzi:"http://img.guoanfamily.com/duanwu/dazhen/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/dazhen/city.png",
                        text:"http://img.guoanfamily.com/duanwu/dazhen/text.png"
                    },{
                        zongzi:"http://img.guoanfamily.com/duanwu/shijin/zongzi.png",
                        city:"http://img.guoanfamily.com/duanwu/shijin/city.png",
                        text:"http://img.guoanfamily.com/duanwu/shijin/text.png"
                    },

                ]
            };

        },
        // created(){

        // },
        mounted(){

            this.pageOneData = JSON.parse(sessionStorage.getItem("pageOneData"))

            this.Screentyle = localStorage.getItem("Screentyle")
            if(this.judgeMeat){
                this.chouseIndex = 2*this.pageOneData.skinIndex+1
            }else{
                this.chouseIndex = 2*this.pageOneData.skinIndex
            }

            this.imgObj = this.imgArr[this.chouseIndex];

            this.bjShow = false;
            this.wWidth = 720 * 2;
            this.wHeight = 1480 * 2;

            this.headPosition = {
                x: 0,
                y: 1100,
                w: 0,
                h: 0
            };
       },
       components: {

       },
       methods:{
        //    判断是不是肉
            judgeMeat(){
                let floag = false
                this.pageOneData.GarnishValArr.forEach(item => {
                    if(item.bleong=="B"){
                        floag = true;
                        return  floag;
                    }
                    return floag;
                });
            },
            chouseFile(){

                this.$router.replace({name:'chouseImg'})
            },
            chooseImage(e) {
                // this.marketShow =  false;
                // this.buttonShow =  true;
                // this.arrowShow = false;
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
                let base64 = ""
                async function load() {
                    base64 = fs.result;
                    // console.log(12,this.base64)
                    //旋转图片
                    base64 = await this.formatImg(file);
                    //压缩图片
                    if (file.size / (1024 * 1024) > 2) {
                    base64 = await this.compressImage(base64);
                    }

                    sessionStorage.setItem("IMAGE", base64) //设置session

                    this.init(window.sessionStorage.getItem("IMAGE"));
                    this.$router.replace(`/createImage`);
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
            async init() {

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

                const me = await this.loadImage();
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
        }

   }
</script>

<style scoped lang="less">

.chouseTwo{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10%;
    background: url("http://img.guoanfamily.com/duanwu/resultBg.png") center no-repeat;
    background-size: cover;
    .Ricedumpling{
        position: relative;
        width: 100%;
        margin-top:30px;
        height:220px;
        background: url("http://img.guoanfamily.com/duanwu/kuangkuang.png") center no-repeat;
         background-size:100% 100%;
         padding: 20px;
         &.RicedumpMin{
             margin-top:0px;
             height:200px;
         }
        .lcity{
            width: 9%;
            height: 180px;
            float: left;
            position: relative;
            img{
                position:absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50% ,-50%);
                width: 90%;
            }
        }
        .Rzongzi{
            width: 90%;
            height: 100%;
            float: left;
            text-align: center;

            img{
                width: 100%;
            }
        }
        // &::before{
        //     content: "";
        //     width: 100%;
        //     height: 100%;
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        // }
    }
    img{
        width: 100%;
        text-align: center;
        margin-top: 10%;
    }
    .info{
        width: 55%;
        height: 54%;
        padding: 10px;
        position: absolute;
        left: 0;
        bottom: 0;
        .tsxtDbox{
            height: 75%;
            width: 100%;
            text-align: right;
            &.tsxtDboxPluss{
                  height: 66%;
            }
            img{
                margin: 0;
                width: 75%;
            }
        }
        .btn{
            height: 40px;
            width: 100%;
            margin: 10px auto;
            background:url('http://img.guoanfamily.com/duanwu/btn/ZQMY.png') no-repeat right;
            background-size:contain;
            // background-color: green;
            .choose-image{
                opacity: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
