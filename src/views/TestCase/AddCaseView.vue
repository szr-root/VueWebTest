<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <div>编辑测试用例</div>
      </template>

      <template #main>
        <div>
          <el-input v-model="caseInfo.name" placeholder="输入用例名称">
            <template #prepend>用例名称</template>
          </el-input>

          <StepEdit v-model:steps="caseInfo.steps"></StepEdit>


        </div>


      </template>

      <template #bottom>
        <el-button type="primary" plain icon="CircleCheckFilled" @mousedown.stop @click="createCase">保 存</el-button>
        <el-button plain icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>

    </PageCard>

  </el-container>


</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import BrowserStep from '@/components/BrowserStep.vue'
import {ref, reactive} from "vue";
import {ProjectStore} from "@/stores/ProjectStore.js";
import http from '@/api/index'
import {ElMessage} from 'element-plus'
import {useRouter, useRoute} from 'vue-router'
import StepEdit from '@/components/StepEdit.vue'


const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()
//====创建用例====
const caseInfo = reactive({
  name: '新的用例',
  project_id: pstore.currentPro.id,
  steps: [
    {
      id: 1,
      desc: "启动一个浏览器，默认chrome",
      keyword: '启动浏览器',
      method: "open_browser",
      params: {
        "browser_type": "chromium"
      },
    }
  ]
})

async function createCase() {
  const response = await http.testcase.createCase(caseInfo)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `用例创建成功`,
    })
    back()
  }

}

//回退上一个页面
function back() {
  router.back()
  pstore.delTags(route.path)
}


</script>

<style scoped lang="scss">


</style>