<template>
  <PageCard>
    <template #title>
      <el-button @click="$router.push({name:'addSuites'})" icon="Plus" type="primary">新增套件</el-button>
    </template>

    <template #main>
      <el-table :data="suiteList" border style="width: 100%">
        <el-table-column prop="create_time" label="创建时间">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="套件名称" show-overflow-tooltip/>
        <el-table-column prop="suite_type" label="套件类型" show-overflow-tooltip/>
        <el-table-column prop="modules" label="所属模块" show-overflow-tooltip/>
        <el-table-column prop="case_count" label="用例数量"/>
        <el-table-column prop="suite_setup_step" label="前置步骤数"/>
        <el-table-column prop="run_count" label="历史执行次数"/>
        >
        <el-table-column label="操作" width="510px">
          <template #default="scope">
            <el-button icon="Promotion" type="primary" @click="clickRun(scope.row.id)">运行</el-button>
            <el-button  icon="View" plain>执行记录</el-button>
            <el-button @click="$router.push({name:'editSuites',params:{id:scope.row.id}})" icon="Edit" plain>编辑
            </el-button>
            <el-button @click="deleteSuite(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
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
          @size-change="getSuiteList"
          @current-change="getSuiteList"
      />
    </template>


  </PageCard>


  <el-dialog v-model="showRunDlg" title="运行套件" width="500" center>
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
        <el-button type="primary" @click="runSuite">
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

const suiteList = ref([])

async function getSuiteList() {
  const params = {
    project_id: pstore.currentPro.id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.testcase.getSuiteList(params)
  if (response.status === 200) {
    suiteList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

getSuiteList()


//删除用例
function deleteSuite(id) {
  ElMessageBox.confirm('此操作将永久删除该套件, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.testcase.deleteSuite(id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `套件删除成功`,
          })
          getSuiteList()
        }
      })
}


//====================== 运行套件 ======================
const showRunDlg = ref(false)
const runParams = ref({
  env_id: null,
  browser_type: "chromium",
  suite_id: 1,
})

function clickRun(suite_id) {
  showRunDlg.value = true
  runParams.value.suite_id = suite_id
}


async function runSuite () {
  const params = {
    env_id: runParams.value.env_id,
    browser_type: runParams.value.browser_type,
  }
  const response = await http.run.runSuite(runParams.value.suite_id, params)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: response.data.msg,
    })
  } else {
    ElMessage({
      type: 'error',
      message: `启动执行失败`,
    })
  }
  showRunDlg.value = false
}



</script>

<style scoped lang="scss">

</style>