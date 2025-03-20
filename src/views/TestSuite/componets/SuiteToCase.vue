<template>
  <PageCard>
    <template #title>套件中的用例</template>
    <template #main>
      <draggable
          v-model="suiteCaseList"
          chosen-class="dragging"
          item-key="index"
          ghost-class="ghost"
          :group="{name:'case',pull:false,put:true}"
          handle=".sort_hand"
          @add="handleAdd"
          @update="updateSort"

      >
        <template #item="{element}">
          <div class="line">
            <div class="name">{{ element.cases_name }}</div>


            <div class="skip">
              <el-switch @change="updateSkip(element.id)" v-model="element.skip" active-text="是否跳过执行"/>
            </div>

            <div class="btn">
              <el-button icon="Sort" plain size="small" circle class="sort_hand"></el-button>
              <el-button icon="Edit" type="primary" plain size="small" circle
                         @click="$router.push({name:'editCase',params:{id:element.cases_id}})"></el-button>
              <el-button icon="Delete" type="danger" plain size="small" circle
                         @click="deleteSuiteCase(element.id)"></el-button>
            </div>

          </div>
        </template>

      </draggable>

      <div class="info_line">
        <div class="info">从用例集中拖拽到套件中</div>
      </div>
    </template>
    <template #bottom></template>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import http from '@/api/index'
import {ref} from 'vue'
import draggable from 'vuedraggable';
import {ElMessage, ElMessageBox} from "element-plus";

const props = defineProps({
  suiteId: {
    type: String,
    default: 0
  }
})

const suiteCaseList = ref([])

//获取套件中所有用例
async function getSuiteCaseList() {
  const response = await http.testcase.getSuiteCaseList(props.suiteId)
  if (response.status === 200) {
    suiteCaseList.value = response.data
  }
}

getSuiteCaseList()

// 删除套件中的用例
async function deleteSuiteCase(id) {
  ElMessageBox.confirm('此操作将永久从套件中删除该用例, 是否继续?', '提示', {
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    type: 'warning',
  })
      .then(async () => {
        const resposne = await http.testcase.deleteSuiteCase(props.suiteId, id)
        if (resposne.status === 204) {
          ElMessage({
            type: 'success',
            message: `用例删除成功`,
          })
          getSuiteCaseList()
        }
      })
}

//修改用例是否跳过执行
async function updateSkip(id) {
  const response = await http.testcase.updateSuiteCaseSkip(props.suiteId, id)
}

async function updateSort(event) {
  // console.log('sort', event)
  SuiteCaseSort()

}


async function SuiteCaseSort() {
  let data = []
  suiteCaseList.value.forEach((item, index) => {
    data.push({
      id: item.id,
      sort: index
    })
  })
  const response = await http.testcase.updateSuiteCaseSort(props.suiteId, data)
  if (response.status === 200) {
    ElMessage({
      type: 'success',
      message: `用例排序修改成功`,
    })
    getSuiteCaseList()
  }
}


async function handleAdd(event) {
  // console.log('add', event)
  const data = {
    cases_id: event.item._underlying_vm_.cases_id,
    sort: event.newIndex,
  }
  //发送请求添加用例到套件中
  const response = await http.testcase.addSuiteCase(props.suiteId, data)
  if (response.status === 201) {
    ElMessage({
      type: 'success',
      message: `用例添加成功`,
    })
    //对用例进行排序
    suiteCaseList.value[event.newIndex].id = response.data.id
    console.log('add', suiteCaseList.value)
    SuiteCaseSort()
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
  margin-bottom: 10px;

  .name {
    flex: 1;
  }

  .skip {
    //flex:1;
    margin-right: 10px;
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