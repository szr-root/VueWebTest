<template>
		<el-tabs type='card' :model-value="$route.path" class="demo-tabs" @tab-click="handleClick" @tab-remove="removeTag">
			<div v-for="item in pStore.tags">
				<el-tab-pane :name="item.path" v-if="item.path === $route.path">
					<template #label>
						<span class="tag_box">
							<img :src="item.iconImg" width="20px" :alt="item.name">
							<span style="margin-left:5px;">{{item.name}}</span>
						</span>
					</template>
				</el-tab-pane>
				
				<el-tab-pane :name="item.path" v-else closable>
					<template #label>
						<span class="tag_box">
							<img :src="item.iconImg" width="20px" :alt="item.name">
							<span style="margin-left:5px;">{{item.name}}</span>
						</span>
					</template>
				</el-tab-pane>
				
			</div>
			
		</el-tabs>
</template>

<script setup>
	import {ProjectStore} from '@/stores/ProjectStore'
	import {useRouter} from 'vue-router'
	const pStore = ProjectStore()
	const router = useRouter()
	
	const handleClick =(ele) =>{
		console.log(ele)
		router.push(ele.props.name)
	}
	
	function removeTag(name){
		pStore.delTags(name)
	}
	
</script>

<style scoped>
	.demo-tabs{
		margin-left: 5px;
	}
	.tag_box{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>