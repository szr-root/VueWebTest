import request from "../request";

export default {
//获取任务的执行记录
    getTaskRecordList(params) {
        return request.get('/api/run/tasks/records', {
            params: params
        })
    },
}