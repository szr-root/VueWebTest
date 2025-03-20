<template>
  <PageCard>
    <template #title>项目中所有用例</template>
    <template #main>
      <draggable
          v-model="CaseList"
          chosen-class="dragging"
          item-key="index"
          :clone="cloneStructure"
          ghost-class="ghost"
          :sort="false"
          :group="{name:'case',pull:'clone',put:false}"
      >
        <template #item="{element}">
          <div class="line">
            <div class="name">{{ element.name }}</div>

            <div class="btn">
              <el-button icon="Edit" type="primary" plain size="small" circle
                         @click="$router.push({name:'editCase',params:{id:element.id}})"></el-button>
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
          @size-change="getCaseeList"
          @current-change="getCaseeList"
      />
    </template>
  </PageCard>
</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import {ref, reactive} from "vue";
import http from '@/api/index'
import {ProjectStore} from '@/stores/ProjectStore'
import draggable from 'vuedraggable';

const CaseList = ref([])
const pstore = ProjectStore()

const pageConfig = reactive({
  total: 0,
  size: 10,
  page: 1
})

async function getCaseList() {
  const params = {
    project_id: pstore.currentPro.id,
    page: pageConfig.page,
    size: pageConfig.size
  }
  const response = await http.testcase.getCaseList(params)
  if (response.status === 200) {
    CaseList.value = response.data.data
    pageConfig.total = response.data.total
  }
}


//自定义克隆的数据结构
function cloneStructure(data) {
  return {
    "cases_id": data.id,
    "cases_name": data.name,
    "skip": false,

  }
}

getCaseList()

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