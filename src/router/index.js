import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const index = resolve => require(['../views/index'], resolve) // 准备
const showMsg = resolve => require(['../views/index/showMsg'], resolve) // 开始游戏
const first = resolve => require(['../views/index/first'], resolve) // 游戏页
const chouseImg = resolve => require(['../views/index/chouseImg'], resolve) // 设计海报
const createImage = resolve => require(['../views/index/CreateImage'], resolve) // 设计海报

// const Weather = resolve => require(['../views/Weather'], resolve) // 天气
export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      }
    }, {
      path: '/showMsg',
      name: 'showMsg',
      component: showMsg,
      meta: {
        title: '说明'
      }
    }, {
      path: '/first',
      name: 'first',
      component: first,
      meta: {
        title: '开始'
      }
    },{
        path: '/createImage',
        name: 'createImage',
        component: createImage,
        meta: {
          title: '生成图片'
        }
      }, {
      path: '/chouseImg',
      name: 'chouseImg',
      component: chouseImg,
      meta: {
        title: '选择照片'
      }
    }
    // {
    //   path: '/weather',
    //   name: 'Weather',
    //   component: Weather,
    //   meta: {
    //   }
    // },
  ]
})
