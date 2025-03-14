<template>
	<!-- 顶部logo与文字 -->
	<div class="logo">
		<img src="@/assets/images/logo.png" alt="logo">
		<div class="title">WEB自动化测试平台</div>
	</div>
	
	<el-menu
					router
	        :default-active="$route.path"
	        class="el-menu-vertical-demo"
					:collapse="pStore.isCollapsed"
	>

	
			<el-sub-menu :index="item.index" v-for="item in leftMenu" :key="item.index" :disabled = "pStore.showMenu">
				
				<template #title>
					<img :src='item.iconImg' alt="pro" width="20px" style="margin-right: 10px;">
					<span>{{item.name}}</span>
				</template>
				
				<el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
					<template #title>
						<img :src='child.iconImg' alt="pro" width="20px" style="margin-right: 10px;">
						<span>{{child.name}}</span>
					</template>
				</el-menu-item>
				
			</el-sub-menu>
			
	        
	</el-menu>
	
	
	
</template>

<script setup>
	import {leftMenu} from '@/datas/leftMenu.js';
	import {ProjectStore} from "@/stores/ProjectStore";
	
	const pStore = ProjectStore();
	
</script>

<style scoped lang="scss">
	.logo{
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		img{
			width: 60px;
			height: 60px;
		}
		.title{
			margin-left: 5px;
			font-size: 14px;
			font-weight: bold;
			color: var(--el-color-primary);
			// 内容移除影藏
			overflow: hidden;
			// 禁止自动换行
			white-space: nowrap;
		}
	}
	
	.el-menu{
		border-radius: none;
		height: calc(100vh - 60px);
		overflow-y: auto;
	}
	
	// 修改菜单项样式
	.el-menu-item{
		box-shadow:inset 0 0 2px var(--el-color-info);
		margin: 5px;
		height: 35px;
		width: 180px;
		border-radius: 10px;
		
		&.is-active{
			color: var(--el-color-primary);
			border: 1px dashed var(--el-color-primary);
		}
	}
	
</style>