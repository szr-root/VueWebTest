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
    }
}