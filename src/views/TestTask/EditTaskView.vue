<template>
  <el-container>
    <PageCard>
      <template #title>
        任务中套件信息
      </template>

      <template #main>
<!--        <el-form label-width="120px">-->
<!--          <el-form-item label="任务名称">-->
<!--            <el-input v-model="form.name" placeholder="请输入任务名称"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="任务描述">-->
<!--            <el-input v-model="form.desc" placeholder="请输入任务描述"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
      </template>

      <template #bottom>
        <el-button type="primary" icon="CircleCheckFilled">  保 存</el-button>
        <el-button icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>
    </PageCard>

    <PageCard>
      <template #title>
        项目中所有套件
      </template>

      <template #main>

      </template>
    </PageCard>

  </el-container>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from "@/stores/ProjectStore.js";
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()


function back() {
  router.back()
  pstore.delTags(route.path)
}

</script>

<style scoped lang="scss">

</style>