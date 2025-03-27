<template>

  <PageCard>
    <template #title>
      分布式设备管理
    </template>

    <template #main>
      <el-table :data="deviceList" border style="width: 100%">

        <el-table-column prop="id" label="id" show-overflow-tooltip/>
        <el-table-column prop="name" label="名称" show-overflow-tooltip/>
        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip/>
        <el-table-column prop="status" label="状态"/>
        <el-table-column prop="system" label="操作系统"/>

        <el-table-column label="操作" width="240px">
          <template #default="scope">
            <el-button @click="toDeviceInfo(scope.row)" icon="View" plain size="small">设备实时画面</el-button>
            <el-button @click="deleteDevice(scope.row.id)" icon="Delete" type="danger" plain size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>

    <template #bottom>
      <div class="page_box">
        <el-pagination
            v-model:current-page="pageConfig.page"
            v-model:page-size="pageConfig.size"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConfig.total"
            @size-change="getDeviceList"
            @current-change="getDeviceList"
        />
      </div>
    </template>


  </PageCard>


</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import http from '@/api/index'
import {ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from 'vue-router'

const router = useRouter()
const deviceList = ref([])

const pageConfig = reactive({
  page: 1,
  size: 10,
  total: 0
})


async function getDeviceList() {
  const res = await http.device.getDeviceList(pageConfig.page, pageConfig.size)
  if (res.status === 200) {
    pageConfig.total = res.data.total
    deviceList.value = res.data.data
  }
}

getDeviceList()

// 删除设备
async function deleteDevice(id) {
  ElMessageBox.confirm('此操作将永久从设备列表删除该设备, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const response = await http.device.deleteDevice(id)
        if (response.status === 204) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
          })
          await getDeviceList()
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败：` + response.data.detail,
          })
        }
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
  })
}

//打开新窗口，显示设备详情
function toDeviceInfo(device) {
  //获取设备详情url
  const route = router.resolve({
    name: 'nodeDevice',
    query: device
  })
  // console.log(route.href)
  //新窗口打开设备详情页
  window.open(route.href)
}


</script>

<style scoped lang="scss">
</style>