import request from "@/api/request";

//导出请求方法
export default {
	//登录
	loginApi(data){
		return request.post('/api/users/login',data)
	},
	//注册
	register(data){
		return request.post('/api/users/register',data)
	},
	verifyToken(data){
		return request.post('/api/users/verify',data)
	},
	refreshToken(data){
		return request.post('/api/users/refresh',data)
	}
}
