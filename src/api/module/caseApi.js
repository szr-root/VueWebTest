import request from "../request";

export default {
    getCaseList(params) {
        return request.get(`/api/test/cases/`, {
            params: params
        })
    },

    deleteCase(id) {
        return request.delete(`/api/test/cases/${id}/`)
    },

    copyCase(id){
        return request.post(`/api/test/cases/${id}/`)
    },

    //添加用例
    createCase(params) {
        return request.post(`/api/test/cases/`, params)
    },

    //获取单个用例详情
    getCaseDetail(id) {
        return request.get(`/api/test/cases/${id}/`)
    },

    updateCase(id, params){
        return request.put(`/api/test/cases/${id}/`, params)
    },

    // ================= 套件 =================

    getSuiteList(params) {
        return request.get(`/api/test/suites/`, {
            params: params
        })
    },
}