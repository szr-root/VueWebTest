<template>
  <PageCard>
    <template #title>
      执行记录
    </template>

    <template #main>
      <el-table :data="TaskRecordList" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="create_time" label="开始运行时间">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="task_name" label="执行任务"/>
        <el-table-column prop="status" label="执行状态"/>
        <el-table-column prop="all" label="用例总数"/>
        <el-table-column prop="success" label="通过数"/>
        <el-table-column prop="fail" label="失败数"/>
        <el-table-column prop="error" label="错误数"/>
        <el-table-column prop="skip" label="跳过"/>
        <el-table-column prop="no_run" label="未运行"/>


        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <el-button icon="View" type="info" plain @click="toTaskReport(scope.row.id)">查看测试报告</el-button>
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
          @size-change="getTaskRecordList"
          @current-change="getTaskRecordList"
      />
    </template>
  </PageCard>


</template>

<script setup>
import http from '@/api/index'
import {ref, reactive,watch} from 'vue'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import dataTools from "@/tools/dataTools.js";
import {ElMessage, ElMessageBox} from "element-plus";
import CodeEdit from "@/components/CodeEdit.vue"
import {useRouter} from 'vue-router'

const pstore = ProjectStore()
const router = useRouter()
const TaskRecordList = ref([])

const props = defineProps({
  task_id: {
    type: Number,
    default: 0
  }
})


const pageConfig = reactive({
  total: 0,
  size: 10,
  page: 1
})


async function getTaskRecordList() {
  const params = {
    project_id: pstore.currentPro.id,
    task_id: props.task_id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.record.getTaskRecordList(params)
  if (response.status === 200) {
    TaskRecordList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

function tableRowClassName({row, rowIndex}) {
  if (row.status === '执行完成') {
    return 'success-row'
  } else{
    return 'info-row'
  }
}

getTaskRecordList()


function toTaskReport(task_id){
  router.push({name:'taskReport',params:{id:task_id}})
}

watch(
    () => props.task_id,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        getTaskRecordList()
      }
    }
)

</script>

<style scoped lang="scss">

</style>