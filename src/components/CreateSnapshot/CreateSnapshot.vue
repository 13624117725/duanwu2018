<style scoped>
    .palette {
        width: 100%;
        position: absolute;
    }
</style>

<template>
    <div>
        <!-- <canvas class="palette" id="palette" :height="wHeight" :width="wWidth"></canvas> -->
        <!-- <img :src="imgsrc"  /> -->
    </div>
</template>

<script>
    export default {
        props: {
            background: {
                type: String,
                default: '',
            },
            qrcode: {
                type: String,
                default: '',
            },
            portrait: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                default: '',
            },
            phone: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                wWidth: 0,
                wHeight: 0,
                imgsrc:""
            }
        },

        created() {
            this.wWidth = 750*2;
            this.wHeight = 1100*2;

            this.draw();
        },

        mounted() {

        },

        methods: {

            async draw() {
                const {wWidth, wHeight, background, qrcode, portrait, name, phone} = this;
                // console.log(1,background, 2,qrcode, 3,portrait, name, phone);

                const backgroundImg = new Image();
                const qrcodeImg = new Image();
                const portraitImg = new Image();

                // console.log(background, qrcode, portrait, name, phone);

                let res = await Promise.all(
                    [
                        this.imageOnload(backgroundImg, background),
                        this.imageOnload(qrcodeImg, qrcode),
                        this.imageOnload(portraitImg, portrait)
                    ]
                );
                console.log(2);
                const canvasBox = document.createElement('canvas'); // document.getElementById('palette');
                canvasBox.height = this.wHeight;
                canvasBox.width = this.wWidth;
                const ctx = canvasBox.getContext('2d');
                ctx.imageSmoothingQuality = "high";
                ctx.imageSmoothingEnabled = true;

                //画背景
                ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, wWidth, wHeight);
                //画二维码
                ctx.drawImage(qrcodeImg, 0, 0, qrcodeImg.width, qrcodeImg.height, wWidth * .15, wHeight * .8, wWidth * .2, wWidth * .2);

                //画人员信息
                //画人员背景
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 200;
                ctx.beginPath();
                ctx.moveTo(wWidth * .55, wHeight * .6);
                ctx.lineTo(wWidth * .9, wHeight * .6);
                ctx.lineCap = "round";
                ctx.stroke();

                //写名字
                ctx.fillStyle = '#000';
                ctx.font = "70px 黑体";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(name, wWidth * .75, wHeight * .585, 300);
                //写手机号
                ctx.fillText(phone, wWidth * .75, wHeight * .62, 500);

                const newImage = await this.getPortraitData(portraitImg);
                ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height, wWidth * .483, wHeight * .5550, 200, 200);
                this.imgsrc = canvasBox.toDataURL("image/jpeg");
                // console.log(123)
                this.$emit('imgUrl',this.imgsrc)

            },

            imageOnload(img, src) {
                return new Promise((resolve, reject) => {
                    img.onload = () => {
                        resolve();
                    };
                    img.crossOrigin = "Anonymous";
                    img.src = src;
                });
            },

            async getPortraitData(portraitImg) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 200;
                ctx.imageSmoothingQuality = "high";
                ctx.imageSmoothingEnabled = true;
                ctx.save();
                ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
                ctx.clip();
                ctx.drawImage(portraitImg, 0, 0, portraitImg.width, portraitImg.height, 0, 0, 200, 200);
                const newImage = new Image();
                await this.imageOnload(newImage, canvas.toDataURL('image/png'));
                return newImage;
            }

        },

        components: {}
    }
</script>
