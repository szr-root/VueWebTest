<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <el-icon size="20" color="var(--el-color-info)"><Edit/></el-icon>
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
        <el-button type="primary" plain icon="CircleCheckFilled" @mousedown.stop @click="updateCase">保 存</el-button>
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

const caseInfo = reactive({
  name: '',
  steps: []
})

//获取用例id，请求获取详情
const case_id = route.params.id
async function getCaseDetail() {
  const response =await http.testcase.getCaseDetail(case_id)
  if(response.status === 200){
    caseInfo.name = response.data.name
    caseInfo.steps = response.data.steps
  }
}

getCaseDetail()

async function updateCase() {
  const response = await http.testcase.updateCase(case_id,caseInfo)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `用例编辑成功`,
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