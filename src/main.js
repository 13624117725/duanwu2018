// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import Method from './common/GaPlugin'
import Localstore from './common/store'
import vueresource from 'vue-resource'
Vue.use(vueresource)
// VueTouch
// import VueTouch from 'vue-touch';
// Vue.use(VueTouch, { name: 'v-touch' })

import { Qrcode } from 'vux';

Vue.component("Qrcode", Qrcode);
import './common/qingjs'; // 云之家app插件
// 全局安装fetch
import 'whatwg-fetch';
// 引入全局的rem+
import './common/rem.js';
// 引入全局css
import './common/public.css';
// 引入字体图标
import './assets/iconfont/iconfont.css';

// 安装swiper组件
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// // import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
FastClick.attach(document.body)
    // 将公共的js挂载到vue的原型上面
Vue.use(new Method())
    // 使用pdf.js
    // Vue.use(pdf)
    // 引入localstroe方法
Vue.prototype.store = Localstore
    // 引用自定义下拉插件
    // Vue.use(VueScrollTo)
Vue.config.productionTip = false

import { ToastPlugin } from "vux"
Vue.use(ToastPlugin);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
Vue.http.post('https://act.guoanfamily.com/openweixin/jsapi/getJsapiSignature?local_url=' + encodeURIComponent(location.href.split('#')[0]), {}).then(response => {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: response.body.appid, // 必填，公众号的唯一标识
    timestamp: parseInt(response.body.timestamp), // 必填，生成签名的时间戳
    nonceStr: response.body.noncestr, // 必填，生成签名的随机串
    signature: response.body.signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareAppMessage',
      'onMenuShareTimeline'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(function () {
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
      title: '真爱父出，粽情端午', //标题
      desc: '当端午节撞上父亲节,是吃货人设,还是走心寄托,暖心粽子包起来,传递专属你的“粽”情蜜语', //描述
      link: 'https://mt.guoanfamily.com/duanwu/#/', //连接地址指打开分享时页面地址
      imgUrl: 'https://img.guoanfamily.com/duanwu/indexbg.jpg', //图片
      trigger: function (res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      },
      success: function (res) {},
      cancel: function (res) {},
      fail: function (res) {}
    })
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: '真爱父出，粽情端午', // 标题
      desc: '当端午节撞上父亲节,是吃货人设,还是走心寄托,暖心粽子包起来,传递专属你的“粽”情蜜语', // 描述
      link: 'https://mt.guoanfamily.com/duanwu/#/', // 连接地址指打开分享时页面地址
      imgUrl: 'https://img.guoanfamily.com/duanwu/indexbg.jpg', // 图片
      trigger: function (res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      },
      success: function (res) {},
      cancel: function (res) {},
      fail: function (res) {}
    })
    wx.error(function (res) {})
  })
}, response => {
  alert(err);
})
