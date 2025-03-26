<template>
  <el-table
      :data="CaseRecordList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
  >
    <el-table-column type="expand">
      <template #default="props">
        <CaseReport :run_info="props.row.run_info"></CaseReport>
      </template>
    </el-table-column>
    <el-table-column label="用例名称">
      <template #default="scope">
        {{ scope.row.run_info.name }}
      </template>
    </el-table-column>

    <el-table-column label="是否跳过">
      <template #default="scope">
        {{ scope.row.run_info.skip }}
      </template>
    </el-table-column>

    <el-table-column label="执行状态" prop="state"></el-table-column>

    <el-table-column label="是否套件执行">
      <template #default="scope">
        <div  v-if="scope.row.suite_run_records_id != null">
          套件record：{{ scope.row.suite_run_records_id }}
        </div>
        <div v-else>
          单用例执行执行
        </div>

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
      @size-change="getCaseRecord"
      @current-change="getCaseRecord"
  />
  </div>


</template>

<script setup>
import http from '@/api/index.js'
import {ref, watch} from 'vue'
import CaseReport from '@/components/CaseReport.vue'

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
const CaseRecordList = ref([])

// 获取当前用例执行记录
async function getCaseRecord() {
  const params = {
    suite_records_id: props.suite_id,
    page: pageConfig.page,
    page_size: pageConfig.page_size
  }
  const response = await http.record.getCaseRecordList(params)
  if (response.status === 200) {
    CaseRecordList.value = response.data.data
    pageConfig.total = response.data.total
  }
}

// 监听 case_id 的变化
watch(
    () => props.suite_id,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        getCaseRecord()
      }
    }
)


getCaseRecord()


function tableRowClassName({row, rowIndex}) {
  if (row.run_info.state === 'success') {
    return 'success-row'
  } else if (row.run_info.state === 'failed') {
    return 'warning-row'
  } else if (row.run_info.state === 'error') {
    return 'error-row'
  } else {
    return 'info-row'
  }
}


</script>

<style scoped>
.page_box {
  margin-top: 10px;
}

</style>