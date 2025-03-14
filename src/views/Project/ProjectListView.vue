<template>
	<PageCard>
		<template #title>
			<el-button icon="Plus" type="primary" @click="isDlgShow = true">添加项目</el-button>
		</template>
		
		<template #main>
			  <el-table :data="proList" border style="width: 100%">
			    <el-table-column prop="create_time" label="创建时间" width="180" />
			    <el-table-column prop="name" label="项目名称"/>
			    <el-table-column prop="user" label="创建人" />
					<el-table-column label="操作"  width="320px" >
						<template #default="scope">
							<div v-if="scope.row.id == pstore.currentPro.id">
								<el-button disabled @click="switchProject(scope.row)" icon="Switch" type="primary">切换项目</el-button>
								<el-button disabled @click="editProject(scope.row)" icon="Edit" type="info" plain>编辑</el-button>
								<el-button disabled @click="delProject(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
							</div>
							<div v-else>
								<el-button  @click="switchProject(scope.row)" icon="Switch" type="primary">切换项目</el-button>
								<el-button  @click="editProject(scope.row)" icon="Edit" type="info" plain>编辑</el-button>
								<el-button  @click="delProject(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
							</div>
						</template>
					</el-table-column>
			  </el-table>
		</template>
		
		<template #bottom>
			<el-pagination
			      v-model:current-page="pageConfig.page"
			      v-model:page-size="pageConfig.size"
			      :page-sizes="[5, 10, 20, 50]"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="pageConfig.total"
			      @size-change="getAllProject"
			      @current-change="getAllProject"
			    />
		</template>

	</PageCard>
	
	<!-- 创建项目弹框 -->
	  <el-dialog v-model="isDlgShow" title="创建项目" width="500">
	    <el-form :model="formData">
	      <el-form-item label="项目名称">
	        <el-input v-model="formData.name" autocomplete="off" />
	      </el-form-item>
	    </el-form>
	    <template #footer>
	      <div class="dialog-footer">
	        <el-button @click="isDlgShow = false">取 消</el-button>
	        <el-button type="primary" @click="addProject">确 认</el-button>
	      </div>
	    </template>
	  </el-dialog>
	
	
</template>

<script setup>
	import http from '@/api/index'
	import {ref,reactive} from 'vue'
	import PageCard from '@/components/PageCard.vue'
	import {UserStore} from '@/stores/UserStore'
	import {ProjectStore} from '@/stores/ProjectStore'
	import { ElMessage,ElMessageBox,ElNotification} from 'element-plus'
	import {useRouter} from 'vue-router'
	
	const proList = ref([])
	const ustore = UserStore()
	const pstore = ProjectStore()
	const router = useRouter()
	
	
	//==============获取项目信息（分页）==============
	const pageConfig = reactive({
		total:0,
		size:10,
		page:1
	})
	
	const getAllProject = async() =>{
		const response = await http.project.getProjectList(pageConfig.page,pageConfig.size)
		if (response.status === 200){
			//保存项目数据
			proList.value = response.data.data
			pageConfig.total = response.data.total
		}
	}
	
	getAllProject()
	
	//==============创建项目==============
	
	let isDlgShow = ref(false)
	let formData = reactive({
		name:'new project',
		user: ustore.userinfo.id
	})
	
	async function addProject(){
		const response = await http.project.createProject(formData)
		if(response.status === 201){
			isDlgShow.value = false
			ElMessage({
			    message: '项目创建成功',
			    type: 'success',
					duration:3000
			  })
			getAllProject()
		}
	}
	
	
	//==============删除项目==============
	function delProject(id){
		ElMessageBox.confirm(
		    '确定删除?\n 删除后不可恢复',
		    '警告',
		    {
		      confirmButtonText: '确 认',
		      cancelButtonText: '取 消',
		      type: 'warning',
		    }
		  )
		    .then(async () => {
					const response = await http.project.deleteProject(id)
					if(response.status === 204){
						ElMessage({
						  type: 'success',
						  message: '删除成功',
						})
						getAllProject()
					}
					else{
						ElMessage({
						  type: 'error',
						  message: '删除失败' + response.data.detail,
						})
					}
		    })
		    .catch(() => {
		      ElMessage({
		        type: 'info',
		        message: '取消删除',
		      })
		    })
	}
	
	//==============编辑项目==============
	function editProject(pro){
		 ElMessageBox.prompt('更改项目名称', '编辑项目', {
		    confirmButtonText: '确 认',
		    cancelButtonText: '取 消',
		    inputPattern: /^.{1,20}$/,
		    inputErrorMessage: '项目名称不能为空且不能超过20个字符',
		  })
		    .then(async ({ value }) => {
					const resposne = await http.project.updateProject(pro.id,value)
					if(resposne.status===200){
						ElMessage({
							type: 'success',
							message: `修改成功`,
						})	
						getAllProject()
					}
					else{
						ElMessage({
							type: 'error',
							message: `修改失败。` + resposne.data.detail,
						})
					}
		    })
		    .catch(() => {
		      ElMessage({
		        type: 'info',
		        message: '取消修改',
		      })
		    })
	}
	
	//========切换项目=========
	function switchProject(pro){
		//1.保存当前选中的项目信息
		pstore.currentPro = {
			id:pro.id,
			name:pro.name
		}
		//2.激活左侧菜单
		pstore.showMenu = false
		//3.跳转功能模块页面
		router.push({name:"module"})
		//4.提示切换项目成功
		 ElNotification({
		    title: '切换成功',
		    message: `已切换到 ${pro.name}`,
		    type: 'success',
       duration: 3000,
		  })
	}
	
</script>

<style scoped>
	.confirm_button{
		background-color: red;

	}
</style>