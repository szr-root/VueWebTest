import request from "../request";

export default {
	getProjectList(page,size){
		return request.get('/api/pro/projects/',{
			params:{
				page:page,
				size:size
			}
		})
	},
	createProject(params){
		return request.post('/api/pro/projects/',params)
	},
	deleteProject(id){
		return request.delete(`/api/pro/projects/${id}/`)
	},
	updateProject(id,name){
		return request.put(`/api/pro/projects/${id}/`,{
			name:name
		})
	},
	
	//============= 套件 ==========
	getMoudleList(id){
		return request.get('/api/pro/modules',{
			params:{
				project_id:id
			}
		})
	},
	
	createModule(params){
		return request.post('/api/pro/modules/',params)
	},
	
	deleteModule(id){
		return request.delete(`/api/pro/modules/${id}`)
	},
	
	updateModule(id,name){
		return request.put(`/api/pro/modules/${id}`,{
			name:name
		})
	},
	
	getModuleDetail(id){
		return request.get(`/api/pro/modules/${id}`)
	},

	// 项目环境相关
	getEnvList(id){
		return request.get(`/api/pro/envs/`,{
			params:{
				project:id
			}
		})
	},

	createEnv(params){
		return request.post(`/api/pro/envs/`,params)
	},

	deleteEnv(id){
		return request.delete(`/api/pro/envs/${id}`)
	},

	updateEnv(id,params){
		return request.put(`/api/pro/envs/${id}`,params)
	},
	
}