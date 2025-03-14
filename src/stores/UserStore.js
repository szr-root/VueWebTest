import {defineStore} from 'pinia'

export const UserStore = defineStore('ustore',{
	//全局数据
	state:()=>{
		return{
			token:null,
			userinfo:null,
			isAuthenticated:false
		}
	},
	// 定义持久化配置
	persist:{
		enabled:true,
		strategies:[
			{
				key:'userInfo',
				storage:localStorage
			}
		]
	}
}) 