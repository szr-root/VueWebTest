import request from "@/api/request";

//导出请求方法
export default {
	getTaskList(project_id) {
       return request.get('/api/plan/tasks',{
            params:{
                project_id:project_id
            }
       })
    },

    createTask(params){
        return request.post('/api/plan/tasks/',params)
    },
    updateTask(id,params){
        return request.put(`/api/plan/tasks/${id}`,params)
    },
    deleteTask(id){
        return request.delete(`/api/plan/tasks/${id}`)
    },
    getTaskDetail(id){
        return request.get(`/api/plan/tasks/${id}`)
    },
}