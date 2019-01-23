import Vue from "vue"
import store from "./store"
class Ajax {
    constructor() {
            // this.Utils = 'https://mt.guoanfamily.com/handbook'
            this.Utils = 'http://www.guoanfamily.com/'

            // 不需要token的接口跟地址
            // this.noTokenUtils = "http://ntest.guoanfamily.com/palmsaleapp";
            this.ImgSrc = 'https://img.guoanfamily.com/'
        }
        /**
         * get请求
         * @param url
         * @returns {Promise.<TResult>}
         */
    get(url, data) {
        Vue.$vux.loading.show();
        let token = store.get('token');
        //判断data是否有值
        if (data != null) {
            var str = "?";
            for (var key in data) {
                var tempStr = key + "=" + data[key] + "&";
                str += tempStr;
            }
            // 删除最后一个&
            str = str.substring(0, str.length - 1);
            url += str;
        }
        return fetch(this.Utils + url, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + token
                "Authorization": "Bearer:6"
            },
        }).then(response => {
            // console.log(response)
            return response.json();
        }).then(res => {
            Vue.$vux.loading.hide();
            if (res.Code === 200) {
                return res
            }
        }).catch((err) => {
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(
                '请求错误：' + err.response.status + ',' + err.response.statusText, 'middle')
            console.error(err);
        })
    };

    /**
     * post请求
     * @param url
     * @param data
     * @returns {Promise.<TResult>}
     */
    post(url, data = {}) {
        let token = store.get('token');
        Vue.$vux.loading.show();
        return fetch(this.Utils + url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + token
                "Authorization": "Bearer:6 "
            },
            body: JSON.stringify(data),
        }).then(function(response) {
            return response.json();
        }).then(res => {
            Vue.$vux.loading.hide()
            if (res.Code === 200) {
                return res
            }
            console.info(url + "：", data, JSON.parse(JSON.stringify(res)));
            return res;
        }).catch((err) => {
            Vue.$vux.loading.hide()
            Vue.$vux.toast.text(
                '请求错误：' + err.response.status + ',' + err.response.statusText, 'middle')
            console.error(err);
        })
    };
    /**
     * 登陆
     * @param url
     * @param data
     * @returns {Promise.<TResult>}
     */
    login(url, data = {}) {
        return fetch(this.Utils + url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(function(response) {
            //console.log(4, response)
            return response.json();
        }).then(res => {
            if (res.status === 200) {
                return res
            }
            // console.info(url + "：", data, JSON.parse(JSON.stringify(res)));
            return res;
        }).catch(function(e) {
            console.error(e);
        })
    };

    //  不需要登录就能用的接口方法
    /**
     *
     */
    noTokenGet(url, data) {
        Vue.$vux.loading.show();
        //判断data是否有值
        if (data != null) {
            var str = "?";
            for (var key in data) {
                var tempStr = key + "=" + data[key] + "&";
                str += tempStr;
            }
            // 删除最后一个&
            str = str.substring(0, str.length - 1);
            url += str;
        }
        return fetch(this.noTokenUtils + url, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            // console.log(response)
            return response.json();
        }).then(res => {
            Vue.$vux.loading.hide();
            if (res.status === 200) {
                return res
            }
        }).catch((err) => {
            Vue.$vux.loading.hide();
            Vue.$vux.toast.text(
                '请求错误：' + err.response.status + ',' + err.response.statusText, 'middle')
            console.error(err);
        })
    };




}

export default new Ajax()