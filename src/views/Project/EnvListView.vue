<template>
  <PageCard>
    <template #title>
      <el-button @click="clickAddEnv" icon="Plus" type="primary">新增环境</el-button>
    </template>

    <template #main>
      <el-table :data="pstore.envList" border style="width: 100%">
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="环境名称"/>
        <el-table-column prop="host" label="BaseURL" min-width="200px"/>
        <el-table-column prop="global_vars" label="全局变量" min-width="300px" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.global_vars }}
          </template>
        </el-table-column>
        >
        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <!--            <el-button icon="View" type="primary">查看详情</el-button>-->
            <el-button @click="editEnv(scope.row)" icon="Edit" type="info" plain>编辑</el-button>
            <el-button @click="deleteEnv(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #bottom>

    </template>
  </PageCard>

  <el-dialog v-model="dialogFormVisible" :title="title" width="500" center>
    <el-form :model="EnvForm">
      <el-form-item label="环境名称" >
        <el-input v-model="EnvForm.name" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="BaseURL" >
        <el-input v-model="EnvForm.host" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="全局变量" >
        <CodeEdit v-model="EnvForm.global_vars"></CodeEdit>
<!--        <el-input v-model="EnvForm.global_vars" autocomplete="off"/>-->
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="title==='创建环境'" type="primary" @click="createEnv">确 认</el-button>
        <el-button v-else type="primary" @click="updateEnv">确 认</el-button>
      </div>
    </template>
  </el-dialog>


</template>

<script setup>
import http from '@/api/index'
import {ref, reactive} from 'vue'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import dataTools from "@/tools/dataTools.js";
import {ElMessage, ElMessageBox} from "element-plus";
import CodeEdit from "@/components/CodeEdit.vue"

const pstore = ProjectStore()
pstore.getEnvList()


//创建环境
const dialogFormVisible = ref(false)
const title = ref('创建环境')


let EnvForm = reactive({
  project_id: pstore.currentPro.id,
  name: '',
  host: '',
  global_vars: {},
})

function clickAddEnv() {
  title.value = '创建环境'
  dialogFormVisible.value = true
  EnvForm.name = ''
  EnvForm.host = ''
  EnvForm.global_vars = {}
}

async function createEnv() {
  const params = {
    project_id: pstore.currentPro.id,
    name: EnvForm.name,
    host: EnvForm.host,
    global_vars: JSON.parse(EnvForm.global_vars),
  }

  const response = await http.project.createEnv(params)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `创建成功`,
    })
    dialogFormVisible.value = false
    pstore.getEnvList()
  }
}

//删除环境
function deleteEnv(id) {
  ElMessageBox.confirm('此操作将永久删除该环境, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.project.deleteEnv(id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
          pstore.getEnvList()
        }
      })
}

//编辑环境
function editEnv(env) {
  title.value = '编辑环境'
  dialogFormVisible.value = true
  EnvForm.id = env.id
  EnvForm.name = env.name
  EnvForm.host = env.host
  EnvForm.global_vars =env.global_vars
}

async function updateEnv() {
  const params = {
    name: EnvForm.name,
    host: EnvForm.host,
    global_vars: JSON.parse(EnvForm.global_vars),
  }

  const response = await http.project.updateEnv(EnvForm.id,params)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `修改成功`,
    })
    dialogFormVisible.value = false
    pstore.getEnvList()
  }else{
    ElMessage({
      type: 'error',
      message: `修改失败`,
    })
  }
}

</script>

<style scoped lang="scss">

</style>