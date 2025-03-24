<template>
  <draggable v-model="localSteps"
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
          <el-button size="small" type="primary" plain icon="Edit" @click="clickEdit(element)"></el-button>
          <el-button size="small" type="danger" plain icon="Delete"
                     @click="deleteStep(element.id)"></el-button>
        </div>
      </div>
    </template>


  </draggable>

  <div class="step" v-if="localSteps.length === 0">
    <div class="left_box">
      <div class="info"> 将步骤拖拽到这里进行添加</div>
    </div>
  </div>


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
      <!--      todo 这里可能有bug，拖拽过来时，time从int变成了string-->
      <el-input v-model="editStep.params[key]">
        <template #prepend>{{ ParamsMap[key] }}</template>
      </el-input>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel(editStep.id)">取 消</el-button>
        <el-button type="primary" @click="saveStep">
          确 认
        </el-button>
      </div>
    </template>

  </el-dialog>

</template>

<script setup>

import {ref, reactive, computed} from "vue";
import draggable from 'vuedraggable';
import {ParamsMap} from "@/datas/ParamsMap.js";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits(['update:steps'])

const localSteps = computed({
  get() {
    return [...props.steps]

  },
  set(value) {
    emit('update:steps', value)
  }
})

const dialogVisible = ref(false)
const typedialog = ref('创建')
const editStep = ref({})

function handleAdd(event) {
  console.log(event)
  const newStep = event.item._underlying_vm_
  editStep.value = {...newStep}
  console.log(editStep.value)
  typedialog.value = '创建'
  dialogVisible.value = true;
}


function clickEdit(element) {
  editStep.value = {...element}
  typedialog.value = '修改'
  dialogVisible.value = true
}

//保存
function saveStep() {
  const newStep = {...editStep.value}
  let steps = [...localSteps.value]
  const index = localSteps.value.findIndex(item => {
    return item.id === newStep.id
  })

  // 转换特定字段为整数类型
  if (newStep.params.timeout !== undefined) {
    newStep.params.timeout = parseInt(newStep.params.timeout, 10)
  }

  steps[index] = editStep.value
  localSteps.value = steps
  //关闭弹窗
  dialogVisible.value = false
}

function onCancel(id) {
  if (typedialog.value === '创建')
    deleteStep(id)
  dialogVisible.value = false
}

function deleteStep(id) {
  localSteps.value = localSteps.value.filter(item => {
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