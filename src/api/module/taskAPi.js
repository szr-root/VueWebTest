import request from "@/api/request";

//导出请求方法
export default {
    getTaskList(project_id) {
        return request.get('/api/plan/tasks', {
            params: {
                project_id: project_id
            }
        })
    },

    createTask(params) {
        return request.post('/api/plan/tasks/', params)
    },
    updateTask(id, params) {
        return request.put(`/api/plan/tasks/${id}`, params)
    },
    deleteTask(id) {
        return request.delete(`/api/plan/tasks/${id}`)
    },
    getTaskDetail(id) {
        return request.get(`/api/plan/tasks/${id}`)
    },

    //删除任务中的套件
    deleteTaskSuite(id, suite_id) {
        return request.delete(`/api/plan/tasks/${id}/suite/${suite_id}`)
    },

    //修改任务名
    updateTaskName(id, name) {
        return request.put(`/api/plan/tasks/${id}`, {
            name: name
        })
    },
    //向任务中添加套件
    addTaskSuite(id, params) {
        return request.post(`/api/plan/tasks/${id}/suite/`, params)
    },
}