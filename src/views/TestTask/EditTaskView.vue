<template>
  <el-container>
    <PageCard>
      <template #title>
        任务中套件信息 (分布式执行，无执行先后顺序)
      </template>

      <template #main>
        <el-input v-model="taskInfo.name" placeholder="输入任务名">
          <template #prepend>任务名称</template>
        </el-input>
        <draggable
            v-model="taskInfo.suites"
            chosen-class="dragging"
            item-key="index"
            :sort="false"
            handle=".sort_hand"
            ghost-class="ghost"
            :group="{name:'case',pull:false,put:true}"
            @add="addSuiteToTask"
        >
          <template #item="{element}">
            <div class="line">
              <div class="name">{{ element.suite_name }}</div>

              <div class="type">
                <el-tag>{{ element.suite_type }}</el-tag>
              </div>

              <div class="btn">
                <el-button icon="Edit" type="primary" plain size="small" circle
                           @click="$router.push({name:'editSuites',params:{id:element.suite_id}})"></el-button>
                <el-button icon="Delete" type="danger" plain size="small" circle
                           @click="deleteTaskSuite(element.suite_id)"></el-button>
              </div>

            </div>
          </template>

        </draggable>

        <div class="info_line">
          <div class="info">从套件集中拖拽到任务中</div>
        </div>

      </template>

      <template #bottom>
        <el-button type="primary" icon="CircleCheckFilled" @click="saveTask"> 保 存</el-button>
        <el-button icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>
    </PageCard>

    <PageCard>
      <template #title>项目中所有套件</template>
      <template #main>
        <draggable
            v-model="SuiteList"
            chosen-class="dragging"
            item-key="index"
            :clone="cloneStructure"
            ghost-class="ghost"
            handle=".name"
            :sort="false"
            :group="{name:'suite',pull:'clone',put:false}"

        >
          <template #item="{element}">
            <div class="line">
              <div class="name">{{ element.name }}</div>

              <div class="btn">
                <el-button icon="Edit" type="primary" plain size="small" circle
                           @click="$router.push({name:'editSuites',params:{id:element.id}})">
                </el-button>
              </div>

            </div>
          </template>

        </draggable>
      </template>
      <template #bottom>
        <el-pagination
            v-model:current-page="pageConfig.page"
            v-model:page-size="pageConfig.size"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConfig.total"
            @size-change="getSuiteList"
            @current-change="getSuiteList"
        />
      </template>
    </PageCard>

  </el-container>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import {ProjectStore} from "@/stores/ProjectStore.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter, useRoute} from 'vue-router'
import {reactive, ref} from "vue";
import draggable from 'vuedraggable';
import http from "@/api/index.js";

const router = useRouter()
const route = useRoute()
const pstore = ProjectStore()

const task_id = route.params.id

const taskInfo = reactive({
  name: '',
  suites: [],
})

//获取套件详情
async function getTaskInfo() {
  const response = await http.task.getTaskDetail(task_id)
  if (response.status === 200) {
    taskInfo.name = response.data.name
    taskInfo.suites = response.data.suites
  }
}

getTaskInfo()

function cloneStructure(data) {
  return {
    "suite_id": data.id,
    "suite_name": data.name,
    "suite_type": data.suite_type
  }
}


function back() {
  router.back()
  pstore.delTags(route.path)
}

// ====== 套件列表数据========
const SuiteList = ref([])
const pageConfig = reactive({
  total: 0,
  size: 10,
  page: 1
})

async function getSuiteList() {
  const params = {
    project_id: pstore.currentPro.id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.testcase.getSuiteList(params)
  if (response.status === 200) {
    SuiteList.value = response.data.data
    pageConfig.total = response.data.total
  }
}


getSuiteList()


//删除任务中的套件
async function deleteTaskSuite(suite_id) {
  const response = await http.task.deleteTaskSuite(task_id, suite_id)
  if (response.status === 204) {
    ElMessage({
      type: 'success',
      message: `删除成功`,
    })
    getTaskInfo()
  }
}

//保存修改名字
async function saveTask() {
  const response = await http.task.updateTaskName(task_id, taskInfo.name)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `保存成功`,
    })
    back()
  }

}


//添加套件
async function addSuiteToTask(event) {
   const data = {
    suite_id: event.item._underlying_vm_.suite_id,
  }
  //发送请求添加用例到套件中
  const response = await http.task.addTaskSuite(task_id, data)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `套件添加成功`,
    })
   getTaskInfo()
  }
}

</script>

<style scoped lang="scss">
.line {
  height: 30px;
  border: 1px dashed var(--el-color-info);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 10px 0;

  .name {
    flex: 1;
    cursor: move;
  }

  .type {
    flex: 1;
  }
}

.sort_hand {
  cursor: move;
}

.info_line {
  height: 30px;
  border: 1px dashed #A4C0F3FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;
}

.info {
  flex: 1;
  text-align: center;
  color: #A4C0F3FF;
}

//选择拖拽时的样式
.dragging {
  border: 2px solid var(--el-color-primary);
  z-index: 1000; /* 提升拖拽元素的层级 */
}

//拖拽中占位的样式
.ghost {
  border: 2px dashed var(--el-color-primary);
}
</style>