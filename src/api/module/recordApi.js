import request from "../request";

export default {
    //获取任务的执行记录
    getTaskRecordList(params) {
        return request.get('/api/run/tasks/records', {
            params: params
        })
    },

    //获取套件执行记录
    getSuiteRecordList(params) {
        return request.get('/api/run/suites/records', {
            params: params
        })
    },

    //获取用例执行记录
    getCaseRecordList(params) {
        return request.get('/api/run/cases/records', {
            params: params
        })
    },

    //获取单条用例执行详情
    getCaseRecordDetail(record_id) {
        return request.get(`/api/run/cases/record/${record_id}`)
    },

    //获取套件执行详情
    getSuiteRecordDetail(record_id) {
        return request.get(`/api/run/suites/record/${record_id}`)
    },



}