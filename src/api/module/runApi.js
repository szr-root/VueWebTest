import request from "@/api/request";

export default {
    runCase(case_id, params) {
        return request.post(`/api/run/cases/${case_id}`, params)
    },

    runSuite(suite_id, params) {
        return request.post(`/api/run/suites/${suite_id}`, params)
    },

    runTask(task_id, params) {
        return request.post(`/api/run/tasks/${task_id}`, params)
    },


}
