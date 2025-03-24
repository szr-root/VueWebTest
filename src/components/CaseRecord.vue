<template>
  <el-table
      :data="CaseRecordList"
      :border="parentBorder"
      style="width: 100%"
  >
    <el-table-column type="expand">
      <template #default="props">

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

  </el-table>
</template>

<script setup>
import http from '@/api/index'
import {ref} from 'vue'

// 定义props用例获取用例id
const props = defineProps({
  case_id: {
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
    case_id: props.case_id,
    page: pageConfig.page,
    page_size: pageConfig.page_size
  }
  const response = await http.record.getCaseRecordList(params)
  if (response.status === 200) {
    CaseRecordList.value = response.data.data

  }
}

getCaseRecord()

</script>

<style scoped>

</style>