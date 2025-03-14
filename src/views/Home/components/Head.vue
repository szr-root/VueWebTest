<template>
	<div class="head_box">
		<!-- 左侧缩放按钮 -->	
		<div class="left_box">
			<el-button v-if="!pStore.isCollapsed" plain icon="Fold" @click="switchCollapse">  </el-button>
			<el-button v-else plain icon="Expand" @click="switchCollapse">  </el-button>
		</div>
		<!-- 中间名称显示 -->
		<div class="center_box">
			{{pStore.currentPro.name}}
		</div>
		<!-- 右侧个人信息区 -->
		<div class="right_box">
			<div class="box1">
				<el-button plain icon="Rank" @click="screenfull.toggle()">  </el-button>
			</div>
			<div class="box2">
				<el-button plain icon="Switch" class='box2'> 切换项目 </el-button>
			</div>
			<div class="box3">
				<el-dropdown>
					<el-button plain icon="User" > {{uStore.userinfo.nickname}} </el-button>
					<template #dropdown>
						<el-button plain icon="User" @click='logout'> 退出登录 </el-button>
					</template>			
				</el-dropdown>
			</div>
			  
		</div>
	</div>
</template>

<script setup>
	import screenfull from 'screenfull'
	import {ProjectStore} from '@/stores/ProjectStore'
	import {UserStore} from '@/stores/UserStore'
	import {useRouter} from 'vue-router'
	
	const pStore = ProjectStore()
	const uStore = UserStore()
	const router = useRouter()
	
	
	const switchCollapse = ()=>{
		pStore.isCollapsed = !pStore.isCollapsed
	}
	
	const logout = ()=>{
		pStore.$reset()
		uStore.$reset()
		router.push('login')
	}
	
	
	
</script>

<style scoped lang="scss">
	.head_box{
		height: 55px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.center_box{
			height: 45px;
			font: bold 20px/45px "微软雅黑";
			border: 1px dashed var(--el-color-primary);
			border-radius: 15px;
			padding:0 32px
		}
		.right_box{
			display: flex;
			.box1,.box2{
				margin-left: 0;
				margin-right: 10px;
			}
			
		}
	}
</style>