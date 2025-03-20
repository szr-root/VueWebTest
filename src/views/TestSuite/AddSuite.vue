<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <div>创建测试套件</div>
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
const suiteInfo = reactive({
  name: '新的套件',
  project_id: pstore.currentPro.id,
  modules_id: '',
  suite_setup_step: [],
  suite_type: '',
})

async function createCase() {
  const response = await http.testcase.createSuite(suiteInfo)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `套件创建成功`,
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