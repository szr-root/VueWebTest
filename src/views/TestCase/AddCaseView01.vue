<template>
  <el-container>
    <!--      左侧浏览器操作-->
    <el-aside width="250px">
      <BrowserStep></BrowserStep>
    </el-aside>
    <PageCard>
      <template #title>
        <div>创建测试用例</div>
      </template>

      <template #main>
        <div>
          <el-input v-model="caseInfo.name" placeholder="输入用例名称">
            <template #prepend>用例名称</template>
          </el-input>
        </div>
        <!--执行步骤展示-->
        <draggable v-model="caseInfo.steps"
                   chosen-class="dragging"
                   item-key="index"
                   ghost-class="ghost"
                   :group="{name:'steps',pull:false,put:true}"
                   @add="handleAdd"
                   handle=".left_box"


        >
          <template #item="{ element }">
            <div class="step">
              <div class="left_box">
                <div class="line1">
                  <el-icon class="header-icon" size="16px" color="var(--el-color-info)">
                    <Operation/>
                  </el-icon>
                  <div class="name"> {{ element.keyword }}</div>
                </div>
                <div class="line2">
                  <p>{{ element.desc }}</p>
                </div>
              </div>

              <!--按钮-->
              <div class="right_box">
                <el-button size="small" type="primary" plain icon="Edit" @click.stop="clickEdit(element)"></el-button>
                <el-button size="small" type="danger" plain icon="Delete"
                           @click.stop="deleteStep(element.id)"></el-button>
              </div>
            </div>
          </template>
        </draggable>

        <div class="step" v-if="caseInfo.steps.length === 0">
          <div class="left_box">
            <div class="info"> 将步骤拖拽到这里进行添加</div>
          </div>
        </div>
      </template>

      <template #bottom>
        <el-button type="primary" plain icon="CircleCheckFilled" @mousedown.stop @click="createCase">保 存</el-button>
        <el-button plain icon="CircleCloseFilled" @click="back">取 消</el-button>
      </template>

    </PageCard>

  </el-container>

  <el-dialog v-model="dialogVisible" width="40%" center>
    <template #header>
      <b style="font-size: 14px">{{ editStep.keyword }}</b>
    </template>
    <el-input v-model="editStep.desc">
      <template #prepend>操作说明</template>
    </el-input>
    <!--弹框显示的编辑内容-->
    <div class="params_name">配置参数</div>
    <div v-for="(value,key) in editStep.params" :key="key" style="margin: 10px 0 0 0;">
      <el-input v-model="editStep.params[key]">
        <template #prepend>{{ ParamsMap[key] }}</template>
      </el-input>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStep">
          确 认
        </el-button>
      </div>
    </template>

  </el-dialog>


</template>

<script setup>
import PageCard from '@/components/PageCard.vue'
import BrowserStep from '@/components/BrowserStep.vue'
import {ref, reactive} from "vue";
import {ProjectStore} from "@/stores/ProjectStore.js";
import http from '@/api/index'
import {ElMessage} from 'element-plus'
import {useRouter, useRoute} from 'vue-router'
import draggable from 'vuedraggable';
import {ParamsMap} from "@/datas/ParamsMap.js";


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

const dialogVisible = ref(false)
const editStep = ref({})


function handleAdd(event) {
  const newStep = event.item._underlying_vm_
  editStep.value = {...newStep}
  dialogVisible.value = true;

}

function clickEdit(element) {
  editStep.value = {...element}
  dialogVisible.value = true
}

//保存
function saveStep() {
  const newStep = editStep.value
  const index = caseInfo.steps.findIndex(item => {
    return item.id === newStep.id
  })
  caseInfo.steps.splice(index, 1, newStep)
  //关闭弹窗
  dialogVisible.value = false
}

function deleteStep(id) {
  //找到步骤索引
  caseInfo.steps = caseInfo.steps.filter(item => {
    return item.id !== id
  })

}

</script>

<style scoped lang="scss">
.step {
  height: 50px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 10px;
  padding: 5px 20px 5px 20px;
  margin-top: 10px;
  cursor: move;
  display: flex;

  align-items: center;
  justify-content: space-between;

  .left_box {
    width: 90%;
  }

  .info {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: var(--el-color-info)
  }

  .line1 {
    padding-top: 5px;
    display: flex;
    align-items: center;

    .name {
      font: bold 13px/20px "微软雅黑";
      margin-left: 10px;
    }
  }

  .line2 {
    height: 25px;
    color: var(--el-color-info);

    p {
      margin-top: 5px;
    }
  }

  .right_box {
    //flex: 1;
    display: flex;
    text-align: center;
    justify-content: right;
  }
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

//.step {
//  height: 50px;
//  border: 1px dashed var(--el-color-primary);
//  border-radius: 10px;
//  padding: 5px 20px 0 20px;
//  margin-top: 10px;
//  cursor: move;
//  .line1{
//    display: flex;
//    align-items: center;
//    height: 20px;
//    .name{
//      font:bold 13px/20px "微软雅黑";
//      margin-left: 10px;
//    }
//    .btn{
//      flex: 1;
//      text-align: right;
//    }
//  }
//  .line2{
//    height: 25px;
//    display: flex;
//    align-items: center;
//    color: var(--el-color-info);
//  }
//}

.params_name {
  width: calc(100% - 48px);
  margin-top: 10px;
  font-size: 12px;
  color: var(--el-color-info);
  height: 30px;
  line-height: 30px;
  text-align: center
}


</style>