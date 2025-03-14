<template>
	<div class="main">
		<div class="login_box">
			<div class="head">
				<img src="@/assets/images/logo.png" alt="logo" class="logo">
				<div class="title">WEB自动化平台</div>
			</div>
			<div class="login-form" >
				  <el-form :model="registerForm" :rules="registerRules" ref='registerFormRef'>
				    <el-form-item prop="username">
				      <el-input prefix-icon="User" v-model="registerForm.username" 
								placeholder="请输入账号"
					  />
				    </el-form-item>
					
					<el-form-item prop="password">
					  <el-input type="password" prefix-icon="Lock" v-model="registerForm.password" 
								placeholder="请输入密码"
					  />
					</el-form-item>
					
					<el-form-item prop="password_confirm">
					  <el-input type="password" prefix-icon="Lock" v-model="registerForm.password_confirm" 
								placeholder="确认密码"
					  />
					</el-form-item>
					<el-form-item prop="email">
					  <el-input  prefix-icon="Message" v-model="registerForm.email" 
								placeholder="请输入邮箱"
					  />
					</el-form-item>
					<el-form-item prop="mobile">
					  <el-input prefix-icon="Phone" v-model="registerForm.mobile" 
								placeholder="输入手机号"
					  />
					</el-form-item>
					<el-form-item>
					  <el-input  prefix-icon="User" v-model="registerForm.nickname" 
								placeholder="输入昵称"
					  />
					</el-form-item>
					
					
				    <el-form-item>
				      <el-button :disabled='canClick' type="warning"  @click="RegisterSubmit(registerFormRef)" style="width: 100%;">注 册</el-button>
				    </el-form-item>
					
					<el-link @click="router.push('login')" type="warning">已有账号，点击登录</el-link>
				  </el-form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {reactive,computed,ref,onBeforeMount} from 'vue'
	import http from '@/api/index'
	import { ElNotification,ElMessage} from 'element-plus'
	import {useRouter} from 'vue-router'
	import {UserStore} from '@/stores/UserStore'
	
	//创建路由对象
	const router = useRouter()
	
	//创建用户store对象
	const uStore = UserStore()
	
	const registerForm = reactive({
		username:"",
		password:"",
		password_confirm:"",
		email:"",
		mobile:"",
		nickname:""
	})
	
	//表单校验规则
	const registerRules = reactive({
		username: [
			{ required: true, message: '账号不能为空', trigger: 'blur' },
			{ min: 4, max: 18, message: '账号长度4-18位', trigger: 'blur' }
		],
		password :[
			{ required: true, message: '密码不能为空', trigger: 'blur' },
			{ min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
		],
		password_confirm:[
			{ required: true, message: '确认密码不能为空', trigger: 'blur' },
			{ min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
		],
		email:[
			{ type:'email', message: '邮箱格式不正确', trigger: 'blur' }
		],
		mobile:[
			{ min: 11, max: 11, message: '手机号长度应该11位', trigger: 'blur' },
			// { type:'number', message: '手机号格式不对', trigger: 'blur' }
		]
	})
	
	// 未输入账号密码禁用登录
	const canClick = computed(()=>{
		if (registerForm.username!=='' && registerForm.password!==''){return false}
		else{return true}
	})
	
	const registerFormRef=ref(null)
	
	const RegisterSubmit = async(registerRef)=>{
		//表单预校验
		await registerRef.validate(async (valid)=>{	
			if(valid){
				const response = await http.user.registerApi(registerForm)
				if(response.status === 200){
					  ElNotification({
					    title: 'Success',
					    message: '注册成功,进入首页',
					    type: 'success',
						
					  })
					  const response2 = await http.user.loginApi(registerForm)
					  if (response2.status === 200){
						  //保存用户token和用户信息
						  uStore.token = response2.data.token
						  uStore.userinfo = response2.data.user
						  // 修改认证状态
						  // if(registerForm.status){
						  						 //  uStore.isAuthenticated = true
						  // }
						  // console.log(uStore.token,uStore.userinfo)
						  // 跳转到home页面
						  router.push({name:"home"})
					  }

					}else{
						ElMessage({
							message: response.data.detail,
							type: 'error'
						})
					}
			}
		})
	}
	
	// 如果登录过，有用户信息，直接跳转首页
	onBeforeMount(()=>{
		if(uStore.isAuthenticated && uStore.token){
			ElMessage({
				message: '已登录，2s后跳转首页',
				type: 'info'
			})
			setTimeout(()=>{
				router.push('home')
			},2000)
		}
	})
	
</script>

<style scoped lang='scss'>
	.main{
		width: 100vw;
		height: 100vh;
		background: url('@/assets/images/register_bj.png');
		background-size: cover;
		.login_box{
			width: 500px;
			height: 600px;
			box-shadow:  0 0 5px var(--el-color-primary);
			position:absolute;
			top:calc(50vh - 300px);
			left: calc(50vw - 250px);
			border-radius: 20px;
			background-color: rgba(255, 255, 255, 0.8);
			
		}
		.head{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 150px;
			.logo{
				width: 60px;
				height: 60px;
				
			}
			.title{
				font-size: 30px;
				font-weight: bold;
				color: var(--el-color-warning);
				margin-left: 20px;
			}
		}
		.login-form{
			margin: 0 30px;
		}
	}

</style>