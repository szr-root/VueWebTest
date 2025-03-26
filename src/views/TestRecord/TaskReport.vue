<template>
  <PageCard v-if="TaskRecord">
    <template #title>
      测试任务报告： 【{{ TaskRecord.task_name }}】
    </template>

    <template #main>
      <!-- 任务执行概况-->
      <div class="title_info">
        <div>执行时间:{{ dataTools.rTime(TaskRecord?.start_time) }}</div>
        <div>任务名称:{{ TaskRecord?.task_name }}</div>
        <div>执行环境</div>
      </div>
      <div class="card_box">
        <div class="info">
          <div class="title">通过率</div>
          <div class="value">{{ (TaskRecord.success / TaskRecord.run_all * 100).toFixed(2) }}%</div>
        </div>

        <div class="info">
          <div class="title">用例总数</div>
          <div class="value">{{ TaskRecord?.all }}</div>
        </div>

        <div class="info">
          <div class="title">通过</div>
          <div class="value" style="color:#54c454;">{{ TaskRecord?.success }}</div>
        </div>

        <div class="info">
          <div class="title">失败</div>
          <div class="value" style="color:orange;">{{ TaskRecord?.fail }}</div>
        </div>

        <div class="info">
          <div class="title">错误</div>
          <div class="value" style="color: red">{{ TaskRecord.error }}</div>
        </div>

        <div class="info">
          <div class="title">跳过</div>
          <div class="value" style="color:grey;">{{ TaskRecord?.skip }}</div>
        </div>

        <div class="info">
          <div class="title">套件数量</div>
          <div class="value" style="color:grey;">{{ pageConfig.total }}</div>
        </div>

      </div>


      <el-table
          :data="SuiteRecordList"
          style="width: 100%;margin-top: 10px"
          border

      >
        <el-table-column label="执行耗时">
          <template #default="scope">
            {{ scope.row.duration.toFixed(2) }} 秒
          </template>
        </el-table-column>
        >
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
            @size-change="getTaskSuite"
            @current-change="getTaskSuite"
        />
      </div>

      <!-- 任务中套件列表-->
    </template>

    <template #bottom>
      <el-button plain icon="CircleCloseFilled" @click="back">关 闭</el-button>
    </template>


  </PageCard>


</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import http from '@/api/index'
import {onMounted, ref} from 'vue'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import dataTools from "@/tools/dataTools.js";

const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()

//获取任务执行记录id
const task_run_record_id = route.params.id

const TaskRecord = ref(null)

async function getTaskRecordDetail() {
  const resposne = await http.record.getTaskRecordDetail(task_run_record_id)
  if (resposne.status === 200) {
    TaskRecord.value = resposne.data
  }
}


const SuiteRecordList = ref(null)

const pageConfig = {
  page: 1,
  page_size: 10,
  total: 0
}

//获取任务中所有套件的信息
async function getTaskSuite() {
  const params = {
    task_records_id: task_run_record_id,
    page: 1,
    page_size: 10
  }
  const response = await http.record.getSuiteRecordList(params)
  if (response.status === 200) {
    SuiteRecordList.value = response.data.data
    pageConfig.total = response.data.total
  }
}


onMounted(() => {
  getTaskRecordDetail()
  getTaskSuite()
})

function toSuiteReport(id){
  router.push({name:'suiteReport',params:{id:id}})
}

function back() {
  router.back()
  pstore.delTags(route.path)
}
</script>

<style scoped lang="scss">
.title_info {
  display: flex;
  height: 40px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-evenly;
}

.card_box {
  display: flex;
  justify-content: space-evenly;

  .info {
    width: 160px;
    height: 100px;
    box-shadow: 0 0 2px var(--el-color-info);
    border-radius: 10px;

    .title {
      font: bold 16px/50px '微软雅黑';
      height: 50px;
      text-align: center;
    }

    .value {
      color: var(--el-color-primary);
      font-size: 16px;
      line-height: 50px;
      height: 50px;
      text-align: center;
    }
  }
}

.page_box {
  margin-top: 10px;
}
</style>