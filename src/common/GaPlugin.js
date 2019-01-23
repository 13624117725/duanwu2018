import request from './request'
import ajax from './ajax'
export default class {
  constructor() {
    this.Utils = ajax.Utils
    this.ImgSrc = ajax.ImgSrc
  }

  install(Vue, options) {
    this.installExtendsFunction()
    this.installPrototype(Vue)
    this.installFilter(Vue)
    this.installdeepRegister(Vue, request)
  }
  /*------------------安装扩展方法------------------*/
  installExtendsFunction() {
    /**
     * 扩展时间对象，增加Format方法
     */
    (function () {
      /*对Date的扩展，将 Date 转化为指定格式的String
       月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
       年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
       例子：
       (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
       (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
       支持时间格式化*/
      Date.prototype.Format = function (fmt) { //author: meizz
        let o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    }())
  }
  /*------------------添加vue过滤器------------------*/
  installFilter(Vue) {
    /**
     * 格式化日期的过滤器
     * (yyyy-MM-dd)
     */
    Vue.filter('date-filter', function (time) {
      return new Date(time).Format("yyyy-MM-dd");
    });
    /**
     * 格式化日期+时间的过滤器
     * (yyyy-MM-dd hh:mm)
     */
    Vue.filter('date-time-filter', function (time) {
      return new Date(time).Format("yyyy-MM-dd hh:mm");
    });
  }

  /*------------------添加vue实例方法------------------*/
  installPrototype(Vue) {
    // Vue.prototype.get = ajax.get
    // Vue.prototype.post = ajax.post
    // Vue.prototype.login = ajax.login
    Vue.prototype.Utils = this.Utils
    Vue.prototype.ImgSrc = this.ImgSrc
    Vue.prototype.notEmpty = (value) => {
      if (value === null || value === undefined || value === "null" || value === "undefined" || value === "") {
        return true
      }
    }

    Vue.prototype.$isMaxScreen = function () {
      return screen.height / screen.width >= 2 ///iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375);
    }
    Vue.prototype.$needSmoothTouch = function () {
      if (!/iphone/gi.test(navigator.userAgent)) {
        return true;
      }

      if (!(screen.height === 812 && screen.width === 375)) {
        return true;
      }

      return false;
    }
  }
  /*------------------添加ajax的requery的请求方法------------------*/
  installdeepRegister(Vue, request) {
    for (var k in request) {
      if (typeof request[k] === 'object') {
        this.installdeepRegister(Vue, request[k])
      } else {
        Vue.prototype['$$' + k] = request[k]
      }
    }
  }
}
