import request from "@/api/request";

//导出请求方法
export default {
	//登录
	loginApi(data){
		return request.post('/api/users/login',data)
	},
	//注册
	registerApi(data){
		return request.post('/api/users/register',data)
	},
	verifyTokenApi(data){
		return request.post('/api/users/verify',data)
	},
	refreshTokenApi(data){
		return request.post('/api/users/refresh',data)
	}
}
