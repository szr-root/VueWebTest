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

    deleteSuite(id) {
        return request.delete(`/api/test/suites/${id}/`)
    },

    createSuite(params) {
        return request.post(`/api/test/suites/`, params)
    },

    getSuiteDetail(id) {
        return request.get(`/api/test/suites/${id}/`)
    },

    updateSuite(id, params){
        return request.put(`/api/test/suites/${id}/`, params)
    },
}