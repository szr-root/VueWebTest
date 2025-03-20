<template>
  <PageCard>
    <template #title>
      <el-button @click="createTask" icon="Plus" type="primary">创建任务</el-button>
    </template>

    <template #main>
      <el-table :data="pstore.taskList" border style="width: 100%">
        <el-table-column prop="create_time" label="创建时间" width="200px">
          <template #default="scope">
            {{ dataTools.rTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="任务名称"/>
        <el-table-column prop="suites_count" label="任务中测试套件数量"/>
        <el-table-column prop="run_times" label="执行次数"/>
        <el-table-column label="操作" width="410px">
          <template #default="scope">
            <el-button icon="Promotion" type="primary">运行</el-button>
            <el-button icon="View" type="primary">执行记录</el-button>
            <el-button @click="$router.push({name:'editTask',params:{id:scope.row.id}})" icon="Edit" type="info" plain>编辑</el-button>
            <el-button @click="deleteTask(scope.row.id)" icon="Delete" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #bottom>

    </template>

  </PageCard>

</template>

<script setup>
import http from '@/api/index'
import {ref, reactive} from 'vue'
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from '@/stores/ProjectStore'
import dataTools from "@/tools/dataTools.js";
import {ElMessage, ElMessageBox} from "element-plus";

const pstore = ProjectStore()

//获取任务数据列表
pstore.getTaskList()


//创建模块
function createTask() {
  ElMessageBox.prompt('输入任务名称', '创建任务', {
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputPattern: /^.{1,20}$/,
    inputErrorMessage: '任务名称不能为空且不能超过20个字符',
  })
      .then(async ({value}) => {
        const resposne = await http.task.createTask({
          project_id: pstore.currentPro.id,
          name: value
        })
        if (resposne.status === 201) {
          ElMessage({
            type: 'success',
            message: `创建成功`,
          })
          pstore.getTaskList()
        } else {
          ElMessage({
            type: 'error',
            message: `创建失败。` + resposne.data.detail,
          })
        }
      })
}

// 删除模块
function deleteTask(id) {
  ElMessageBox.confirm('此操作将永久删除该任务, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.task.deleteTask(id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
          pstore.getTaskList()
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败。` + resposne.data.detail,
          })
        }
      })
}

//编辑模块


</script>

<style scoped lang="scss">
</style>