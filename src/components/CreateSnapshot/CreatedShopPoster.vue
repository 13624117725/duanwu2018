<style scoped>
    .CreatedShopPoster{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .palette {
        width: 100%;
    }
    .erWeiMa{
        display: none;
    }
</style>

<template>
    <div class="CreatedShopPoster">
        <!-- erWeiMaData -->
        <!-- <img :src="imgsrc" alt=""> -->
        <div class="erWeiMa" ref="ShopPosterErWeiMa">
            <qrcode :size='100' :value="erWeiMaData" type="img"></qrcode>
        </div>
    </div>
</template>

<script>
    export default {

        props:['cardData','bgcImg'],
        data() {
            return {
                wWidth: 0,
                wHeight: 0,
                imgsrc:"",
                erWeiMaData:"",
            }
        },

        created() {

            this.erWeiMaData = this.cardData.erWeiMaData
            this.wWidth = 414*2;
            this.wHeight = 736*2;
            // console.log(2,this.erWeiMaData)
        },

        mounted() {
            let imgDom = this.$refs.ShopPosterErWeiMa.querySelector('img');
                imgDom.onload = ()=>{
                const qrcodeUrl = imgDom.src;
                // console.log(3,imgDom)
                this.draw(qrcodeUrl);
            }

        },
        methods: {
            async draw(url) {
                const {wWidth, wHeight, bgcImg} = this;
                const { typeName, msg} = this.cardData;
                const backgroundImg = new Image();
                const qrcodeImg = new Image();
                const portraitImg = new Image();
                let res = await Promise.all(
                    [
                        this.imageOnload(backgroundImg, bgcImg),
                        this.imageOnload(qrcodeImg, url),
                    ]
                );

                const canvasBox = document.createElement('canvas'); // document.getElementById('palette');
                canvasBox.height = this.wHeight;
                canvasBox.width = this.wWidth;
                const ctx = canvasBox.getContext('2d');
                ctx.imageSmoothingQuality = "high";
                ctx.imageSmoothingEnabled = true;
                //画背景
                console.log(111,backgroundImg)
                ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, wWidth, wHeight);

                //写标题
                ctx.fillStyle = '#771901';
                ctx.font = "90px 黑体";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(typeName, wWidth * .55, wHeight * .18, 400);
            //    // 写楼盘
            //    if(this.chouseShowName.indexOf('buildName')>=0){
            //         ctx.fillStyle = '#fff';
            //         ctx.font = "70px 黑体";
            //         ctx.textBaseline = "middle";
            //         ctx.textAlign = "center";
            //         ctx.fillText(buildName, wWidth * .55, wHeight * .26, 400);
            //    }

                //画信息
                ctx.strokeStyle = "rgba(255,255,255,0.5)";
                ctx.lineWidth =800;
                ctx.beginPath();
                ctx.moveTo(wWidth * .25, wHeight * .57);
                ctx.lineTo(wWidth * .9, wHeight * .57);
                // ctx.lineCap = "round";
                ctx.stroke();
                let initHeight=(wHeight * .325)+15;//绘制字体距离canvas顶部初始的高度
                let lastSubStrIndex= 0; //每次开始截取的字符串的索引
                let lineWidth = 0;

                // 写面积

                    initHeight+=40;
                    ctx.fillStyle = '#000';
                    ctx.font = "32px 黑体";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillText(msg, wWidth * .57,initHeight);//绘制截取部分


                // // 写价格
                // if(this.chouseShowName.indexOf("buildPrice")>=0){
                //     initHeight+=40;
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     ctx.fillText(`价格：${buildPrice}`, wWidth * .57,initHeight);//绘制截取部分
                // }

                //  // 写佣金
                // if(this.chouseShowName.indexOf("buildCommision")>=0){
                //     initHeight+=40;
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     ctx.fillText(`佣金：${buildCommision}`, wWidth * .57,initHeight);//绘制截取部分
                // }
                //  // 写户型
                // if(this.chouseShowName.indexOf("buildHouseType")>=0){
                //     initHeight+=40;
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     lastSubStrIndex= 0;
                //     lineWidth = 0
                //     for(let i=0;i<buildSize.length;i++){
                //         lineWidth+=ctx.measureText(buildSize[i]).width;
                //         if(lineWidth>440){
                //             ctx.fillText(`户型类型：${buildSize.substring(lastSubStrIndex,i)}`, wWidth * .57,initHeight);//绘制截取部分
                //             initHeight+=40;//50为字体的高度
                //             lineWidth=0;
                //             lastSubStrIndex=i;
                //         }
                //         if(i==buildSize.length-1){//绘制剩余部分
                //             ctx.fillText(`户型类型：${buildSize.substring(lastSubStrIndex,i+1)}`, wWidth * .57,initHeight);//绘制截取部分
                //         }
                //     }
                // }
                // // 写地址
                // if(this.chouseShowName.indexOf("buildAdd")>=0){
                //     initHeight+=40;
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     ctx.fillText(`地址：${buildAdd}`, wWidth * .57,initHeight);//绘制截取部分
                // }

                // // 写宣传
                // if(this.chouseShowName.indexOf("saleText")>=0){
                //     initHeight+=40;
                //     lineWidth = 0
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     for(let i=0;i<buildIntroduce.length;i++){
                //         lineWidth+=ctx.measureText(buildIntroduce[i]).width;
                //         if(lineWidth>440){
                //             ctx.fillText(buildIntroduce.substring(lastSubStrIndex,i), wWidth * .57,initHeight);//绘制截取部分
                //             initHeight+=40;//50为字体的高度
                //             lineWidth=0;
                //             lastSubStrIndex=i;
                //         }
                //         if(i==buildIntroduce.length-1){//绘制剩余部分
                //             ctx.fillText(buildIntroduce.substring(lastSubStrIndex,i+1),wWidth * .57,initHeight);
                //         }
                //     }
                // }

                // if(saleText2&&this.chouseShowName.indexOf("saleText2")>=0&&saleText2.length>0){
                //     initHeight+=40;
                //     lineWidth = 0
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     for(let i=0;i<saleText2.length;i++){
                //         lineWidth+=ctx.measureText(saleText2[i]).width;
                //         if(lineWidth>440){
                //             ctx.fillText(saleText2.substring(lastSubStrIndex,i), wWidth * .57,initHeight);//绘制截取部分
                //             initHeight+=40;//50为字体的高度
                //             lineWidth=0;
                //             lastSubStrIndex=i;
                //         }
                //         if(i==saleText2.length-1){//绘制剩余部分
                //             ctx.fillText(saleText2.substring(lastSubStrIndex,i+1),wWidth * .57,initHeight);
                //         }
                //     }
                // }
                // if(saleText3&&this.chouseShowName.indexOf("saleText3")>=0&&saleText3.length>0){
                //     initHeight+=40;
                //     lineWidth = 0
                //     ctx.fillStyle = '#000';
                //     ctx.font = "32px 黑体";
                //     ctx.textBaseline = "middle";
                //     ctx.textAlign = "center";
                //     for(let i=0;i<saleText3.length;i++){
                //         lineWidth+=ctx.measureText(saleText3[i]).width;
                //         if(lineWidth>440){
                //             ctx.fillText(saleText3.substring(lastSubStrIndex,i), wWidth * .57,initHeight);//绘制截取部分
                //             initHeight+=40;//50为字体的高度
                //             lineWidth=0;
                //             lastSubStrIndex=i;
                //         }
                //         if(i==saleText3.length-1){//绘制剩余部分
                //             ctx.fillText(saleText3.substring(lastSubStrIndex,i+1),wWidth * .57,initHeight);
                //         }
                //     }
                // }
                // 二维码背景
                ctx.strokeStyle = "rgba(255,255,255,1)";
                ctx.lineWidth =280;
                ctx.beginPath();
                ctx.moveTo(wWidth * .415, wHeight * .693);
                ctx.lineTo(wWidth * .745, wHeight * .693);
                // ctx.lineCap = "round";
                ctx.stroke();

                // 二维码
                ctx.drawImage(qrcodeImg, 0, 0, qrcodeImg.width, qrcodeImg.height, wWidth * .43, wHeight * .61, wWidth * .30, wWidth * .30);

                initHeight+=(130+wWidth * .30);
                lineWidth = 0
                ctx.fillStyle = '#fff';
                ctx.font = "32px 黑体";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillText('长按识别图中二维码',wWidth * .57,wHeight * .82);

                const newImage = await this.getPortraitData(portraitImg);

                ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height, wWidth * .483, wHeight * .5550, 200, 200);

                this.imgsrc = canvasBox.toDataURL("image/jpeg");

                this.$emit('makeImg',this.imgsrc)
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

            // ctx.drawImage(portraitImg, 0, 0, portraitImg.width, portraitImg.height, 0, 0, 200, 200);

                const newImage = new Image();
                await this.imageOnload(newImage, canvas.toDataURL('image/png'));
                return newImage;

            }


        },

        components: {}
    }
</script>
