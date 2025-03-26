<template>
  <PageCard>
    <template #title>
      <el-button @click="createModule" icon="Plus" type="primary">创建模块</el-button>
    </template>

    <template #main>
      <el-table :data="pstore.moduleList" border style="width: 100%">
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="模块名称"/>
        <el-table-column prop="suites" label="模块中测试套件数量"/>
        <el-table-column label="操作" width="320px">
          <template #default="scope">
            <el-button icon="View" type="primary" @click="clickView(scope.row.id)">查看详情</el-button>
            <el-button @click="editModule(scope.row.id)" icon="Edit" type="info" plain>编辑</el-button>
            <el-button @click="deleteModule(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #bottom>

    </template>

  </PageCard>


  <el-drawer v-model="drawer" title="模块中的套件" size="40%">
    <el-table
        :data="ModuleSuiteList"
        style="width: 100%;margin-top: 10px"
        border

    >
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ dataTools.rTime(scope.row.create_time) }}
        </template>
      </el-table-column>
      >
      <el-table-column label="套件名称" prop="name"/>
      <el-table-column label="套件类型" prop="suite_type"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="$router.push({name:'editSuites',params:{id:scope.row.id}})" plain type="primary" icon="Edit">编辑套件</el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-drawer>


</template>

<script setup>
import http from '@/api/index'
import {ref, reactive} from 'vue'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import dataTools from "@/tools/dataTools.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from 'vue-router'

const pstore = ProjectStore()
const router = useRouter()
//获取模块列表
pstore.getModuleList()


const drawer = ref(false)

const ModuleSuiteList = ref([])


const pageConfig = {
  page: 1,
  page_size: 10,
  total: 0
}


function clickView(id) {
  drawer.value = true
  getSuiteList(id)
}

async function getSuiteList(id) {
  const params = {
    project_id: pstore.currentPro.id,
    modules_id: id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.testcase.getSuiteList(params)
  if (response.status === 200) {
    ModuleSuiteList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

//创建模块
function createModule() {
  ElMessageBox.prompt('输入模块名称', '创建模块项目', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputPattern: /^.{1,20}$/,
    inputErrorMessage: '模块名称不能为空且不能超过20个字符',
  })
      .then(async ({value}) => {
        const resposne = await http.project.createModule({
          project_id: pstore.currentPro.id,
          name: value
        })
        if (resposne.status === 201) {
          ElMessage({
            type: 'success',
            message: `创建成功`,
          })
         await pstore.getModuleList()
        } else {
          ElMessage({
            type: 'error',
            message: `创建失败。` + resposne.data.detail,
          })
        }
      })
}

// 删除模块
function deleteModule(id) {
  ElMessageBox.confirm('此操作将永久删除该模块, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.project.deleteModule(id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
          pstore.getModuleList()
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败。` + resposne.data.detail,
          })
        }
      })
}

//编辑模块
function editModule(id) {
  ElMessageBox.prompt('修改模块名称', '编辑模块', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputPattern: /^.{1,20}$/,
    inputErrorMessage: '模块名称不能为空且不能超过20个字符',
  })
      .then(async ({value}) => {
        const resposne = await http.project.updateModule(id, value)
        if (resposne.status === 200) {
          ElMessage({
            type: 'success',
            message: `模块修改成功`,
          })
          pstore.getModuleList()
        } else {
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



</script>

<style scoped lang="scss">
</style>