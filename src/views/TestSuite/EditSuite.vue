<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <div>编辑测试套件</div>
      </template>

      <template #main>
        <div>

          <el-form :model="suiteInfo" label-width="auto" style="max-width: 600px">
            <el-form-item label="套件名称">
              <el-input v-model="suiteInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="所属业务流">
              <el-select v-model="suiteInfo.suite_type">
                <el-option label="业务流" value="业务流"/>
                <el-option label="功能模块" value="功能模块"/>
              </el-select>

            </el-form-item>

            <el-form-item label="所属模块">
              <el-select v-model="suiteInfo.modules_id">
                <el-option v-for="item in pstore.moduleList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>

          <StepEdit v-model:steps="suiteInfo.suite_setup_step"></StepEdit>


        </div>


      </template>

      <template #bottom>
        <el-button type="primary" plain icon="CircleCheckFilled" @mousedown.stop @click="updateSuite">保 存</el-button>
        <el-button plain icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>


    </PageCard>

    <!-- 显示套件中用例数据-->
    <SuiteToCase :suiteId="suite_id"></SuiteToCase>
    <!--项目所有用例列表-->
    <CaseSet></CaseSet>
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
import CaseSet from '@/views/TestSuite/componets/CaseSet.vue'
import SuiteToCase from '@/views/TestSuite/componets/SuiteToCase.vue'

const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()
const suite_id = route.params.id


const suiteInfo = ref({
  name: '新的套件',
  project_id: pstore.currentPro.id,
  modules_id: '',
  suite_setup_step: [],
  suite_type: '',
})

//获取套件详情
async function getSuiteInfo(suite_id) {
  const response = await http.testcase.getSuiteDetail(suite_id)
  if (response.status === 200) {
    suiteInfo.value = response.data
  }
}

getSuiteInfo(suite_id)


//回退上一个页面
function back() {
  router.back()
  pstore.delTags(route.path)
}


async function updateSuite() {
  const response = await http.testcase.updateSuite(suite_id, suiteInfo.value)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `套件修改成功`,
    })
    back()
  }

}


</script>

<style scoped lang="scss">


</style>