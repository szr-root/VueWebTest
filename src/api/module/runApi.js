import request from "@/api/request";

export default {
    runCase(case_id, params) {
        return request.get(`/api/run/case/${case_id}`, params)
    },

    runSuite(suite_id, params) {
        return request.get(`/api/run/suite/${suite_id}`, params)
    },

    runTask(task_id, params) {
        return request.get(`/api/run/task/${task_id}`, params)
    },


}
