import {defineStore} from 'pinia'

export const UserStore = defineStore('ustore',{
	//全局数据
	state:()={
		return{
			token:null,
			userinfo:null,
			isAuthenticated:false
		}
	}
}) 