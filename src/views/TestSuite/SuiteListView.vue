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
            <el-button icon="Promotion" type="primary">运行</el-button>
            <el-button @click="editEnv(scope.row)" icon="View" plain>执行记录</el-button>
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


</script>

<style scoped lang="scss">

</style>