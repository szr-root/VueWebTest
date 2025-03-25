<template>

  <PageCard>
    <template #title>
      套件报告详情
    </template>

    <template #main>
      <el-row v-if="SuiteReport">

        <!--左侧内容-->
        <el-col :span="12">
          <div class="title">
            <el-tag type="primary">执行结果概览</el-tag>
          </div>

          <el-descriptions
              :column="2"
              border
          >
            <el-descriptions-item label="执行状态">
              {{ SuiteReport.status }}
            </el-descriptions-item>

            <el-descriptions-item label="总耗时">
              {{ SuiteReport.duration?.toFixed(2)}}秒
            </el-descriptions-item>

            <el-descriptions-item label="通过率">
                {{ SuiteReport.pass_rate}}%
            </el-descriptions-item>

            <el-descriptions-item label="用例总数">
              {{ SuiteReport.all }}
            </el-descriptions-item>

            <el-descriptions-item label="成功">
              {{ SuiteReport.success }}
            </el-descriptions-item>

            <el-descriptions-item label="失败">
              {{ SuiteReport.fail }}
            </el-descriptions-item>

            <el-descriptions-item label="错误">
              {{ SuiteReport.fail }}
            </el-descriptions-item>

            <el-descriptions-item label="跳过">
              {{ SuiteReport.skip }}
            </el-descriptions-item>

            <el-descriptions-item label="未执行">
              {{ SuiteReport.no_run }}
            </el-descriptions-item>

          </el-descriptions>

          <div class="title">
             <el-tag type="primary">套件日志</el-tag>

          </div>
            <div class="logs_box">
              <div v-for="(log,index) in SuiteReport.suite_log" :key="index">{{log}}</div>
            </div>

          <div class="title">
             <el-tag type="primary">执行环境</el-tag>
          </div>

          <pre>{{SuiteReport.env}}</pre>


        </el-col>

        <!--右侧内容-->
        <el-col :span="12">
          <div> {{ SuiteReport }}</div>

        </el-col>


      </el-row>


    </template>

    <template #bottom>
      <el-button plain icon="CircleCloseFilled" @click="back">关 闭</el-button>
    </template>
  </PageCard>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import http from '@/api/index'
import {ref} from 'vue'


const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()

const suite_record_id = route.params.id

function back() {
  router.back()
  pstore.delTags(route.path)
}

const SuiteReport = ref({})

async function getSuiteDetail() {
  const response = await http.record.getSuiteRecordDetail(suite_record_id)
  if (response.status === 200) {
    SuiteReport.value = response.data
    console.log(response.data)
  }
}

getSuiteDetail()

</script>

<style scoped lang="scss">
  .title {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }

  .logs_box {
    border-radius: 10px;
    font-size: 12px;
    color: white;
    background-color: rgba(80, 77, 77, 0.91);
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
  }

</style>