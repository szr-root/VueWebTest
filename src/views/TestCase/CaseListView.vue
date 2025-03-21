<template>
  <PageCard>
    <template #title>
      <el-button @click="$router.push({name:'addCase'})" icon="Plus" type="primary">新增用例</el-button>
    </template>

    <template #main>
      <el-table :data="caseList" border style="width: 100%">
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用例名称" show-overflow-tooltip/>
        <el-table-column prop="run_count" label="历史执行次数"/>
        <el-table-column prop="state" label="最近一次执行状态"/>
        <el-table-column prop="steps" label="步骤数"/>

        >
        <el-table-column label="操作" width="510px">
          <template #default="scope">
            <el-button icon="Promotion" type="primary" @click="clickRun(scope.row.id)">运行</el-button>
            <el-button @click="editEnv(scope.row)" icon="View" plain>执行记录</el-button>
            <el-button @click="$router.push({name:'editCase',params:{id:scope.row.id}})" icon="Edit" plain>编辑
            </el-button>
            <el-button @click="copyCase(scope.row.id)" icon="DocumentCopy" plain>复制</el-button>
            <el-button @click="deleteCase(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
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
          @size-change="getCaseeList"
          @current-change="getCaseeList"
      />
    </template>

  </PageCard>
  <el-dialog v-model="showRunDlg" title="运行用例" width="500" center>
    <el-form :model="runParams">
      <el-form-item label="测试环境" :label-width="formLabelWidth">
        <el-select v-model="runParams.env_id" placeholder="选择运行的环境">
          <el-option v-for="env in pstore.envList" :label="env.name" :value="env.id" :key="env.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="测试环境" :label-width="formLabelWidth">
        <el-select v-model="runParams.browser_type" placeholder="选择浏览器">
          <el-option label="chromium" value="chromium"/>
          <el-option label="firebox" value="firebox"/>
          <el-option label="webkit" value="webkit"/>
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showRunDlg = false">取 消</el-button>
        <el-button type="primary" @click="runCase">
          确定
        </el-button>
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

const pageConfig = reactive({
  total: 0,
  size: 10,
  page: 1
})

const pstore = ProjectStore()

const caseList = ref([])

async function getCaseeList() {
  const params = {
    project_id: pstore.currentPro.id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.testcase.getCaseList(params)
  if (response.status === 200) {
    caseList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

getCaseeList()

//创建用例

//删除用例
function deleteCase(id) {
  ElMessageBox.confirm('此操作将永久删除该用例, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.testcase.deleteCase(id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
          getCaseeList()
        }
      })
}

//复制用例
function copyCase(id) {
  ElMessageBox.confirm('确认复制?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'info',
  })
      .then(async () => {
        const resposne = await http.testcase.copyCase(id)
        if (resposne.status === 201) {
          ElMessage({
            type: 'success',
            message: `复制成功`,
          })
          getCaseeList()
        }
      })
}

//编辑用例
function editEnv(env) {
  title.value = '编辑环境'
  dialogFormVisible.value = true
  EnvForm.id = env.id
  EnvForm.name = env.name
  EnvForm.host = env.host
  EnvForm.global_vars = env.global_vars
}

async function updateEnv() {
  const params = {
    name: EnvForm.name,
    host: EnvForm.host,
    global_vars: JSON.parse(EnvForm.global_vars),
  }

  const response = await http.project.updateEnv(EnvForm.id, params)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `修改成功`,
    })
    dialogFormVisible.value = false
    pstore.getEnvList()
  } else {
    ElMessage({
      type: 'error',
      message: `修改失败`,
    })
  }
}

//====================== 运行用例 ======================
const showRunDlg = ref(false)
const runParams = ref({
  env_id: null,
  browser_type: "chromium",
  case_id: 1,
})

function clickRun(case_id) {
  showRunDlg.value = true
  runParams.value.case_id = case_id
}


async function runCase() {
  const params = {
    env_id: runParams.value.env_id,
    browser_type: runParams.value.browser_type,
  }
  const response = await http.run.runCase(runParams.value.case_id, params)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `用例已添加到执行队列中，准备开始执行用例`,
    })
  } else {
    ElMessage({
      type: 'error',
      message: `启动执行失败`,
    })
  }
}


</script>

<style scoped lang="scss">

</style>