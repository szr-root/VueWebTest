<template>
  <el-table
      :data="SuiteRecordList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
  >
    <el-table-column label="执行耗时">
      <template #default="scope">
        {{ scope.row.duration.toFixed(2) }} 秒
      </template>
    </el-table-column>>
    <el-table-column label="执行状态" prop="status"/>
    <el-table-column label="通过率(%)" prop="pass_rate"/>
    <el-table-column label="用例总数" prop="all"/>
    <el-table-column label="成功" prop="success"/>
    <el-table-column label="失败" prop="fail"/>
    <el-table-column label="错误" prop="error"/>
    <el-table-column label="跳过" prop="skip"/>
    <el-table-column label="未运行" prop="no_run"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="toSuiteReport(scope.row.id)" plain type="primary" icon="View">查看详情</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div class="page_box">
    <el-pagination
        v-model:current-page="pageConfig.page"
        v-model:page-size="pageConfig.size"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageConfig.total"
        @size-change="getSuiteRecord"
        @current-change="getSuiteRecord"
    />
  </div>


</template>

<script setup>
import http from '@/api/index'
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'

// 定义props用例获取用例id
const props = defineProps({
  suite_id: {
    type: Number,
    default: 0
  }
})


const pageConfig = {
  page: 1,
  page_size: 10,
  total: 0
}

//用例执行记录
const SuiteRecordList = ref([])

// 获取当前用例执行记录
async function getSuiteRecord() {
  const params = {
    suite_id: props.suite_id,
    page: pageConfig.page,
    page_size: pageConfig.page_size
  }
  const response = await http.record.getSuiteRecordList(params)
  if (response.status === 200) {
    SuiteRecordList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

// 监听 suite_id 的变化
watch(
    () => props.suite_id,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        getSuiteRecord()
      }
    }
)


getSuiteRecord()

function tableRowClassName({row, rowIndex}) {
  // console.log(row)

  if (row.pass_rate === 100) {
    return 'success-row'
  } else {
    return 'warning-row'
  }
}

const router = useRouter()

function toSuiteReport(id){
  router.push({name:'suiteReport',params:{id:id}})
}

</script>

<style scoped>
.page_box {
  margin-top: 10px;
}


</style>