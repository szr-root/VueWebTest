<template>
    <el-container>
      <el-aside :style="{height:'100vh',width:pStore.isCollapsed? '65px' : '200px'}">
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-container>
				<el-header>
					<Head></Head>
				</el-header>
				<el-main>
					<Tag></Tag>
					<!-- 路由出口 -->
					<router-view></router-view>
				</el-main>
				<el-footer>	
					<Footer></Footer>
				</el-footer>
			</el-container>
    </el-container>
</template>

<script setup>
	// import {UserStore} from '@/stores/UserStore'
	import Head from './components/Head.vue'
	import Tag from './components/Tag.vue'
	import Footer from './components/Footer.vue'
	import {ProjectStore} from '@/stores/ProjectStore'
	import LeftMenu from './components/LeftMenu.vue'
	// const uStore = UserStore()
	const pStore = ProjectStore()
	
	
</script>

<style scoped lang="scss">
	.el-container{
		.el-aside{
			height: 100vh;
			box-shadow: 0 0 5px var(--el-color-info);
			transition: width 0.3s ease-in-out;
		}
		.el-header{
			height: 55px;
			box-shadow: 3px 0 5px var(--el-color-info);
		}
		.el-main{
			padding: 2px;
			margin: 0 ;
		}
		
		.el-footer{
			height: 30px;
			box-shadow: 3px 1px 5px var(--el-color-info);
		}
	}
	
</style>