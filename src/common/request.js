import ajax from './ajax'
let request = {
    // 首页- 初始化数据
    getIndexData(data) {
        return ajax.get('GetAsProductlistWhere', data)
    },
    // 文件列表- 初始化数据
    getTableListInfo(data) {
        return ajax.get('/HandBookDetailbyId', data)
    },
    // 文件列表- 提交评星
    postRater(data) {
        return ajax.post('/MeetingTripByPhone', data)
    },

}

export default request